/**
 * SERVICE AREAS
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * DELIBERATELY ONE HUB PAGE, NOT FIFTY DOORWAY PAGES.
 *
 * The standard local-SEO play is to spin up "Carpets in <town>" for every
 * settlement within thirty miles. Google has been demoting that pattern for
 * years, and it makes a good business look spammy.
 *
 * The rule applied here: a town only gets its own page once RABS confirms they
 * genuinely serve it AND there is unique content to justify it — real projects
 * there, real reviews from there, or something specific worth saying. Until
 * then, every area lives on one honest hub page.
 *
 * `hasOwnPage` is the switch. All false at launch.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface ServiceArea {
  name: string;
  /** Rough guide only — confirm the real coverage with RABS. */
  note: string;
  hasOwnPage: boolean;
}

/**
 * Towns and areas of Stoke-on-Trent and the immediate surroundings. This list
 * is a starting point for the client conversation, NOT a published promise:
 * the areas-we-cover page states plainly that coverage should be confirmed by
 * phone until RABS gives us the real radius.
 */
export const serviceAreas: ServiceArea[] = [
  { name: "Burslem", note: "Where the showroom is", hasOwnPage: false },
  { name: "Hanley", note: "City centre", hasOwnPage: false },
  { name: "Tunstall", note: "North of the showroom", hasOwnPage: false },
  { name: "Longport", note: "", hasOwnPage: false },
  { name: "Smallthorne", note: "", hasOwnPage: false },
  { name: "Stoke", note: "", hasOwnPage: false },
  { name: "Fenton", note: "", hasOwnPage: false },
  { name: "Longton", note: "", hasOwnPage: false },
  { name: "Newcastle-under-Lyme", note: "", hasOwnPage: false },
  { name: "Kidsgrove", note: "", hasOwnPage: false },
  { name: "Biddulph", note: "", hasOwnPage: false },
  { name: "Stone", note: "", hasOwnPage: false },
  { name: "Cheadle", note: "", hasOwnPage: false },
  { name: "Leek", note: "", hasOwnPage: false },
];

/**
 * Widened deliberately: this is a switch RABS will flip once the real coverage
 * is confirmed, so it must not be narrowed to its current value.
 */
export const coverageStatus: "verified" | "needs-confirmation" = "needs-confirmation";
