/**
 * REVIEWS — maps to a `review` document type in the CMS.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * THIS FILE IS INTENTIONALLY EMPTY OF REVIEW TEXT.
 *
 * RABS has real reviews (a 4.7 average across roughly 30 reviews appears on a
 * syndication site). None of that could be verified against a primary source,
 * and the wording of a real customer's review must never be paraphrased,
 * shortened or invented. So:
 *
 *   • `reviews` ships empty,
 *   • no Review or AggregateRating schema is emitted,
 *   • the reviews page renders an honest "collecting these now" state,
 *   • the homepage review section is skipped entirely when there are none.
 *
 * To populate: export the reviews from Google Business Profile, paste each one
 * verbatim with its reviewer name, date and source URL, then flip
 * `reviewAggregate.publish` in site.ts once the live numbers are confirmed.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type ReviewService = "Flooring" | "Carpet" | "Furniture" | "Fitting" | "Service";
export type ReviewSource = "Google" | "Facebook" | "In store";

export interface Review {
  id: string;
  reviewer: string;
  source: ReviewSource;
  rating: 1 | 2 | 3 | 4 | 5;
  /** ISO date the review was left. */
  date: string;
  /** Verbatim. Never edited for length or tone. */
  text: string;
  service: ReviewService;
  /** Link back to the original review so any claim is checkable. */
  verifiedUrl: string | null;
}

export const reviews: Review[] = [];

export const reviewServices: ReviewService[] = [
  "Flooring",
  "Carpet",
  "Furniture",
  "Fitting",
  "Service",
];

export function getReviewsByService(service: ReviewService | "All"): Review[] {
  return service === "All" ? reviews : reviews.filter((r) => r.service === service);
}

export const hasReviews = reviews.length > 0;
