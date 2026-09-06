"use client";

import { useState } from "react";
import { PITCH_MODE } from "@/content/pitch";

/**
 * A visible reminder that this build is a pitch, not the live site.
 *
 * It exists so nobody — client, colleague or search engine — can mistake this
 * for the finished article, and so the two things that are genuinely unsettled
 * (the trading address and the opening hours) are impossible to miss.
 *
 * Disappears entirely when NEXT_PUBLIC_PITCH_MODE=false.
 */
export function PitchBanner() {
  const [open, setOpen] = useState(true);

  if (!PITCH_MODE || !open) return null;

  return (
    <div className="bg-champagne/95 text-ink">
      <div className="mx-auto flex max-w-[1680px] items-start gap-4 px-5 py-2.5 sm:px-8 lg:px-12">
        <p className="flex-1 text-[11px] leading-relaxed sm:text-xs">
          <span className="font-bold uppercase tracking-[0.14em]">Concept build</span>
          <span className="mx-2 opacity-40">|</span>
          Not indexed by search engines. The interior visuals are AI-generated concept imagery for
          this proposal, not RABS photography or completed customer work. Address, opening hours,
          prices, offers and reviews are all awaiting confirmation from RABS — see{" "}
          <code className="bg-ink/10 px-1">docs/CLIENT-CONFIRMATION.md</code>. Sections marked
          &ldquo;Layout example&rdquo; are structural placeholders, not real RABS work.
        </p>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Dismiss notice"
          className="-my-2 -mr-2 inline-flex h-11 w-11 shrink-0 items-center justify-center text-ink/50 hover:text-ink"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
