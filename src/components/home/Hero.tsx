import { Media } from "@/components/ui/Media";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Layout";
import { PhoneLink } from "@/components/layout/ContactLinks";
import { phone } from "@/content/site";

/**
 * Homepage hero.
 *
 * Split rather than full-bleed-overlay: the type sits on a solid ink panel and
 * the photograph occupies its own half. That decision is deliberate — RABS's
 * best imagery is a bright, warm, busy showroom, and dropping a dark scrim over
 * it to make white text readable would waste the one asset that proves the
 * business is real. On mobile the image sits behind the copy with a scrim,
 * because a stacked half-and-half wastes the first screen.
 *
 * The H1 is the tagline RABS already owns. Nothing invented.
 */

const PROOF = [
  { title: "Professional fitting", body: "Fitted by our own team", icon: "tools" },
  { title: "Huge choice", body: "Flooring, furniture & blinds", icon: "grid" },
  { title: "Local & trusted", body: "Stoke-on-Trent showroom", icon: "pin" },
  { title: "Supply or fit", body: "Supply only, or supplied and fitted", icon: "check" },
] as const;

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white" aria-labelledby="hero-title">
      <div className="lg:grid lg:min-h-[38rem] lg:grid-cols-[minmax(0,44%)_minmax(0,56%)] xl:min-h-[42rem]">
        {/* Photograph. On mobile it is the background; on desktop its own column. */}
        <div className="absolute inset-0 lg:relative lg:order-2 lg:inset-auto">
          <Media
            slot="showroom/hero"
            alt="The RABS Flooring showroom in Stoke-on-Trent"
            priority
            sizes="(max-width: 1024px) 100vw, 56vw"
            hint="Showroom exterior — wide shot"
          />
          {/* Mobile: darken for legibility. Desktop: feather the seam only. */}
          <div className="absolute inset-0 bg-ink/72 lg:hidden" aria-hidden="true" />
          <div
            className="absolute inset-y-0 -left-px hidden w-40 lg:block"
            aria-hidden="true"
            style={{
              background: "linear-gradient(90deg, var(--color-ink) 0%, transparent 100%)",
            }}
          />
        </div>

        {/* Copy */}
        <div className="relative lg:order-1 lg:flex lg:items-center">
          <div className="w-full py-16 sm:py-20 lg:py-24 lg:pr-6">
            <Container className="lg:mx-0 lg:max-w-none lg:pl-12 xl:pl-16">
              <div className="max-w-xl">
                <div className="mb-6 flex items-center gap-3">
                  <span className="rule-gold h-px w-8" aria-hidden="true" />
                  <p className="type-eyebrow text-gold">
                    Flooring &middot; Furniture &middot; Professional fitting
                  </p>
                </div>

                <h1
                  id="hero-title"
                  className="type-display text-[3.25rem] leading-[0.86] sm:text-[4.5rem] lg:text-[4.75rem] xl:text-[5.5rem]"
                >
                  <span className="block">Turning houses</span>
                  <span className="block text-gold">into homes.</span>
                </h1>

                <p className="mt-7 max-w-md text-base leading-relaxed text-white/75 sm:text-lg">
                  Discover flooring, furniture and home essentials at our Stoke-on-Trent showroom,
                  with expert advice and professional fitting.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button href="/get-a-quote" variant="gold" size="lg" arrow>
                    Get a free quote
                  </Button>
                  <Button href="/showroom" variant="outline" size="lg" onDark>
                    Visit our showroom
                  </Button>
                </div>

                <PhoneLink
                  location="hero"
                  className="mt-6 inline-flex min-h-11 items-center gap-3 text-white/70 transition-colors hover:text-gold"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center border border-white/20">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 text-gold" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm">
                    Or call us on <span className="font-semibold text-white">{phone.display}</span>
                  </span>
                </PhoneLink>
              </div>
            </Container>
          </div>
        </div>
      </div>

      {/* Proof strip */}
      <div className="relative border-t border-white/10 bg-charcoal">
        <Container wide>
          <ul className="grid grid-cols-2 divide-white/10 sm:grid-cols-4 sm:divide-x">
            {PROOF.map((item) => (
              <li key={item.title} className="flex items-start gap-3.5 px-1 py-5 sm:px-6 sm:py-7">
                <ProofIcon name={item.icon} />
                <div className="min-w-0">
                  <p className="type-eyebrow text-[10px] text-gold">{item.title}</p>
                  <p className="mt-1 text-xs leading-snug text-white/55">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}

function ProofIcon({ name }: { name: (typeof PROOF)[number]["icon"] }) {
  const common = {
    className: "h-5 w-5 shrink-0 text-champagne",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    "aria-hidden": true as const,
  };

  switch (name) {
    case "tools":
      return (
        <svg {...common}>
          <path d="m14 6 4-4 4 4-4 4-2-2M3 21l7-7M2 15l7 7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10.5 9.5 14 13" strokeLinecap="round" />
        </svg>
      );
    case "grid":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" strokeLinejoin="round" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m8 12 3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}
