import { Media } from "@/components/ui/Media";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { PhoneLink, WhatsAppLink, DirectionsLink } from "@/components/layout/ContactLinks";
import { showroom, phone, hoursSummary, hoursStatus } from "@/content/site";

/**
 * Closing panel: showroom details and the final call to action in one block.
 *
 * Every route out of the page is here — quote, call, WhatsApp, directions —
 * because this is where somebody who has read the whole page decides. The map
 * is a static, clickable panel rather than an embedded iframe: Google Maps
 * embeds set cookies before consent, cost several hundred kilobytes, and are a
 * common cause of a poor CLS score at the very bottom of a page.
 */
export function FinalCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white" aria-labelledby="final-cta-title">
      <div className="absolute inset-0" aria-hidden="true">
        <Media slot="showroom/panorama" alt="" sizes="100vw" hint="Showroom panorama" />
        <div className="scrim-hero absolute inset-0 opacity-95" />
      </div>

      <Container wide>
        <div className="relative grid gap-14 py-20 sm:py-24 lg:grid-cols-2 lg:items-center lg:gap-20 lg:py-32">
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="rule-gold h-px w-8" aria-hidden="true" />
              <p className="type-eyebrow text-gold">Come and see it for yourself</p>
            </div>

            <h2
              id="final-cta-title"
              className="type-display text-[2.5rem] leading-[0.9] sm:text-[3.5rem] lg:text-[4rem]"
            >
              <span className="block">Ready to transform</span>
              <span className="block text-gold">your home?</span>
            </h2>

            <p className="mt-6 max-w-md text-base leading-relaxed text-white/70">
              Tell us about your rooms and we will come back to you with a proper quote. Or just
              call in — the kettle is usually on.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="/get-a-quote" variant="gold" size="lg" arrow>
                Get a free quote
              </Button>
              <PhoneLink
                location="final_cta"
                className="inline-flex min-h-11 items-center justify-center gap-2 border border-white/30 px-8 py-4 type-eyebrow text-[13px] text-white transition-colors hover:border-gold hover:text-gold"
              >
                Call {phone.display}
              </PhoneLink>
              <WhatsAppLink
                location="final_cta"
                className="inline-flex min-h-11 items-center justify-center gap-2 border border-white/30 px-8 py-4 type-eyebrow text-[13px] text-white transition-colors hover:border-gold hover:text-gold"
              >
                WhatsApp
              </WhatsAppLink>
            </div>
          </Reveal>

          {/* Showroom card */}
          <Reveal delay={0.1}>
            <div className="border border-white/15 bg-ink/70 backdrop-blur-sm">
              <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-white/15">
                <Media
                  slot="showroom/map-static"
                  alt={`Map showing the RABS Flooring showroom on ${showroom.line1.value}`}
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  hint="Static map image"
                />
                <DirectionsLink
                  location="final_cta_map"
                  className="absolute inset-0 flex items-end justify-end p-4"
                >
                  <span className="bg-gold px-4 py-2.5 type-eyebrow text-[10px] text-ink">
                    Open in Maps
                  </span>
                </DirectionsLink>
              </div>

              <dl className="divide-y divide-white/10">
                <div className="flex justify-between gap-6 p-5">
                  <dt className="type-eyebrow text-[10px] text-gold">Address</dt>
                  <dd className="text-right text-sm leading-relaxed text-white/85">
                    {showroom.line1.value}
                    <br />
                    {showroom.locality.value}, {showroom.city}
                    <br />
                    {showroom.postcode.value}
                  </dd>
                </div>

                <div className="flex justify-between gap-6 p-5">
                  <dt className="type-eyebrow text-[10px] text-gold">Hours</dt>
                  <dd className="text-right text-sm text-white/85">
                    {hoursSummary}
                    {hoursStatus !== "verified" && (
                      <span className="mt-1 block text-xs text-white/45">
                        Call ahead to be sure
                      </span>
                    )}
                  </dd>
                </div>

                <div className="flex justify-between gap-6 p-5">
                  <dt className="type-eyebrow text-[10px] text-gold">Phone</dt>
                  <dd className="text-right text-sm">
                    <PhoneLink location="final_cta_card" className="text-white/85 hover:text-gold">
                      {phone.display}
                    </PhoneLink>
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
