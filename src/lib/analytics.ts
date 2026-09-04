"use client";

/**
 * ANALYTICS ABSTRACTION
 *
 * Nothing here talks to GA4 directly. Every event goes through `track()`,
 * which:
 *   1. drops the event if the user has not consented to analytics cookies, and
 *   2. queues events fired before the consent decision, replaying them only if
 *      consent is later granted.
 *
 * That ordering is the part most implementations get wrong: they load gtag in
 * the document head and fire a page_view before the banner is even painted,
 * which is exactly what UK/EU rules prohibit.
 *
 * Swapping GA4 for Plausible, Fathom or a server-side endpoint means editing
 * `send()` and nothing else.
 */

export type AnalyticsEvent =
  | "quote_start"
  | "quote_step"
  | "quote_complete"
  | "quote_error"
  | "phone_click"
  | "whatsapp_click"
  | "directions_click"
  | "product_enquiry"
  | "showroom_view"
  | "offer_view"
  | "offer_click"
  | "category_view"
  | "search_open"
  | "search_query"
  | "form_error";

type Payload = Record<string, string | number | boolean | undefined>;

const CONSENT_KEY = "rabs-consent";

export type ConsentValue = "granted" | "denied" | null;

/**
 * Subscribe to consent changes. Paired with `getConsent` this makes
 * localStorage a proper external store, so components can read it with
 * `useSyncExternalStore` instead of a setState-in-effect on mount.
 */
export function subscribeConsent(onChange: () => void): () => void {
  window.addEventListener("rabs:consent", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("rabs:consent", onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** Server snapshot: nothing is known before hydration, so treat as undecided. */
export function getServerConsent(): ConsentValue {
  return null;
}

export function getConsent(): ConsentValue {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    return raw === "granted" || raw === "denied" ? raw : null;
  } catch {
    // Private browsing, blocked storage — treat as "not decided".
    return null;
  }
}

export function setConsent(value: Exclude<ConsentValue, null>) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* Storage unavailable; consent applies for this page view only. */
  }
  window.dispatchEvent(new CustomEvent("rabs:consent", { detail: value }));
  if (value === "granted") flushQueue();
  else queue.length = 0;
}

/** Events fired before the visitor answered the banner. */
const queue: { event: AnalyticsEvent; payload?: Payload }[] = [];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function send(event: AnalyticsEvent, payload?: Payload) {
  const measurementId = process.env.NEXT_PUBLIC_GA_ID;

  if (!measurementId) {
    // No GA configured (the normal state during the pitch). Log in dev so the
    // event wiring is still verifiable without a live property.
    if (process.env.NODE_ENV === "development") {
      console.info("[analytics]", event, payload ?? {});
    }
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.gtag?.("event", event, payload);
}

function flushQueue() {
  while (queue.length) {
    const next = queue.shift();
    if (next) send(next.event, next.payload);
  }
}

export function track(event: AnalyticsEvent, payload?: Payload) {
  if (typeof window === "undefined") return;

  const consent = getConsent();
  if (consent === "denied") return;
  if (consent === null) {
    // Hold it — replayed only if the visitor later accepts.
    if (queue.length < 25) queue.push({ event, payload });
    return;
  }
  send(event, payload);
}
