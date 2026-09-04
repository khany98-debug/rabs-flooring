import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, Container, SectionHeading } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { OfferCard } from "@/components/domain/OfferCard";
import { getActiveOffers } from "@/content/offers";
import { buildMetadata } from "@/lib/seo";
import { jsonLd, breadcrumbSchema } from "@/lib/schema";
import { PhoneLink } from "@/components/layout/ContactLinks";
import { phone } from "@/content/site";

export const metadata: Metadata = buildMetadata({
  title: "Offers | Flooring & Furniture Deals | RABS",
  description:
    "What is on at RABS right now — flooring, furniture and whole-house packages. Offers change regularly, so call or come in to check the details.",
  path: "/offers",
});

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Offers", href: "/offers" },
];

/**
 * Offers page.
 *
 * No Offer/Product structured data is emitted here. Rich-result markup for a
 * price is only valid when the price is real and current; none of these have
 * confirmed figures yet, and a wrong price in schema is a manual-action risk.
 * Add the markup at the same time as the real numbers.
 */
export default function OffersPage() {
  const active = getActiveOffers();
  const [featured, ...rest] = active;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(crumbs))} />

      <PageHero
        eyebrow="This week at RABS"
        title={["Amazing offers.", "Unbeatable prices."]}
        lead="Our deals move quickly. Here is what is running right now — anything that has finished disappears from this page automatically."
        image="offers/hero"
        imageHint="Promotional showroom shot"
        crumbs={crumbs}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/get-a-quote" variant="gold" size="lg" arrow>
            Get a free quote
          </Button>
          <PhoneLink
            location="offers_hero"
            className="inline-flex min-h-11 items-center justify-center border border-white/30 px-8 py-4 type-eyebrow text-[13px] text-white transition-colors hover:border-gold hover:text-gold"
          >
            Call {phone.display}
          </PhoneLink>
        </div>
      </PageHero>

      <Section tone="ink">
        <Container wide>
          {active.length === 0 ? (
            <div className="mx-auto max-w-xl py-10 text-center">
              <h2 className="type-display text-3xl text-white sm:text-4xl">
                Nothing running right now
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/65">
                We run promotions regularly — follow us on Instagram or give us a call and we will
                tell you what is coming up.
              </p>
              <div className="mt-8">
                <Button href="/get-a-quote" variant="gold" size="md" arrow>
                  Get a quote anyway
                </Button>
              </div>
            </div>
          ) : (
            <>
              <Reveal>
                <OfferCard offer={featured} featured />
              </Reveal>

              {rest.length > 0 && (
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((offer, i) => (
                    <Reveal key={offer.id} delay={Math.min(i, 3) * 0.07}>
                      <OfferCard offer={offer} />
                    </Reveal>
                  ))}
                </div>
              )}
            </>
          )}
        </Container>
      </Section>

      {/* The small print, in plain English */}
      <Section tone="ivory" aria-labelledby="terms-title">
        <Container>
          <SectionHeading
            id="terms-title"
            eyebrow="The honest bit"
            title={["How our", "offers work."]}
            size="md"
          />

          <div className="mt-10 space-y-8">
            {[
              {
                q: "Why is there no price on some of these?",
                a: "Because the honest answer depends on your rooms. A whole-house package for a two-bedroom terrace and a four-bedroom detached are not the same job. We will give you a firm figure once we have measured, and it will not change afterwards.",
              },
              {
                q: "Do offers change?",
                a: "Regularly. Anything that has ended comes off this page automatically, so what you see here is what is actually available. If you have seen something on Instagram that is not here, ring us and ask.",
              },
              {
                q: "Can I combine offers?",
                a: "Ask us. Some things stack sensibly and some do not, and it is quicker to tell you straight than to bury it in terms and conditions.",
              },
            ].map((item) => (
              <div key={item.q} className="border-t border-stone pt-6">
                <h3 className="type-editorial text-xl text-ink">{item.q}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{item.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
