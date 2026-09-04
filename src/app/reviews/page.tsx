import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, Container } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { ReviewCard, Stars } from "@/components/domain/ReviewCard";
import { Reveal } from "@/components/ui/Reveal";
import { reviews } from "@/content/reviews";
import { reviewAggregate, social } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import { jsonLd, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Customer Reviews | RABS Flooring Stoke-on-Trent",
  description:
    "What customers say about RABS Flooring in Stoke-on-Trent — flooring, fitting, furniture and service.",
  path: "/reviews",
});

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Reviews", href: "/reviews" },
];

/**
 * Reviews.
 *
 * The empty state here is deliberate and, in a pitch, worth more than a wall
 * of invented five-star quotes: it demonstrates the component, states plainly
 * why nothing is shown, and points at the platforms where RABS's genuine
 * reviews already live.
 *
 * No Review or AggregateRating schema is emitted while `reviews` is empty and
 * `reviewAggregate.publish` is false. Marking up a rating you cannot evidence
 * is a manual-action risk.
 */
export default function ReviewsPage() {
  const hasReviews = reviews.length > 0;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(crumbs))} />

      <PageHero
        eyebrow="Reviews"
        title={["Don't take", "our word for it."]}
        lead="Every review here is a real customer, in their own words, with a link back to where they left it."
        image="showroom/interior-wide"
        imageHint="Showroom or happy customer photo"
        crumbs={crumbs}
      />

      <Section tone="parchment">
        <Container wide>
          {hasReviews ? (
            <>
              {reviewAggregate.publish && (
                <div className="mb-10 flex flex-wrap items-center gap-4 border-b border-stone pb-8">
                  <Stars rating={Math.round(reviewAggregate.ratingValue)} />
                  <p className="text-sm text-muted">
                    <span className="font-bold text-ink">{reviewAggregate.ratingValue}</span> average
                    from {reviewAggregate.reviewCount} reviews
                  </p>
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {reviews.map((review, i) => (
                  <Reveal key={review.id} delay={Math.min(i, 5) * 0.05}>
                    <ReviewCard review={review} />
                  </Reveal>
                ))}
              </div>
            </>
          ) : (
            <div className="mx-auto max-w-2xl border border-stone bg-white p-8 sm:p-12">
              <span className="rule-gold mb-6 block h-px w-12" aria-hidden="true" />
              <h2 className="type-display text-3xl text-ink sm:text-4xl">
                We&rsquo;re gathering these properly.
              </h2>

              <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
                <p>
                  Our customers have left plenty of reviews on Google and Facebook. We are bringing
                  them together here with the reviewer&rsquo;s name, the date and a link back to the
                  original, so you can check any of them yourself.
                </p>
                <p>
                  Until that is done we would rather show you nothing than a handful of quotes you
                  have no way of verifying. In the meantime, they are all on our social pages.
                </p>
              </div>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={social.facebook.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center bg-ink px-6 py-3.5 type-eyebrow text-xs text-white transition-colors hover:bg-charcoal"
                >
                  Reviews on Facebook
                </a>
                <a
                  href={social.instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center border border-ink/20 px-6 py-3.5 type-eyebrow text-xs text-ink transition-colors hover:border-burgundy hover:text-burgundy"
                >
                  Follow on Instagram
                </a>
              </div>
            </div>
          )}
        </Container>
      </Section>

      <Section tone="ink">
        <Container>
          <div className="text-center">
            <h2 className="type-display text-3xl sm:text-4xl lg:text-5xl">
              <span className="block">Been a customer?</span>
              <span className="block text-gold">We&rsquo;d love a review.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/65">
              It genuinely helps a local business, and it takes a minute.
            </p>
            <div className="mt-9">
              <Button href="/contact" variant="gold" size="lg" arrow>
                Get in touch
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
