import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, Container } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { PhoneLink, WhatsAppLink, DirectionsLink } from "@/components/layout/ContactLinks";
import {
  phone,
  email,
  showroom,
  openingHours,
  hoursStatus,
  social,
} from "@/content/site";
import { formatTime } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";
import { jsonLd, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Contact RABS Flooring | Stoke-on-Trent",
  description:
    "Call, WhatsApp or visit RABS Flooring in Stoke-on-Trent. Phone 07774 596596 or get a free quote online.",
  path: "/contact",
});

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "/contact" },
];

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(crumbs))} />

      <PageHero
        eyebrow="Contact"
        title={["Give us", "a shout."]}
        lead="Call, message or come in. Whichever is easiest — we are not precious about it."
        image="showroom/hero"
        imageHint="Showroom exterior"
        crumbs={crumbs}
        size="sm"
      />

      <Section tone="parchment">
        <Container wide>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <PhoneLink
              location="contact_card"
              className="group flex flex-col justify-between border border-stone bg-white p-7 transition-colors hover:border-champagne sm:p-8"
            >
              <div>
                <span className="mb-5 flex h-11 w-11 items-center justify-center bg-ink text-gold">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h2 className="type-editorial text-2xl text-ink">Call us</h2>
                <p className="mt-2 text-sm text-muted">
                  Quickest way to get an answer about stock or a price.
                </p>
              </div>
              <p className="mt-7 type-display text-2xl text-burgundy">{phone.display}</p>
            </PhoneLink>

            <WhatsAppLink
              location="contact_card"
              className="group flex flex-col justify-between border border-stone bg-white p-7 transition-colors hover:border-champagne sm:p-8"
            >
              <div>
                <span className="mb-5 flex h-11 w-11 items-center justify-center bg-ink text-gold">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                    <path d="M21 11.5a8.4 8.4 0 0 1-12.3 7.5L3 20.5l1.6-5.5A8.5 8.5 0 1 1 21 11.5Z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h2 className="type-editorial text-2xl text-ink">WhatsApp</h2>
                <p className="mt-2 text-sm text-muted">
                  Send us a photo of the room — often more use than a description.
                </p>
              </div>
              <p className="mt-7 type-eyebrow text-burgundy">Open WhatsApp &rarr;</p>
            </WhatsAppLink>

            <a
              href={`mailto:${email.value}`}
              className="group flex flex-col justify-between border border-stone bg-white p-7 transition-colors hover:border-champagne sm:p-8"
            >
              <div>
                <span className="mb-5 flex h-11 w-11 items-center justify-center bg-ink text-gold">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" />
                    <path d="m3 6 9 7 9-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h2 className="type-editorial text-2xl text-ink">Email</h2>
                <p className="mt-2 text-sm text-muted">
                  Best for anything with a lot of detail or a long list of rooms.
                </p>
              </div>
              <p className="mt-7 break-all text-sm text-burgundy">{email.value}</p>
            </a>
          </div>

          {/* Showroom + hours */}
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className="border border-stone bg-white p-7 sm:p-9">
              <h2 className="type-display text-2xl text-ink sm:text-3xl">Come in and see us</h2>
              <address className="mt-5 not-italic text-lg leading-relaxed text-body">
                {showroom.line1.value}
                <br />
                {showroom.locality.value}
                <br />
                {showroom.city}
                <br />
                {showroom.postcode.value}
              </address>

              <div className="mt-7 flex flex-wrap gap-3">
                <DirectionsLink
                  location="contact_page"
                  className="inline-flex min-h-11 items-center bg-ink px-5 type-eyebrow text-[11px] text-white transition-colors hover:bg-charcoal"
                >
                  Get directions
                </DirectionsLink>
                <a
                  href={social.instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center border border-ink/20 px-5 type-eyebrow text-[11px] text-ink transition-colors hover:border-burgundy hover:text-burgundy"
                >
                  Instagram
                </a>
                <a
                  href={social.facebook.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center border border-ink/20 px-5 type-eyebrow text-[11px] text-ink transition-colors hover:border-burgundy hover:text-burgundy"
                >
                  Facebook
                </a>
              </div>

              <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden bg-ink">
                <Media
                  slot="showroom/map-static"
                  alt={`Map showing RABS Flooring at ${showroom.postcode.value}`}
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  hint="Static map image"
                />
                <DirectionsLink location="contact_map" className="absolute inset-0">
                  <span className="sr-only">Open directions in Google Maps</span>
                </DirectionsLink>
              </div>
            </div>

            <div className="border border-stone bg-white p-7 sm:p-9">
              <h2 className="type-display text-2xl text-ink sm:text-3xl">Opening hours</h2>

              <dl className="mt-5">
                {openingHours.map((h) => (
                  <div key={h.day} className="flex justify-between border-b border-stone py-3 text-sm">
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
                <p className="mt-5 text-xs leading-relaxed text-muted">
                  Please ring before making a special trip — hours can change around bank holidays.
                </p>
              )}

              <div className="mt-8 border-t border-stone pt-7">
                <h3 className="type-editorial text-xl text-ink">Rather send the details?</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Fill in the quote form and we will come back to you the way you prefer.
                </p>
                <div className="mt-5">
                  <Button href="/get-a-quote" variant="red" size="md" arrow>
                    Get a free quote
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
