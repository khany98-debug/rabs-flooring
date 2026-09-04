"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { phone, whatsapp } from "@/content/site";
import { track } from "@/lib/analytics";

/**
 * Persistent mobile action bar: Call / Free quote / WhatsApp.
 *
 * Two details that matter and are usually missed:
 *
 *   1. It sets `--rabs-bottom-bar`, which globals.css applies as body padding.
 *      A fixed bar without that reservation covers the last section of every
 *      page — including footer links and the final CTA.
 *
 *   2. `env(safe-area-inset-bottom)` keeps it clear of the iPhone home
 *      indicator, so the buttons are not half-swallowed by the gesture area.
 *
 * It hides itself inside the quote wizard, where a competing set of sticky
 * controls would fight the form's own Back/Continue buttons.
 */
export function MobileActionBar() {
  const pathname = usePathname();
  const hidden = pathname.startsWith("/get-a-quote");

  // The bar only exists below the lg breakpoint, so the body padding is
  // reserved only there — otherwise every desktop page carries 68px of dead
  // space under the footer.
  useEffect(() => {
    const root = document.documentElement;
    const mq = window.matchMedia("(min-width: 1024px)");

    const apply = () => {
      root.style.setProperty(
        "--rabs-bottom-bar",
        mq.matches || hidden ? "0px" : "calc(4.25rem + env(safe-area-inset-bottom, 0px))",
      );
    };

    apply();
    mq.addEventListener("change", apply);
    return () => {
      mq.removeEventListener("change", apply);
      root.style.setProperty("--rabs-bottom-bar", "0px");
    };
  }, [hidden]);

  if (hidden) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/95 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="grid grid-cols-3">
        <a
          href={phone.href}
          onClick={() => track("phone_click", { location: "mobile_bar" })}
          className="flex min-h-[4.25rem] flex-col items-center justify-center gap-1 text-white/85 active:bg-white/5"
        >
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] text-gold" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="type-eyebrow text-[9px]">Call</span>
        </a>

        <Link
          href="/get-a-quote"
          className="flex min-h-[4.25rem] flex-col items-center justify-center gap-1 bg-gold text-ink active:bg-gold-soft"
        >
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M4 4h12l4 4v12H4z" strokeLinejoin="round" />
            <path d="M8 12h8M8 16h5" strokeLinecap="round" />
          </svg>
          <span className="type-eyebrow text-[9px]">Free quote</span>
        </Link>

        <a
          href={whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_click", { location: "mobile_bar" })}
          className="flex min-h-[4.25rem] flex-col items-center justify-center gap-1 text-white/85 active:bg-white/5"
        >
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] text-gold" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M21 11.5a8.4 8.4 0 0 1-12.3 7.5L3 20.5l1.6-5.5A8.5 8.5 0 1 1 21 11.5Z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="type-eyebrow text-[9px]">WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
