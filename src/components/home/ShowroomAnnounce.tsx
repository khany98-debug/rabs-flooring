import { Media } from "@/components/ui/Media";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { PhoneLink, DirectionsLink } from "@/components/layout/ContactLinks";
import { showroom, phone, hoursSummary, hoursStatus } from "@/content/site";

/**
 * Showroom announcement.
 *
 * A new, larger showroom is the biggest thing RABS has to say right now, so it
 * gets the second slot on the page and full-bleed photography rather than a
 * card in a grid.
 *
 * Note what is absent: no parking claim, and the hours carry a "call to check"
 * caveat while `hoursStatus` is unresolved. Both are unconfirmed, and sending
 * somebody to a closed shop is the single worst thing a local site can do.
 */
export function ShowroomAnnounce() {
  return (
    <section className="relative isolate overflow-hidden bg-oxblood text-white" aria-labelledby="showroom-announce">
      <div className="absolute inset-0" aria-hidden="true">
        <Media
          slot="showroom/interior-wide"
          alt=""
          sizes="100vw"
          hint="Showroom interior — wide"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(95deg, color-mix(in srgb, var(--color-oxblood) 96%, transparent) 0%, color-mix(in srgb, var(--color-oxblood) 88%, transparent) 42%, color-mix(in srgb, var(--color-ink) 55%, transparent) 100%)",
          }}
        />
        <div className="texture-weave absolute inset-0 opacity-30" />
      </div>

      <Container wide>
        <div className="relative py-16 sm:py-24 lg:py-32">
          <Reveal className="max-w-2xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="rule-gold h-px w-8" aria-hidden="true" />
              <p className="type-eyebrow text-gold">Our biggest showroom yet</p>
            </div>

            <h2 id="showroom-announce" className="type-display text-[2.5rem] leading-[0.9] sm:text-[3.5rem] lg:text-[4.25rem]">
              <span className="block">{showroom.line1.value}</span>
              <span className="block text-gold">
                {showroom.locality.value}, {showroom.city}
              </span>
            </h2>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/75">
              Flooring, furniture and blinds under one roof — with room to see full-size displays
              rather than a handful of samples in a folder.
            </p>

            <dl className="mt-10 grid gap-6 sm:grid-cols-3">
              <div>
                <dt className="type-eyebrow mb-2 flex items-center gap-2 text-[10px] text-gold">
                  <ClockIcon /> Opening hours
                </dt>
                <dd className="text-sm text-white/85">
                  {hoursSummary}
                  {hoursStatus !== "verified" && (
                    <span className="mt-1 block text-xs text-white/45">
                      Please call to confirm before travelling.
                    </span>
                  )}
                </dd>
              </div>

              <div>
                <dt className="type-eyebrow mb-2 flex items-center gap-2 text-[10px] text-gold">
                  <PhoneIcon /> Call us
                </dt>
                <dd>
                  <PhoneLink location="showroom_announce" className="text-sm text-white/85 hover:text-gold">
                    {phone.display}
                  </PhoneLink>
                </dd>
              </div>

              <div>
                <dt className="type-eyebrow mb-2 flex items-center gap-2 text-[10px] text-gold">
                  <PinIcon /> Visit us
                </dt>
                <dd className="text-sm leading-relaxed text-white/85">
                  {showroom.line1.value}
                  <br />
                  {showroom.locality.value}, {showroom.postcode.value}
                </dd>
              </div>
            </dl>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href="/showroom" variant="gold" size="lg" arrow>
                Explore the showroom
              </Button>
              <DirectionsLink
                location="showroom_announce"
                className="inline-flex min-h-11 items-center justify-center gap-2 border border-white/30 px-8 py-4 type-eyebrow text-[13px] text-white transition-colors hover:border-gold hover:text-gold"
              >
                Get directions
              </DirectionsLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
