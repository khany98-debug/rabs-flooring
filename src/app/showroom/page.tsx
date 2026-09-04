import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, Container, SectionHeading } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { PhoneLink, WhatsAppLink, DirectionsLink } from "@/components/layout/ContactLinks";
import {
  showroom,
  phone,
  email,
  openingHours,
  hoursStatus,
  legacyAddresses,
} from "@/content/site";
import { PITCH_MODE } from "@/content/pitch";
import { formatTime } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";
import { jsonLd, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Our Showroom | Flooring & Furniture in Stoke-on-Trent",
  description:
    "Visit the RABS Flooring showroom in Burslem, Stoke-on-Trent. Carpets, LVT, laminate, vinyl, sofas, beds, dining and blinds — all under one roof.",
  path: "/showroom",
});

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Showroom", href: "/showroom" },
];

const WHAT_YOU_FIND = [
  { name: "Carpets", note: "Full rolls and large samples you can walk on" },
  { name: "LVT", note: "Wood and stone effects, laid so you can see the finish" },
  { name: "Laminate", note: "Grain, texture and joint quality up close" },
  { name: "Vinyl", note: "Rolls you can unroll and see properly" },
  { name: "Sofas", note: "Corner units and suites — sit on them" },
  { name: "Beds", note: "Frames and mattresses, ready to try" },
  { name: "Dining", note: "Tables and chairs at real scale" },
  { name: "Blinds", note: "Fabrics and light levels in hand" },
];

const WHY_VISIT = [
  {
    title: "Colour is different in person",
    body: "Screens lie about colour, and every room's light is different again. Seeing a full-size piece under real light settles it in seconds.",
  },
  {
    title: "You can feel the difference",
    body: "Two carpets that look identical in a photograph can feel completely different underfoot. That is not something we can describe to you over the phone.",
  },
  {
    title: "Try the furniture properly",
    body: "Seat depth, cushion firmness and back height are personal. Sit on it the way you actually sit at home.",
  },
  {
    title: "Hold the floor against the sofa",
    body: "The genuine advantage of having both in one showroom — you are not matching a grey to a memory.",
  },
  {
    title: "Talk to someone who fits these",
    body: "Bring your measurements and photos of the room. Ten minutes of conversation saves a lot of guessing.",
  },
  {
    title: "Get the fitting sorted at the same time",
    body: "Ask how the job would run, what preparation your subfloor might need, and how long it takes.",
  },
];

