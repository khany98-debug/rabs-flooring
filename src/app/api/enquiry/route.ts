import { NextResponse } from "next/server";
import { quoteSchema } from "@/lib/quote-schema";

/**
 * ENQUIRY ENDPOINT
 *
 * Security posture — all of it server-side, because client validation is a
 * convenience and nothing more:
 *
 *  1. The payload is re-parsed with the same Zod schema the browser used. A
 *     hand-crafted POST hits identical rules.
 *  2. Honeypot check — a filled `company` field is silently accepted and
 *     dropped, so a bot cannot learn it has been caught.
 *  3. In-memory rate limit per IP. Adequate for a single-region deployment;
 *     swap for Upstash/Vercel KV if this ever runs in multiple regions, since
 *     the map is per-instance.
 *  4. Turnstile verified server-side when a secret is configured.
 *  5. No secret ever reaches the browser — the Resend key and Turnstile secret
 *     are read from the server environment only.
 *
 * Photos: the wizard currently sends filenames and sizes, not the binaries.
 * Accepting uploads means somewhere to put them (Vercel Blob, S3, UploadThing)
 * plus virus scanning and a retention policy — a decision for RABS, not a
 * default. Until then the enquiry names the photos and the team asks for them
 * by reply. See docs/LAUNCH.md.
 */

export const runtime = "nodejs";

/* -------------------------------------------------------------------------- */
/* Rate limiting                                                              */
/* -------------------------------------------------------------------------- */

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 5;

const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }

  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }

  return false;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() ?? request.headers.get("x-real-ip") ?? "unknown";
}

/* -------------------------------------------------------------------------- */
/* Turnstile                                                                  */
/* -------------------------------------------------------------------------- */

async function verifyTurnstile(token: string | undefined, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Not configured — the honeypot and rate limit still apply.
  if (!token) return false;

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, response: token, remoteip: ip }),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

/* -------------------------------------------------------------------------- */
/* Delivery                                                                   */
/* -------------------------------------------------------------------------- */

function formatEnquiry(data: Record<string, unknown>): string {
  const lines: string[] = ["New enquiry from rabsflooring.co.uk", ""];

  const add = (label: string, value: unknown) => {
    if (value === undefined || value === null || value === "") return;
    if (Array.isArray(value)) {
      if (value.length === 0) return;
      lines.push(`${label}: ${value.map((v) => (typeof v === "object" && v !== null && "name" in v ? (v as { name: string }).name : String(v))).join(", ")}`);
      return;
    }
    lines.push(`${label}: ${String(value)}`);
  };

  add("Interested in", data.interest);
  add("Flooring type", data.floorType);
  add("Rooms", data.rooms);
  add("Sizes", data.dimensions);
  add("Wants RABS to measure", data.needsMeasuring ? "Yes" : undefined);
  add("Supply", data.supply);
  add("Timing", data.timing);
  lines.push("");
  add("Name", data.name);
  add("Phone", data.phone);
  add("Email", data.email);
  add("Postcode", data.postcode);
  add("Prefers to be contacted by", data.preferredContact);
  add("Photos mentioned", data.photos);
  lines.push("");
  add("Notes", data.notes);

  return lines.join("\n");
}

async function deliver(body: string, replyTo?: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  const from = process.env.ENQUIRY_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    // Demo mode — the pitch build has no mail credentials. The submission
    // still validates, rate-limits and succeeds, so the whole journey can be
    // tested end to end; it is logged rather than sent.
    console.info("[enquiry] no mail transport configured — logging instead\n", body);
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: "New website enquiry — RABS Flooring",
      text: body,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!res.ok) {
    throw new Error(`Mail transport responded ${res.status}`);
  }
}

/* -------------------------------------------------------------------------- */
/* Handler                                                                    */
/* -------------------------------------------------------------------------- */

export async function POST(request: Request) {
  const ip = clientIp(request);

  if (rateLimited(ip)) {
    return NextResponse.json(
      { message: "Too many enquiries from this connection. Please ring us instead." },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Malformed request." }, { status: 400 });
  }

  const parsed = quoteSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Some details did not look right.", issues: parsed.error.issues.map((i) => i.path.join(".")) },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // Honeypot: pretend it worked, then bin it.
  if (data.company) {
    return NextResponse.json({ ok: true });
  }

  const turnstileToken = (payload as { turnstileToken?: string })?.turnstileToken;
  if (!(await verifyTurnstile(turnstileToken, ip))) {
    return NextResponse.json({ message: "Could not verify that request." }, { status: 403 });
  }

  try {
    await deliver(formatEnquiry(data as unknown as Record<string, unknown>), data.email || undefined);
  } catch (error) {
    console.error("[enquiry] delivery failed", error);
    return NextResponse.json(
      { message: "We could not send that just now. Please give us a ring." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
