import type { Review } from "@/content/reviews";
import { formatDate } from "@/lib/utils";

export function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${n <= rating ? "text-gold" : "text-stone"}`}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M10 1.5 12.4 7l6 .5-4.6 4 1.4 5.9L10 14.3 4.8 17.4 6.2 11.5 1.6 7.5l6-.5z" />
        </svg>
      ))}
    </span>
  );
}

/**
 * A review is reproduced verbatim, with the reviewer's name, the date and a
 * link back to the original wherever one exists. No truncation, no tidying of
 * wording — an edited testimonial is not a testimonial.
 */
export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full flex-col border border-stone bg-white p-6 sm:p-7">
      <Stars rating={review.rating} />

      <blockquote className="mt-5 flex-1">
        <p className="text-[15px] leading-relaxed text-body">{review.text}</p>
      </blockquote>

      <figcaption className="mt-6 border-t border-stone pt-4 text-xs text-muted">
        <span className="font-semibold text-ink">{review.reviewer}</span>
        <span className="mx-1.5">·</span>
        {review.source}
        <span className="mx-1.5">·</span>
        {formatDate(review.date)}
        {review.verifiedUrl && (
          <>
            <span className="mx-1.5">·</span>
            <a
              href={review.verifiedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-burgundy"
            >
              See original
            </a>
          </>
        )}
      </figcaption>
    </figure>
  );
}
