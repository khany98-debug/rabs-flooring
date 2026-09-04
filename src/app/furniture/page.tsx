import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section, Container, SectionHeading } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { CategoryCard } from "@/components/ui/Cards";
import { furnitureCategories } from "@/content/categories";
import { buildMetadata } from "@/lib/seo";
import { jsonLd, breadcrumbSchema } from "@/lib/schema";
import { PhoneLink } from "@/components/layout/ContactLinks";
import { phone } from "@/content/site";

export const metadata: Metadata = buildMetadata({
  title: "Furniture in Stoke-on-Trent | Sofas, Beds & Dining | RABS",
  description:
    "Sofas, corner suites, beds, dining sets and living room furniture at the RABS showroom in Stoke-on-Trent. Come and try it before you buy.",
  path: "/furniture",
});

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Furniture", href: "/furniture" },
];

/**
 * The furniture hub leans harder on photography than the flooring hub does —
 * furniture is bought with the eyes first, flooring with the head.
 *
 * There is deliberately no "add to basket", no stock counter and no price
 * table. RABS's process is showroom-and-enquiry, and a checkout that does not
 * exist would be a lie dressed up as a feature. The CTAs are Enquire, Call and
 * Visit — which is what actually happens.
 */
export default function FurnitureHubPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(crumbs))} />

      <PageHero
        eyebrow="Furniture"
        title={["Furniture you", "can try first."]}
        lead="Sofas, beds, dining and living room pieces — in a showroom where you can sit on them, lie on them and see the fabric in daylight."
        image="furniture/hero"
        imageHint="Furniture display area"
        crumbs={crumbs}
        size="lg"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/showroom" variant="gold" size="lg" arrow>
            Visit the showroom
          </Button>
          <Button href="/get-a-quote?interest=furniture" variant="outline" size="lg" onDark>
            Enquire about a piece
          </Button>
        </div>
      </PageHero>

      <Section tone="parchment" aria-labelledby="furniture-cats">
        <Container wide>
          <SectionHeading
            id="furniture-cats"
            eyebrow="Shop by room"
            title={["Room by room,", "piece by piece."]}
            lead="Our showroom stock changes regularly. Call before travelling if you have your eye on something specific."
          />

          <div className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {furnitureCategories.map((category, i) => (
              <Reveal key={category.slug} delay={Math.min(i, 3) * 0.06}>
                <CategoryCard
                  name={category.name}
                  href={`/furniture/${category.slug}`}
                  image={category.image}
                  line={category.strapline}
                  tall
                  priority={i < 2}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Why the showroom, not a basket */}
      <Section tone="ink" aria-labelledby="why-showroom">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <Reveal>
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-charcoal">
                <Media
                  slot="furniture/showroom-sofas"
                  alt="Sofas on display in the RABS showroom"
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  hint="Sofa display"
                />
              </div>
            </Reveal>

            <div>
              <SectionHeading
                id="why-showroom"
                eyebrow="How we sell furniture"
                title={["No basket.", "On purpose."]}
                onDark
                size="md"
              />
              <div className="mt-6 space-y-5 text-base leading-relaxed text-white/70">
                <p>
                  You cannot judge a sofa from a photograph. Seat depth, back height, how firm the
                  cushions are, whether the fabric feels like something you want to sit on every
                  evening — none of that survives a product page.
                </p>
                <p>
                  So we do it the other way round. See the piece, ask the questions, and we will sort
                  the price, the delivery and the timing with you directly.
                </p>
              </div>

              <ul className="mt-9 space-y-3">
                {[
                  "Sit on it, lie on it, open the drawers",
                  "See the fabric and finish in daylight",
                  "Hold it against a flooring sample",
                  "Ask what is actually in stock right now",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/75">
                    <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-gold" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="m4 10 4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href="/get-a-quote?interest=furniture" variant="gold" size="md" arrow>
                  Enquire now
                </Button>
                <PhoneLink
                  location="furniture_hub"
                  className="inline-flex min-h-11 items-center justify-center border border-white/30 px-6 py-3.5 type-eyebrow text-xs text-white transition-colors hover:border-gold hover:text-gold"
                >
                  Call {phone.display}
                </PhoneLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Cross-sell to flooring — the genuine differentiator */}
      <Section tone="ivory">
        <Container>
          <div className="border border-stone bg-white p-8 text-center sm:p-12">
            <span className="rule-gold mx-auto mb-6 block h-px w-12" aria-hidden="true" />
            <h2 className="type-display text-3xl text-ink sm:text-4xl">
              Doing the floor as well?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted">
              Choosing the sofa and the floor in the same room, on the same day, is a great deal
              easier than trying to remember a shade of grey across two shops and a week.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/flooring" variant="red" size="md" arrow>
                Browse flooring
              </Button>
              <Link
                href="/get-a-quote?interest=whole-home"
                className="inline-flex min-h-11 items-center justify-center border border-ink/20 px-6 py-3.5 type-eyebrow text-xs text-ink transition-colors hover:border-burgundy hover:text-burgundy"
              >
                Quote the whole room
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
