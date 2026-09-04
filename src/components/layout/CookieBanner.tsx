"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { getConsent, getServerConsent, setConsent, subscribeConsent } from "@/lib/analytics";

/**
 * Cookie consent.
 *
 * UK PECR requires opt-in for non-essential cookies, and requires refusing to
 * be as easy as accepting. So:
 *
 *   • Accept and Reject are the same size, weight and prominence. No greyed-out
 *     "Reject" hidden behind a second screen.
 *   • Nothing analytics-related runs before a choice is made — `track()` queues
 *     events and only replays them if consent is granted (see lib/analytics).
 *   • Dismissing without choosing is not treated as consent.
 *
 * The banner sits above the mobile action bar rather than over it, so the
 * primary CTAs stay reachable while it is showing.
 */
export function CookieBanner() {
  /**
   * localStorage is an external store, so it is read with
   * useSyncExternalStore rather than a setState-in-effect on mount. The server
   * snapshot is "undecided", so the banner is absent from the HTML and appears
   * after hydration — which also keeps it out of the critical render path.
   */
  const consent = useSyncExternalStore(subscribeConsent, getConsent, getServerConsent);
  const [dismissed, setDismissed] = useState(false);

  if (consent !== null || dismissed) return null;

  const choose = (value: "granted" | "denied") => {
    setConsent(value);
    setDismissed(true);
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie choices"
      aria-live="polite"
      className="fixed inset-x-0 z-[60] px-4 pb-4"
      style={{ bottom: "var(--rabs-bottom-bar, 0px)" }}
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-5 border border-champagne/30 bg-ink p-5 shadow-2xl sm:flex-row sm:items-center sm:gap-8 sm:p-6">
        <div className="flex-1">
          <p className="type-eyebrow mb-2 text-gold">Cookies</p>
          <p className="text-sm leading-relaxed text-white/70">
            We would like to use analytics cookies to understand how people use the site. They are
            optional — everything works either way. See our{" "}
            <Link href="/cookies" className="text-gold underline underline-offset-2 hover:text-gold-soft">
              cookie policy
            </Link>
            .
          </p>
        </div>

        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="min-h-11 flex-1 border border-white/30 px-5 type-eyebrow text-[11px] text-white transition-colors hover:border-gold hover:text-gold sm:flex-none"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="min-h-11 flex-1 bg-gold px-5 type-eyebrow text-[11px] text-ink transition-colors hover:bg-gold-soft sm:flex-none"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
