import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, Container, SectionHeading } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { PhoneLink } from "@/components/layout/ContactLinks";
import { serviceAreas, coverageStatus } from "@/content/areas";
import { showroom, phone } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import { jsonLd, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Areas We Cover | Flooring & Fitting Around Stoke-on-Trent",
  description:
    "RABS Flooring fits carpet, LVT, laminate and vinyl across Stoke-on-Trent and the surrounding Staffordshire area. Call to check your postcode.",
  path: "/areas-we-cover",
});

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Areas we cover", href: "/areas-we-cover" },
];

/**
 * ONE HONEST PAGE, NOT FIFTY DOORWAY PAGES.
 *
 * The conventional local-SEO move is a separate page per town — "Carpets in
 * Hanley", "Carpets in Tunstall", "Carpets in Kidsgrove" — each a copy of the
 * last with the place name swapped. It is the pattern search engines have
 * spent years demoting, and it makes a real business look like an affiliate
 * farm.
 *
 * A town earns its own page here only once RABS confirms they serve it AND
 * there is something unique to say: real projects there, real customers there.
 * That switch is `hasOwnPage` in content/areas.ts, and it is false everywhere
 * for now.
 */
export default function AreasPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(crumbs))} />

      <PageHero
        eyebrow="Areas we cover"
        title={["Stoke-on-Trent", "and around it."]}
        lead={`Our showroom is in ${showroom.locality.value}, and we fit across the city and the surrounding area.`}
        image="showroom/hero"
        imageHint="Showroom exterior or local landmark"
        crumbs={crumbs}
        size="sm"
      />

      <Section tone="parchment">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Where we work"
                title={["Not sure if we", "reach you?"]}
                size="md"
              />
              <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
                <p>
                  The areas below are the ones nearest our showroom. We do travel further for larger
                  jobs, and there are places on this list we can reach easily that are further away
                  than somewhere we might not.
                </p>
                <p>
                  Rather than guess, give us your postcode. It takes one phone call and you get a
                  straight yes or no instead of a map with a circle drawn on it.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <PhoneLink
                  location="areas_page"
                  className="inline-flex min-h-11 items-center justify-center bg-ink px-6 py-3.5 type-eyebrow text-xs text-white transition-colors hover:bg-charcoal"
                >
                  Call {phone.display}
                </PhoneLink>
                <Button href="/get-a-quote" variant="outline" size="md">
                  Send your postcode
                </Button>
              </div>
            </div>

            <div>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-0 sm:grid-cols-3">
                {serviceAreas.map((area) => (
                  <li key={area.name} className="border-b border-stone py-4">
                    <span className="block text-base text-ink">{area.name}</span>
                    {area.note && (
                      <span className="mt-0.5 block text-xs text-muted">{area.note}</span>
                    )}
                  </li>
                ))}
              </ul>

              {coverageStatus !== "verified" && (
                <p className="mt-8 border-l-2 border-champagne pl-5 text-sm leading-relaxed text-muted">
                  This list is a guide to the areas around our showroom, not a fixed boundary. If
                  you are just outside it, ring us anyway — it often depends on the size of the job
                  more than the distance.
                </p>
              )}
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="ink">
        <Container>
          <div className="text-center">
            <h2 className="type-display text-3xl sm:text-4xl lg:text-5xl">
              <span className="block">Give us your postcode.</span>
              <span className="block text-gold">We&rsquo;ll tell you straight.</span>
            </h2>
            <div className="mt-9">
              <Button href="/get-a-quote" variant="gold" size="lg" arrow>
                Get a free quote
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
