"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { mainNav } from "@/content/nav";
import { phone, hoursSummary, fullAddress, whatsapp } from "@/content/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Mobile navigation.
 *
 * Most of RABS's traffic arrives from Instagram on a phone, so this is not a
 * desktop mega menu squeezed into a drawer. Rules applied:
 *
 *   • Quote and Call sit at the top, above the fold, not buried at the bottom.
 *   • Sections expand in place rather than pushing through a second screen —
 *     one tap to open, one tap to the category, no back-navigation.
 *   • Body scroll is locked while open, and focus is trapped in the panel.
 */
export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>("Flooring");
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Lock the page behind the drawer, restoring the exact scrollbar width so
  // the layout does not jump when it opens.
  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const prevOverflow = body.style.overflow;
    const prevPad = body.style.paddingRight;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPad;
    };
  }, [open]);

  // Escape to close, and keep Tab inside the panel.
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] lg:hidden">
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="absolute inset-y-0 right-0 flex w-full max-w-[26rem] flex-col bg-ink text-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <Logo className="w-28" showTagline={false} />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex h-11 w-11 items-center justify-center text-white/80 hover:text-gold"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Conversion actions first. */}
        <div className="grid grid-cols-2 gap-2 border-b border-white/10 p-4">
          <Button href="/get-a-quote" variant="gold" size="sm" onClick={onClose}>
            Free quote
          </Button>
          <a
            href={phone.href}
            onClick={() => track("phone_click", { location: "mobile_nav" })}
            className="inline-flex min-h-11 items-center justify-center gap-2 border border-white/25 px-4 type-eyebrow text-[11px] text-white hover:border-gold hover:text-gold"
          >
            Call us
          </a>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto overscroll-contain px-2 py-2">
          <ul>
            {mainNav.map((item) => {
              const isOpen = expanded === item.label;

              if (!item.mega) {
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex min-h-14 items-center px-4 type-display text-2xl",
                        item.accent ? "text-ruby" : "text-white",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }

              return (
                <li key={item.label} className="border-b border-white/[0.07] last:border-0">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setExpanded(isOpen ? null : item.label)}
                    className="flex min-h-14 w-full items-center justify-between px-4 type-display text-2xl text-white"
                  >
                    {item.label}
                    <svg
                      viewBox="0 0 12 8"
                      className={cn("h-3 w-3 text-gold transition-transform duration-300", isOpen && "rotate-180")}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="m1 1 5 5 5-5" strokeLinecap="round" />
                    </svg>
                  </button>

                  {isOpen && (
                    <ul className="pb-3">
                      {item.mega.columns.flatMap((col) => col.links).map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={onClose}
                            className="flex min-h-12 items-center gap-3 px-4 pl-7 text-[15px] text-white/70 hover:text-gold"
                          >
                            <span className="h-px w-3 bg-champagne/60" aria-hidden="true" />
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-white/10 p-5 text-xs leading-relaxed text-white/55">
          <a
            href={whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_click", { location: "mobile_nav" })}
            className="mb-4 inline-flex min-h-11 items-center gap-2 type-eyebrow text-[11px] text-gold"
          >
            Message us on WhatsApp
          </a>
          <p className="text-white/70">{fullAddress}</p>
          <p className="mt-1">{hoursSummary}</p>
        </div>
      </div>
    </div>
  );
}
