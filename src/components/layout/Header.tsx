"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Layout";
import { mainNav, type NavItem } from "@/content/nav";
import { phone, hoursSummary, showroom } from "@/content/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { MobileNav } from "./MobileNav";
import { SearchDialog } from "./SearchDialog";

/* -------------------------------------------------------------------------- */
/* Utility bar                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Scrolls away with the page rather than sticking — it carries useful context
 * on arrival but does not deserve permanent vertical space on a phone.
 */
function UtilityBar() {
  return (
    <div className="hidden bg-oxblood text-white/85 lg:block">
      <Container wide>
        <div className="flex h-9 items-center justify-between text-[11px] tracking-wide">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2">
              <PinIcon className="h-3 w-3 text-gold" />
              {showroom.locality.value}, {showroom.city} showroom
            </span>
            <span className="inline-flex items-center gap-2">
              <ClockIcon className="h-3 w-3 text-gold" />
              {hoursSummary}
            </span>
            <a
              href={phone.href}
              onClick={() => track("phone_click", { location: "utility_bar" })}
              className="inline-flex items-center gap-2 hover:text-gold"
            >
              <PhoneIcon className="h-3 w-3 text-gold" />
              {phone.display}
            </a>
          </div>

          <Link href="/offers" className="group inline-flex items-center gap-2 hover:text-gold">
            <span className="font-semibold text-gold">Offers on now</span>
            <span className="text-white/70">See what&rsquo;s running this week</span>
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              &rarr;
            </span>
          </Link>
        </div>
      </Container>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Mega menu                                                                  */
/* -------------------------------------------------------------------------- */

function MegaPanel({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  if (!item.mega) return null;

  return (
    <div className="grid grid-cols-[1fr_1fr_minmax(0,22rem)] gap-10 p-10">
      {item.mega.columns.map((col) => (
        <div key={col.title}>
          <p className="type-eyebrow mb-5 text-gold">{col.title}</p>
          <ul className="space-y-1">
            {col.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onNavigate}
                  className="group/link -mx-3 flex flex-col rounded-sm px-3 py-2.5 transition-colors hover:bg-white/[0.06]"
                >
                  <span className="type-editorial text-lg text-white group-hover/link:text-gold">
                    {link.label}
                  </span>
                  {link.hint && (
                    <span className="mt-0.5 text-xs text-white/45">{link.hint}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <Link
        href={item.mega.feature.href}
        onClick={onNavigate}
        className="group/feat relative flex min-h-[15rem] flex-col justify-end overflow-hidden bg-burgundy p-7"
      >
        <div className="texture-weave absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="relative">
          <span className="type-eyebrow text-gold">{item.mega.feature.eyebrow}</span>
          <h3 className="type-display mt-3 text-2xl text-white">{item.mega.feature.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/70">{item.mega.feature.body}</p>
          <span className="mt-5 inline-flex items-center gap-2 type-eyebrow text-[10px] text-gold">
            {item.mega.feature.cta}
            <span className="transition-transform duration-300 group-hover/feat:translate-x-1">
              &rarr;
            </span>
          </span>
        </div>
      </Link>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Header                                                                     */
/* -------------------------------------------------------------------------- */

export function Header() {
  const pathname = usePathname();

  /**
   * Open state is stored together with the path it was opened on, and the menu
   * is treated as closed the moment the path changes. Deriving it this way
   * closes the menu on every navigation — including browser back — without a
   * setState-in-effect and the extra render that comes with it.
   */
  const [menuState, setMenuState] = useState<{ path: string; label: string } | null>(null);
  const openMenu = menuState && menuState.path === pathname ? menuState.label : null;

  const [mobileState, setMobileState] = useState<string | null>(null);
  const mobileOpen = mobileState === pathname;

  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const close = useCallback(() => setMenuState(null), []);
  const setOpenMenu = useCallback(
    (label: string | null) => setMenuState(label ? { path: pathname, label } : null),
    [pathname],
  );

  // Escape closes the mega menu and returns focus to the trigger.
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        (document.getElementById(`nav-trigger-${openMenu}`) as HTMLElement | null)?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openMenu, close]);

  // A click anywhere outside the nav closes it.
  useEffect(() => {
    if (!openMenu) return;
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [openMenu, close]);

  /**
   * Hover opens the menu, but closing is delayed slightly: without it, moving
   * the pointer diagonally from the trigger down into the panel crosses a gap
   * and snaps the menu shut. It is the classic mega-menu annoyance.
   */
  const scheduleClose = () => {
    closeTimer.current = setTimeout(close, 140);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  useEffect(() => () => cancelClose(), []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-gold focus:px-4 focus:py-2 focus:type-eyebrow focus:text-ink"
      >
        Skip to content
      </a>

      <UtilityBar />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/95 backdrop-blur-md supports-[backdrop-filter]:bg-ink/85">
        <Container wide>
          <div ref={navRef} className="flex h-[4.5rem] items-center justify-between gap-4 lg:h-[5.25rem]">
            <Link href="/" className="shrink-0" aria-label="RABS Flooring — home">
              <Logo className="w-[7.5rem] sm:w-[8.5rem]" />
            </Link>

            {/* Desktop nav */}
            <nav aria-label="Main" className="hidden lg:block">
              <ul className="flex items-center">
                {mainNav.map((item) => {
                  const active =
                    pathname === item.href || pathname.startsWith(`${item.href}/`);
                  const isOpen = openMenu === item.label;

                  return (
                    <li
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => {
                        cancelClose();
                        if (item.mega) setOpenMenu(item.label);
                        else close();
                      }}
                      onMouseLeave={item.mega ? scheduleClose : undefined}
                    >
                      {item.mega ? (
                        <button
                          id={`nav-trigger-${item.label}`}
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={`nav-panel-${item.label}`}
                          onClick={() => setOpenMenu(isOpen ? null : item.label)}
                          className={cn(
                            "flex h-[5.25rem] items-center gap-1.5 px-2.5 type-eyebrow transition-colors xl:px-4",
                            active || isOpen ? "text-gold" : "text-white/85 hover:text-gold",
                          )}
                        >
                          {item.label}
                          <ChevronIcon
                            className={cn(
                              "h-2.5 w-2.5 transition-transform duration-300",
                              isOpen && "rotate-180",
                            )}
                          />
                        </button>
                      ) : (
                        <Link
                          href={item.href}
                          className={cn(
                            "flex h-[5.25rem] items-center px-2.5 type-eyebrow transition-colors xl:px-4",
                            item.accent
                              ? "text-ruby hover:text-gold"
                              : active
                                ? "text-gold"
                                : "text-white/85 hover:text-gold",
                          )}
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => {
                  setSearchOpen(true);
                  track("search_open");
                }}
                aria-label="Search the site"
                className="hidden h-11 w-11 shrink-0 items-center justify-center text-white/80 transition-colors hover:text-gold lg:inline-flex"
              >
                <SearchIcon className="h-4 w-4" />
              </button>

              <a
                href={phone.href}
                onClick={() => track("phone_click", { location: "header" })}
                aria-label={`Call RABS on ${phone.display}`}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-white/20 text-white transition-colors hover:border-gold hover:text-gold"
              >
                <PhoneIcon className="h-4 w-4" />
              </a>

              {/* Wrapped rather than given `hidden` directly: Button sets its own
                  `inline-flex`, and which of two competing display utilities wins
                  depends on their order in the generated stylesheet, not on the
                  class attribute. The wrapper has no such conflict. */}
              <span className="hidden sm:block">
                <Button href="/get-a-quote" variant="gold" size="sm">
                  Get a free quote
                </Button>
              </span>

              <button
                type="button"
                onClick={() => setMobileState(pathname)}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center text-white lg:hidden"
              >
                <MenuIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </Container>

        {/* Mega panel — full-bleed under the header bar.
            Rendered only while open: toggling with the `hidden` attribute does
            not work here, because a Tailwind display utility in the author
            stylesheet overrides the user-agent [hidden] rule. */}
        {mainNav
          .filter((i) => i.mega && i.label === openMenu)
          .map((item) => (
            <div
              key={item.label}
              id={`nav-panel-${item.label}`}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
              className="absolute inset-x-0 top-full hidden border-b border-white/10 bg-charcoal shadow-2xl lg:block"
            >
              <Container wide>
                <MegaPanel item={item} onNavigate={close} />
              </Container>
            </div>
          ))}
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileState(null)} />
      {searchOpen && <SearchDialog onClose={() => setSearchOpen(false)} />}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Icons — inline so there is no icon library in the bundle                    */
/* -------------------------------------------------------------------------- */

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="m1 1 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
