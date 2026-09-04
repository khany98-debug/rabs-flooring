"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams, type ReadonlyURLSearchParams } from "next/navigation";
import Link from "next/link";
import {
  INTERESTS,
  FLOOR_TYPES,
  ROOMS,
  SUPPLY,
  TIMING,
  CONTACT_METHODS,
  INTEREST_LABELS,
  FLOOR_TYPE_LABELS,
  SUPPLY_LABELS,
  TIMING_LABELS,
  CONTACT_LABELS,
  MAX_PHOTOS,
  validatePhoto,
  quoteSchema,
  type QuoteData,
} from "@/lib/quote-schema";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { phone as sitePhone } from "@/content/site";

/**
 * QUOTE WIZARD
 *
 * Design decisions that matter more than the styling:
 *
 *  • One question per screen. A single long form asking twelve things is where
 *    mobile enquiries die, and most of RABS's traffic is mobile.
 *
 *  • Steps are skipped, not greyed out. Someone enquiring about a sofa never
 *    sees "what type of flooring" or "supply or fit" — the step list itself is
 *    derived from their first answer, so the progress bar tells the truth.
 *
 *  • Nothing is mandatory that does not have to be. Email is optional because
 *    plenty of customers only want a phone call, and demanding an address they
 *    do not want to give loses the enquiry.
 *
 *  • No response-time promise anywhere. "We aim to reply within an hour" is
 *    the kind of thing a website says and a busy showroom cannot always keep.
 *
 *  • Prefilled from the URL, so every "Get an LVT quote" button across the site
 *    lands the customer a step or two in.
 */

type StepId =
  | "interest"
  | "floorType"
  | "rooms"
  | "dimensions"
  | "supply"
  | "photos"
  | "timing"
  | "contact"
  | "review";

interface Draft {
  interest?: QuoteData["interest"];
  floorType?: QuoteData["floorType"];
  rooms: string[];
  dimensions: string;
  needsMeasuring: boolean;
  supply?: QuoteData["supply"];
  timing?: QuoteData["timing"];
  name: string;
  phone: string;
  email: string;
  postcode: string;
  preferredContact: QuoteData["preferredContact"];
  notes: string;
  photos: File[];
}

const emptyDraft: Draft = {
  rooms: [],
  dimensions: "",
  needsMeasuring: false,
  name: "",
  phone: "",
  email: "",
  postcode: "",
  preferredContact: "phone",
  notes: "",
  photos: [],
};

/** The flooring-specific steps only appear when flooring is actually involved. */
function stepsFor(draft: Draft): StepId[] {
  const flooringInvolved = draft.interest === "flooring" || draft.interest === "whole-home";

  return [
    "interest",
    ...(flooringInvolved ? (["floorType"] as StepId[]) : []),
    "rooms",
    "dimensions",
    ...(flooringInvolved ? (["supply"] as StepId[]) : []),
    "photos",
    "timing",
    "contact",
    "review",
  ];
}

const STEP_TITLES: Record<StepId, string> = {
  interest: "What can we help with?",
  floorType: "What kind of flooring?",
  rooms: "Which rooms?",
  dimensions: "Rough sizes",
  supply: "Supply only, or fitted?",
  photos: "Any photos?",
  timing: "When are you thinking?",
  contact: "How do we reach you?",
  review: "Check it over",
};

/**
 * Builds the opening draft from the URL, so every "Get an LVT quote" or
 * "Enquire about sofas" button across the site lands the customer a step or
 * two in rather than back at question one.
 *
 * Done as a lazy useState initializer rather than an effect: the params are
 * available on the very first client render, so seeding state in an effect
 * would only add a wasted render and a visible flash of the empty form.
 */
function draftFromParams(params: URLSearchParams | ReadonlyURLSearchParams): Draft {
  const next: Draft = { ...emptyDraft };

  const interest = params.get("interest");
  if (interest && (INTERESTS as readonly string[]).includes(interest)) {
    next.interest = interest as QuoteData["interest"];
  }

  // Category slugs on the site are "carpets"/"lvt"/…; the schema uses singular.
  const typeMap: Record<string, QuoteData["floorType"]> = {
    carpets: "carpet",
    carpet: "carpet",
    lvt: "lvt",
    laminate: "laminate",
    vinyl: "vinyl",
  };
  const type = params.get("type");
  if (type && typeMap[type]) next.floorType = typeMap[type];

  const supply = params.get("supply");
  if (supply && (SUPPLY as readonly string[]).includes(supply)) {
    next.supply = supply as QuoteData["supply"];
  }

  const note = params.get("note");
  if (note) next.notes = `Interested in: ${note}`;

  if (params.get("measure") === "true") next.needsMeasuring = true;

  return next;
}