export default function ShowroomPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(crumbs))} />

      <PageHero
        eyebrow="Visit RABS"
        title={["Come and see it", "for yourself."]}
        lead={`Flooring, furniture and blinds under one roof in ${showroom.locality.value}, ${showroom.city}.`}
        image="showroom/panorama"
        imageHint="Showroom panorama or exterior"
        crumbs={crumbs}
        size="lg"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <DirectionsLink
            location="showroom_hero"
            className="inline-flex min-h-11 items-center justify-center gap-2 bg-gold px-8 py-4 type-eyebrow text-[13px] text-ink transition-colors hover:bg-gold-soft"
          >
            Get directions
          </DirectionsLink>
          <PhoneLink
            location="showroom_hero"
            className="inline-flex min-h-11 items-center justify-center border border-white/30 px-8 py-4 type-eyebrow text-[13px] text-white transition-colors hover:border-gold hover:text-gold"
          >
            Call {phone.display}
          </PhoneLink>
        </div>
      </PageHero>

      {/* Practical details */}
      <Section tone="parchment" aria-labelledby="visit-title">
        <Container wide>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            <div>
              <SectionHeading
                id="visit-title"
                eyebrow="Where and when"
                title={["Finding us", "in Stoke-on-Trent."]}
                size="md"
              />

              <div className="mt-9 space-y-8">
                <div>
                  <p className="type-eyebrow mb-3 text-burgundy">Address</p>
                  <address className="not-italic text-lg leading-relaxed text-ink">
                    {showroom.line1.value}
                    <br />
                    {showroom.locality.value}
                    <br />
                    {showroom.city}
                    <br />
                    {showroom.postcode.value}
                  </address>
                </div>

                <div>
                  <p className="type-eyebrow mb-3 text-burgundy">Opening hours</p>
                  <dl className="max-w-sm">
                    {openingHours.map((h) => (
                      <div
                        key={h.day}
                        className="flex justify-between border-b border-stone py-2 text-sm"
                      >
                        <dt className="text-muted">{h.day}</dt>
                        <dd className="font-medium text-ink">
                          {h.opens && h.closes
                            ? `${formatTime(h.opens)} – ${formatTime(h.closes)}`
                            : "Closed"}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  {hoursStatus !== "verified" && (
                    <p className="mt-4 max-w-sm text-xs leading-relaxed text-muted">
                      Please ring before making a special trip. Hours can change around bank
                      holidays and we would rather you called than found the door shut.
                    </p>
                  )}
                </div>

                <div>
                  <p className="type-eyebrow mb-3 text-burgundy">Get in touch</p>
                  <div className="flex flex-wrap gap-3">
                    <PhoneLink
                      location="showroom_details"
                      className="inline-flex min-h-11 items-center border border-ink/20 px-5 text-sm text-ink transition-colors hover:border-burgundy hover:text-burgundy"
                    >
                      {phone.display}
                    </PhoneLink>
                    <WhatsAppLink
                      location="showroom_details"
                      className="inline-flex min-h-11 items-center border border-ink/20 px-5 text-sm text-ink transition-colors hover:border-burgundy hover:text-burgundy"
                    >
                      WhatsApp
                    </WhatsAppLink>
                    <a
                      href={`mailto:${email.value}`}
                      className="inline-flex min-h-11 items-center border border-ink/20 px-5 text-sm text-ink transition-colors hover:border-burgundy hover:text-burgundy"
                    >
                      Email us
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Static map panel. An embedded Google iframe sets cookies before
                consent and costs several hundred kilobytes; this is a linked
                image that opens the real map on tap. */}
            <Reveal>
              <div className="border border-stone bg-white">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink">
                  <Media
                    slot="showroom/map-static"
                    alt={`Map showing RABS Flooring at ${showroom.line1.value}, ${showroom.postcode.value}`}
                    sizes="(max-width: 1024px) 100vw, 52vw"
                    hint="Static map image"
                  />
                  <DirectionsLink
                    location="showroom_map"
                    className="absolute inset-0 flex items-end justify-end p-5"
                  >
                    <span className="bg-gold px-5 py-3 type-eyebrow text-[10px] text-ink">
                      Open in Google Maps
                    </span>
                  </DirectionsLink>
                </div>
                <div className="p-5 text-xs leading-relaxed text-muted">
                  We are on Waterloo Road in {showroom.locality.value}. Tap the map for
                  turn-by-turn directions from wherever you are.
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* What you'll find */}
      <Section tone="ink" aria-labelledby="find-title">
        <Container wide>
          <SectionHeading
            id="find-title"
            eyebrow="What you'll find"
            title={["Everything, in", "one building."]}
            lead="Not a folder of samples — full displays you can actually get your hands on."
            onDark
          />

          <ul className="mt-12 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
            {WHAT_YOU_FIND.map((item, i) => (
              <Reveal key={item.name} delay={Math.min(i, 4) * 0.04}>
                <li className="border-t border-white/15 pt-5">
                  <h3 className="type-editorial text-xl text-white">{item.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{item.note}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Gallery */}
      <Section tone="parchment" aria-labelledby="gallery-title">
        <Container wide>
          <SectionHeading
            id="gallery-title"
            eyebrow="Inside the showroom"
            title={["Have a look", "around."]}
            size="md"
          />

          <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              { slot: "showroom/gallery-1", hint: "Carpet display", tall: true },
              { slot: "showroom/gallery-2", hint: "LVT display", tall: false },
              { slot: "showroom/gallery-3", hint: "Sofa area", tall: false },
              { slot: "showroom/gallery-4", hint: "Beds area", tall: true },
              { slot: "showroom/gallery-5", hint: "Dining display", tall: false },
              { slot: "showroom/gallery-6", hint: "Blinds display", tall: false },
            ].map((img, i) => (
              <Reveal key={img.slot} delay={Math.min(i, 5) * 0.04}>
                <div
                  className={`media-zoom relative w-full overflow-hidden bg-ink ${
                    img.tall ? "aspect-[3/4]" : "aspect-square"
                  }`}
                >
                  <Media
                    slot={img.slot}
                    alt="Inside the RABS Flooring showroom"
                    sizes="(max-width: 640px) 46vw, 24vw"
                    hint={img.hint}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Why visit */}
      <Section tone="burgundy" aria-labelledby="why-visit-title">
        <div className="texture-weave pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />
        <Container wide>
          <div className="relative">
            <SectionHeading
              id="why-visit-title"
              eyebrow="Why come in"
              title={["Six things a screen", "cannot do."]}
              onDark
            />

            <ul className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
              {WHY_VISIT.map((item, i) => (
                <Reveal key={item.title} delay={Math.min(i, 3) * 0.05}>
                  <li className="border-t border-white/20 pt-6">
                    <span className="rule-gold mb-4 block h-px w-8" aria-hidden="true" />
                    <h3 className="type-editorial text-xl text-white">{item.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-white/70">{item.body}</p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Address conflict notice — pitch build only */}
      {PITCH_MODE && (
        <Section tone="ivory" padded={false}>
          <Container>
            <div className="my-12 border-l-2 border-ember bg-white p-6 sm:p-8">
              <p className="type-eyebrow mb-3 text-ember">Needs confirming before launch</p>
              <p className="text-sm leading-relaxed text-body">
                Public listings for RABS currently show more than one address. The trading address,
                postcode and opening hours all need confirming, and the stale citations need
                correcting, before this page goes live.
              </p>
              <ul className="mt-5 space-y-3 text-sm">
                {legacyAddresses.map((a) => (
                  <li key={a.value} className="border-t border-stone pt-3">
                    <span className="block text-xs uppercase tracking-wider text-muted">
                      {a.label} · {a.source}
                    </span>
                    <span className="mt-1 block text-body">{a.value}</span>
                    <span className="mt-1 block text-xs text-muted">{a.question}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </Section>
      )}

      <Section tone="ink">
        <Container>
          <div className="text-center">
            <h2 className="type-display text-3xl sm:text-4xl lg:text-5xl">
              <span className="block">Planning a visit?</span>
              <span className="block text-gold">Get a head start.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/65">
              Send us your rooms and rough sizes before you come in, and we can have something ready
              to show you when you arrive.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/get-a-quote" variant="gold" size="lg" arrow>
                Get a free quote
              </Button>
              <Button href="/our-work" variant="outline" size="lg" onDark>
                See our work
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
