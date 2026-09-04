import { Section, Container, SectionHeading } from "@/components/ui/Layout";
import { OfferCard } from "@/components/domain/OfferCard";
import { Reveal } from "@/components/ui/Reveal";
import { getActiveOffers } from "@/content/offers";

/**
 * "This week at RABS."
 *
 * RABS is a genuinely promotional business and that energy is an asset, not
 * something to sand off in the name of looking premium. What changes here is
 * the execution: a proper editorial grid on a deep ink ground, one featured
 * campaign leading, and typography doing the shouting instead of starbursts.
 *
 * The section removes itself entirely when nothing is running, so the site
 * never displays an empty "Offers" heading — and expired campaigns drop out on
 * their own via getActiveOffers().
 */
export function OfferSection() {
  const active = getActiveOffers();
  if (active.length === 0) return null;

  const [featured, ...others] = active;

  return (
    <Section tone="ink" aria-labelledby="offers-title">
      <Container wide>
        <SectionHeading
          id="offers-title"
          eyebrow="This week at RABS"
          title={["Amazing offers.", "Unbeatable prices."]}
          lead="Our deals change regularly. Here is what is running right now — call or come in and we will tell you exactly what it covers."
          onDark
          action={{ label: "View all offers", href: "/offers" }}
        />

        {/* Lead campaign runs full width as a horizontal split, then the rest
            sit in an even row beneath. A tall featured card beside a stacked
            column leaves one side of the grid noticeably longer than the other. */}
        <Reveal className="mt-12">
          <OfferCard offer={featured} featured />
        </Reveal>

        {others.length > 0 && (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((offer, i) => (
              <Reveal key={offer.id} delay={Math.min(i, 3) * 0.07}>
                <OfferCard offer={offer} />
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