/** Index of the first step the customer has not already answered via the URL. */
function firstUnansweredStep(draft: Draft): number {
  const steps = stepsFor(draft);
  const answered: Partial<Record<StepId, boolean>> = {
    interest: draft.interest !== undefined,
    floorType: draft.floorType !== undefined,
    supply: draft.supply !== undefined,
  };

  let i = 0;
  while (i < steps.length && answered[steps[i]]) i++;
  return i;
}

export function QuoteWizard() {
  const params = useSearchParams();
  const [draft, setDraft] = useState<Draft>(() => draftFromParams(params));
  // Someone who pressed "Get an LVT quote" has already told us two things;
  // making them answer both again is the fastest way to lose them.
  const [index, setIndex] = useState(() => firstUnansweredStep(draftFromParams(params)));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const started = useRef(false);

  const steps = useMemo(() => stepsFor(draft), [draft]);
  const step = steps[Math.min(index, steps.length - 1)];

  /* --- Analytics --------------------------------------------------------- */
  useEffect(() => {
    if (!started.current) {
      started.current = true;
      track("quote_start");
    }
  }, []);

  useEffect(() => {
    track("quote_step", { step, index: index + 1 });
    // Move focus to the new question so screen-reader and keyboard users are
    // not left at the bottom of the previous step.
    headingRef.current?.focus();
  }, [step, index]);

  /* --- Navigation -------------------------------------------------------- */
  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => {
    setDraft((d) => ({ ...d, [key]: value }));
    // Clear this field's error as soon as the customer changes it.
    setErrors((e) => {
      if (!(key in e)) return e;
      const rest = { ...e };
      delete rest[key as string];
      return rest;
    });
  };

  function validateStep(): boolean {
    const next: Record<string, string> = {};

    if (step === "interest" && !draft.interest) next.interest = "Please pick one to continue";
    if (step === "rooms" && draft.rooms.length === 0) next.rooms = "Choose at least one room";
    if (step === "timing" && !draft.timing) next.timing = "Roughly when were you thinking?";

    if (step === "contact") {
      if (draft.name.trim().length < 2) next.name = "Please enter your name";
      if (!/^(\+44\s?|0)[\d\s-]{9,}$/.test(draft.phone.trim())) next.phone = "Please check the phone number";
      if (!/^[A-Za-z]{1,2}\d[A-Za-z\d]?\s?\d[A-Za-z]{2}$/.test(draft.postcode.trim()))
        next.postcode = "Please check the postcode";
      if (draft.email.trim() && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(draft.email.trim()))
        next.email = "Please check the email address";
      if (draft.preferredContact === "email" && !draft.email.trim())
        next.email = "We need an email address to reply by email";
    }

    setErrors(next);
    if (Object.keys(next).length > 0) {
      track("form_error", { step, fields: Object.keys(next).join(",") });
      return false;
    }
    return true;
  }

  const goNext = () => {
    if (!validateStep()) return;
    setIndex((i) => Math.min(i + 1, steps.length - 1));
  };
  const goBack = () => setIndex((i) => Math.max(i - 1, 0));

  /* --- Photos ------------------------------------------------------------ */
  const addPhotos = (files: FileList | null) => {
    if (!files) return;
    setPhotoError(null);

    const incoming = Array.from(files);
    const accepted: File[] = [];

    for (const file of incoming) {
      const problem = validatePhoto(file);
      if (problem) {
        setPhotoError(problem);
        continue;
      }
      accepted.push(file);
    }

    setDraft((d) => {
      const combined = [...d.photos, ...accepted].slice(0, MAX_PHOTOS);
      if (d.photos.length + accepted.length > MAX_PHOTOS) {
        setPhotoError(`You can send up to ${MAX_PHOTOS} photos.`);
      }
      return { ...d, photos: combined };
    });
  };

  /* --- Submit ------------------------------------------------------------ */
  async function submit() {
    setStatus("sending");
    setServerError(null);

    const payload = {
      interest: draft.interest,
      floorType: draft.floorType,
      rooms: draft.rooms,
      dimensions: draft.dimensions || undefined,
      needsMeasuring: draft.needsMeasuring,
      supply: draft.supply,
      timing: draft.timing,
      name: draft.name.trim(),
      phone: draft.phone.trim(),
      email: draft.email.trim() || undefined,
      postcode: draft.postcode.trim().toUpperCase(),
      preferredContact: draft.preferredContact,
      notes: draft.notes.trim() || undefined,
      photos: draft.photos.map((f) => ({ name: f.name, size: f.size })),
      company: "",
    };

    const parsed = quoteSchema.safeParse(payload);
    if (!parsed.success) {
      setStatus("error");
      setServerError("Something in the form did not look right. Please check your details.");
      track("quote_error", { reason: "client_validation" });
      return;
    }

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { message?: string } | null;
        throw new Error(body?.message ?? "Request failed");
      }

      setStatus("sent");
      track("quote_complete", { interest: draft.interest ?? "unknown", rooms: draft.rooms.length });
    } catch (error) {
      setStatus("error");
      setServerError(
        "We could not send that just now. Please give us a ring instead and we will sort it out.",
      );
      track("quote_error", { reason: error instanceof Error ? error.message : "unknown" });
    }
  }

  /* --- Confirmation ------------------------------------------------------ */
  if (status === "sent") {
    return (
      <div className="border border-stone bg-white p-8 text-center sm:p-14">
        <span className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-full bg-gold">
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-ink" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>

        <h2 className="type-display text-3xl text-ink sm:text-4xl">Thanks — that&rsquo;s with us.</h2>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted">
          The RABS team will be in touch. If it is urgent, or you would rather just talk it through,
          give us a ring.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={sitePhone.href}
            onClick={() => track("phone_click", { location: "quote_confirmation" })}
            className="inline-flex min-h-11 items-center justify-center bg-ink px-7 py-3.5 type-eyebrow text-xs text-white transition-colors hover:bg-charcoal"
          >
            Call {sitePhone.display}
          </a>
          <Link
            href="/showroom"
            className="inline-flex min-h-11 items-center justify-center border border-ink/20 px-7 py-3.5 type-eyebrow text-xs text-ink transition-colors hover:border-burgundy hover:text-burgundy"
          >
            Plan a showroom visit
          </Link>
        </div>
      </div>
    );
  }

  const progress = ((index + 1) / steps.length) * 100;

  return (
    <div className="border border-stone bg-white">
      {/* Progress */}
      <div className="border-b border-stone px-6 py-5 sm:px-9">
        <div className="flex items-center justify-between gap-4">
          <p className="type-eyebrow text-burgundy">
            Step {index + 1} of {steps.length}
          </p>
          <p className="text-xs text-muted">{STEP_TITLES[step]}</p>
        </div>
        <div
          className="mt-3 h-1 w-full overflow-hidden bg-stone"
          role="progressbar"
          aria-valuenow={index + 1}
          aria-valuemin={1}
          aria-valuemax={steps.length}
          aria-label="Quote progress"
        >
          <div
            className="h-full bg-gold transition-[width] duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="p-6 sm:p-9 lg:p-11">
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="type-display text-3xl text-ink outline-none sm:text-4xl"
        >
          {STEP_TITLES[step]}
        </h2>

        <div className="mt-8">
          {/* ---------------------------------------------------------------- */}
          {step === "interest" && (
            <Choice
              legend="What can we help with?"
              error={errors.interest}
              options={INTERESTS.map((i) => ({
                value: i,
                label: INTEREST_LABELS[i],
                hint:
                  i === "whole-home"
                    ? "Flooring, furniture and blinds together"
                    : i === "flooring"
                      ? "Carpet, LVT, laminate or vinyl"
                      : i === "furniture"
                        ? "Sofas, beds, dining or living room"
                        : "Blinds for one room or the whole house",
              }))}
              value={draft.interest}
              onChange={(v) => {
                set("interest", v as QuoteData["interest"]);
                setIndex((i) => i + 1);
              }}
            />
          )}

          {step === "floorType" && (
            <Choice
              legend="What kind of flooring are you looking at?"
              options={FLOOR_TYPES.map((f) => ({ value: f, label: FLOOR_TYPE_LABELS[f] }))}
              value={draft.floorType}
              onChange={(v) => {
                set("floorType", v as QuoteData["floorType"]);
                setIndex((i) => i + 1);
              }}
            />
          )}

          {step === "rooms" && (
            <>
              <p className="-mt-4 mb-6 text-sm text-muted">Choose as many as apply.</p>
              <MultiChoice
                options={[...ROOMS]}
                values={draft.rooms}
                error={errors.rooms}
                onToggle={(room) =>
                  set(
                    "rooms",
                    draft.rooms.includes(room)
                      ? draft.rooms.filter((r) => r !== room)
                      : [...draft.rooms, room],
                  )
                }
              />
            </>
          )}

          {step === "dimensions" && (
            <>
              <p className="-mt-4 mb-6 max-w-xl text-sm leading-relaxed text-muted">
                Rough sizes are plenty at this stage — we measure properly before anything is
                ordered. If you would rather we did the measuring, just say so.
              </p>

              <label className="block">
                <span className="type-eyebrow mb-3 block text-burgundy">
                  Room sizes <span className="text-muted">(optional)</span>
                </span>
                <textarea
                  value={draft.dimensions}
                  onChange={(e) => set("dimensions", e.target.value)}
                  rows={4}
                  placeholder={"e.g. Living room about 4m x 5m\nStairs and landing, 13 steps"}
                  className="w-full border border-stone bg-parchment p-4 text-base text-body outline-none transition-colors focus:border-champagne"
                />
              </label>

              <label className="mt-6 flex min-h-14 cursor-pointer items-start gap-3 border border-stone p-4 transition-colors hover:border-champagne">
                <input
                  type="checkbox"
                  checked={draft.needsMeasuring}
                  onChange={(e) => set("needsMeasuring", e.target.checked)}
                  className="mt-0.5 h-5 w-5 shrink-0 accent-[#761010]"
                />
                <span>
                  <span className="block text-sm font-semibold text-ink">
                    I&rsquo;d like RABS to measure
                  </span>
                  <span className="mt-0.5 block text-xs text-muted">
                    We will arrange a time that suits you.
                  </span>
                </span>
              </label>
            </>
          )}

          {step === "supply" && (
            <Choice
              legend="Supply only, or supplied and fitted?"
              options={SUPPLY.map((s) => ({
                value: s,
                label: SUPPLY_LABELS[s],
                hint:
                  s === "supply-only"
                    ? "You or your own fitter will lay it"
                    : s === "supply-and-fit"
                      ? "Our team measures, supplies and fits"
                      : "Happy to talk it through",
              }))}
              value={draft.supply}
              onChange={(v) => {
                set("supply", v as QuoteData["supply"]);
                setIndex((i) => i + 1);
              }}
            />
          )}

          {step === "photos" && (
            <>
              <p className="-mt-4 mb-6 max-w-xl text-sm leading-relaxed text-muted">
                Optional, but genuinely useful. A photo of the room tells us more about the job than
                a paragraph does — especially the doorways and the existing floor.
              </p>

              <label className="flex cursor-pointer flex-col items-center justify-center border border-dashed border-stone-deep bg-parchment px-6 py-12 text-center transition-colors hover:border-champagne">
                <svg viewBox="0 0 24 24" className="mb-4 h-8 w-8 text-bronze" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M12 3v12m0-12 4 4m-4-4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="type-eyebrow text-ink">Add photos</span>
                <span className="mt-1.5 text-xs text-muted">
                  Up to {MAX_PHOTOS} photos, 8MB each. JPG, PNG, WEBP or HEIC.
                </span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
                  multiple
                  className="sr-only"
                  onChange={(e) => addPhotos(e.target.files)}
                />
              </label>

              {photoError && (
                <p role="alert" className="mt-3 text-sm text-ember">
                  {photoError}
                </p>
              )}

              {draft.photos.length > 0 && (
                <ul className="mt-5 space-y-2">
                  {draft.photos.map((file, i) => (
                    <li
                      key={`${file.name}-${i}`}
                      className="flex items-center justify-between gap-4 border border-stone px-4 py-3 text-sm"
                    >
                      <span className="truncate text-body">{file.name}</span>
                      <button
                        type="button"
                        onClick={() =>
                          set(
                            "photos",
                            draft.photos.filter((_, index2) => index2 !== i),
                          )
                        }
                        className="shrink-0 type-eyebrow text-[10px] text-muted hover:text-ember"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {step === "timing" && (
            <Choice
              legend="When are you thinking of doing this?"
              error={errors.timing}
              options={TIMING.map((t) => ({ value: t, label: TIMING_LABELS[t] }))}
              value={draft.timing}
              onChange={(v) => {
                set("timing", v as QuoteData["timing"]);
                setIndex((i) => i + 1);
              }}
            />
          )}

          {step === "contact" && (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Your name"
                value={draft.name}
                onChange={(v) => set("name", v)}
                error={errors.name}
                autoComplete="name"
              />
              <Field
                label="Phone number"
                type="tel"
                inputMode="tel"
                value={draft.phone}
                onChange={(v) => set("phone", v)}
                error={errors.phone}
                autoComplete="tel"
              />
              <Field
                label="Email"
                optional
                type="email"
                inputMode="email"
                value={draft.email}
                onChange={(v) => set("email", v)}
                error={errors.email}
                autoComplete="email"
              />
              <Field
                label="Postcode"
                value={draft.postcode}
                onChange={(v) => set("postcode", v)}
                error={errors.postcode}
                autoComplete="postal-code"
                hint="So we know where the job is"
              />

              <fieldset className="sm:col-span-2">
                <legend className="type-eyebrow mb-3 text-burgundy">
                  How would you like us to get back to you?
                </legend>
                <div className="flex flex-wrap gap-2">
                  {CONTACT_METHODS.map((method) => (
                    <button
                      key={method}
                      type="button"
                      aria-pressed={draft.preferredContact === method}
                      onClick={() => set("preferredContact", method)}
                      className={cn(
                        "min-h-11 border px-5 text-sm transition-colors",
                        draft.preferredContact === method
                          ? "border-burgundy bg-burgundy text-white"
                          : "border-stone text-body hover:border-burgundy",
                      )}
                    >
                      {CONTACT_LABELS[method]}
                    </button>
                  ))}
                </div>
              </fieldset>

              <label className="block sm:col-span-2">
                <span className="type-eyebrow mb-3 block text-burgundy">
                  Anything else? <span className="text-muted">(optional)</span>
                </span>
                <textarea
                  value={draft.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  rows={3}
                  className="w-full border border-stone bg-parchment p-4 text-base text-body outline-none transition-colors focus:border-champagne"
                />
              </label>

              {/* Honeypot — hidden from people, irresistible to naive bots. */}
              <div aria-hidden="true" className="hidden">
                <label>
                  Company
                  <input type="text" tabIndex={-1} autoComplete="off" name="company" />
                </label>
              </div>
            </div>
          )}

          {step === "review" && (
            <>
              <p className="-mt-4 mb-7 text-sm text-muted">
                Have a quick look, then send it over.
              </p>

              <dl className="divide-y divide-stone border-y border-stone">
                <Row label="Interested in" value={draft.interest ? INTEREST_LABELS[draft.interest] : "—"} />
                {draft.floorType && <Row label="Flooring type" value={FLOOR_TYPE_LABELS[draft.floorType]} />}
                <Row label="Rooms" value={draft.rooms.join(", ") || "—"} />
                {draft.dimensions && <Row label="Sizes" value={draft.dimensions} />}
                {draft.needsMeasuring && <Row label="Measuring" value="RABS to measure" />}
                {draft.supply && <Row label="Supply" value={SUPPLY_LABELS[draft.supply]} />}
                {draft.photos.length > 0 && (
                  <Row label="Photos" value={`${draft.photos.length} attached`} />
                )}
                <Row label="Timing" value={draft.timing ? TIMING_LABELS[draft.timing] : "—"} />
                <Row label="Name" value={draft.name} />
                <Row label="Phone" value={draft.phone} />
                {draft.email && <Row label="Email" value={draft.email} />}
                <Row label="Postcode" value={draft.postcode.toUpperCase()} />
                <Row label="Prefers" value={CONTACT_LABELS[draft.preferredContact]} />
                {draft.notes && <Row label="Notes" value={draft.notes} />}
              </dl>

              <p className="mt-6 text-xs leading-relaxed text-muted">
                We will only use these details to answer your enquiry. See our{" "}
                <Link href="/privacy" className="text-burgundy underline underline-offset-2">
                  privacy notice
                </Link>
                .
              </p>

              {serverError && (
                <p role="alert" className="mt-5 border-l-2 border-ember bg-ember/5 p-4 text-sm text-body">
                  {serverError}
                </p>
              )}
            </>
          )}
        </div>

        {/* Controls */}
        <div className="mt-10 flex items-center justify-between gap-4 border-t border-stone pt-7">
          <button
            type="button"
            onClick={goBack}
            disabled={index === 0}
            className="min-h-11 type-eyebrow text-[11px] text-muted transition-colors hover:text-ink disabled:invisible"
          >
            &larr; Back
          </button>

          {step === "review" ? (
            <button
              type="button"
              onClick={submit}
              disabled={status === "sending"}
              className="inline-flex min-h-11 items-center gap-2.5 bg-gold px-8 py-4 type-eyebrow text-[13px] text-ink transition-colors hover:bg-gold-soft disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send my enquiry"}
            </button>
          ) : (
            <button
              type="button"
              onClick={goNext}
              className="inline-flex min-h-11 items-center gap-2.5 bg-ink px-8 py-4 type-eyebrow text-[13px] text-white transition-colors hover:bg-charcoal"
            >
              Continue
              <svg viewBox="0 0 20 12" className="h-3 w-4" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                <path d="M0 6h18M13 1l5 5-5 5" strokeLinecap="square" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Field primitives                                                           */
/* -------------------------------------------------------------------------- */

function Choice({
  legend,
  options,
  value,
  onChange,
  error,
}: {
  /** Read out to screen-reader users in place of the visual heading. */
  legend: string;
  options: { value: string; label: string; hint?: string }[];
  value?: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <fieldset>
      <legend className="sr-only">{legend}</legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const selected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option.value)}
              className={cn(
                "flex min-h-16 flex-col justify-center border p-5 text-left transition-colors",
                selected
                  ? "border-burgundy bg-burgundy/5"
                  : "border-stone hover:border-champagne",
              )}
            >
              <span className="type-editorial text-xl text-ink">{option.label}</span>
              {option.hint && <span className="mt-1 text-xs text-muted">{option.hint}</span>}
            </button>
          );
        })}
      </div>
      {error && (
        <p role="alert" className="mt-4 text-sm text-ember">
          {error}
        </p>
      )}
    </fieldset>
  );
}

function MultiChoice({
  options,
  values,
  onToggle,
  error,
}: {
  options: string[];
  values: string[];
  onToggle: (value: string) => void;
  error?: string;
}) {
  return (
    <fieldset>
      <legend className="sr-only">Which rooms are involved?</legend>
      <div className="flex flex-wrap gap-2.5">
        {options.map((option) => {
          const selected = values.includes(option);
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => onToggle(option)}
              className={cn(
                "min-h-12 border px-5 text-sm transition-colors",
                selected
                  ? "border-burgundy bg-burgundy text-white"
                  : "border-stone text-body hover:border-burgundy",
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
      {error && (
        <p role="alert" className="mt-4 text-sm text-ember">
          {error}
        </p>
      )}
    </fieldset>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  optional = false,
  hint,
  inputMode,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  optional?: boolean;
  hint?: string;
  inputMode?: "text" | "tel" | "email" | "numeric";
  autoComplete?: string;
}) {
  const id = `field-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div>
      <label htmlFor={id} className="type-eyebrow mb-3 block text-burgundy">
        {label} {optional && <span className="text-muted">(optional)</span>}
      </label>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(
          "min-h-12 w-full border bg-parchment px-4 text-base text-body outline-none transition-colors",
          error ? "border-ember" : "border-stone focus:border-champagne",
        )}
      />
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-ember">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-2 text-xs text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-6 py-3.5 text-sm">
      <dt className="shrink-0 text-muted">{label}</dt>
      <dd className="text-right text-body">{value}</dd>
    </div>
  );
}
