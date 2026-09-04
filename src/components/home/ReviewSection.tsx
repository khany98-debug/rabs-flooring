import Link from "next/link";
import { Section, Container, SectionHeading } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { reviews } from "@/content/reviews";
import { reviewAggregate, social } from "@/content/site";
import { ReviewCard, Stars } from "@/components/domain/ReviewCard";

/**
 * Social proof.
 *
 * RABS has real reviews. None of them could be verified against a primary
 * source, so none are printed here — and inventing five plausible testimonials
 * is the exact thing that makes a small business site feel fake to the people
 * who would recognise the names.
 *
 * So this section has two honest states:
 *   • Reviews loaded  → the wall, plus the aggregate if RABS confirmed it.
 *   • Nothing yet     → a short, plain panel pointing at the live social pages
 *                       where the real reviews already are.
 */
export function ReviewSection() {
  const hasReviews = reviews.length > 0;

  return (
    <Section tone="ivory" aria-labelledby="reviews-title">
      <Container wide>
        <SectionHeading
          id="reviews-title"
          eyebrow="What customers say"
          title={["Don't take", "our word for it."]}
          lead={
            hasReviews
              ? undefined
              : "Our reviews live on Google and Facebook, where you can see who left them and when."
          }
          action={hasReviews ? { label: "Read all reviews", href: "/reviews" } : undefined}
        />

        {hasReviews ? (
          <>
            {reviewAggregate.publish && (
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Stars rating={Math.round(reviewAggregate.ratingValue)} />
                <p className="text-sm text-muted">
                  <span className="font-bold text-ink">{reviewAggregate.ratingValue}</span> average
                  from {reviewAggregate.reviewCount} reviews
                </p>
              </div>
            )}

            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {reviews.slice(0, 3).map((review, i) => (
                <Reveal key={review.id} delay={i * 0.07}>
                  <ReviewCard review={review} />
                </Reveal>
              ))}
            </div>
          </>
        ) : (
          <Reveal className="mt-10">
            <div className="flex flex-col gap-6 border border-stone bg-white p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
              <p className="max-w-lg text-sm leading-relaxed text-muted">
                We are collecting our customer reviews together here. In the meantime they are all
                on our Google and Facebook pages, in the customers&rsquo; own words.
              </p>
              <div className="flex shrink-0 flex-wrap gap-3">
                <a
                  href={social.facebook.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center border border-ink/20 px-5 type-eyebrow text-[10px] text-ink transition-colors hover:border-burgundy hover:text-burgundy"
                >
                  Reviews on Facebook
                </a>
                <Link
                  href="/reviews"
                  className="inline-flex min-h-11 items-center border border-ink/20 px-5 type-eyebrow text-[10px] text-ink transition-colors hover:border-burgundy hover:text-burgundy"
                >
                  About our reviews
                </Link>
              </div>
            </div>
          </Reveal>
        )}
      </Container>
    </Section>
  );
}
