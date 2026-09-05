/**
 * SITE SETTINGS  —  maps 1:1 to a `siteSettings` singleton + `store` document
 * in Sanity/Payload when the CMS is switched on. See docs/CMS.md.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * SOURCING RULE
 * Every contested field carries a `status`. Anything not `verified` is either
 * hidden from the public site or rendered as a neutral statement, never as a
 * hard claim. The open-questions list is in docs/CLIENT-CONFIRMATION.md.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type FactStatus = "verified" | "needs-confirmation" | "conflicting";

export interface Fact<T> {
  value: T;
  status: FactStatus;
  source: string;
  note?: string;
}

export function fact<T>(
  value: T,
  status: FactStatus,
  source: string,
  note?: string,
): Fact<T> {
  return { value, status, source, note };
}

/* -------------------------------------------------------------------------- */
/* Identity                                                                   */
/* -------------------------------------------------------------------------- */

export const brand = {
  name: "RABS Flooring",
  legalName: "RAB’S CARPETS AND FLOORING LIMITED",
  companyNumber: "11992568",
  incorporated: "2019-05-13",
  tagline: "Turning Houses Into Homes",
  positioning:
    "Stoke-on-Trent’s destination for flooring, furniture and complete home transformations.",
  supportingLine:
    "Flooring, furniture and professional fitting — all under one roof.",
} as const;

/* -------------------------------------------------------------------------- */
/* Contact + location                                                         */
/* -------------------------------------------------------------------------- */

export const phone = {
  display: "07774 596596",
  e164: "+447774596596",
  href: "tel:+447774596596",
} as const;

export const whatsapp = {
  /** Same number as the mobile — confirm WhatsApp is actually monitored. */
  href: "https://wa.me/447774596596",
  status: "needs-confirmation" as FactStatus,
};

export const email = fact(
  "info.rabsflooring@gmail.com",
  "needs-confirmation",
  "Public directory listings (Yell / FindOpen)",
  "A branded address (hello@rabsflooring.co.uk) would present better. Confirm the live inbox before launch.",
);

/**
 * ADDRESS — confirmed directly by the client and cross-checked against RABS's
 * live Google Business Profile ("RABS Carpets Furniture Store", 194 Waterloo
 * Rd, Stoke-on-Trent ST6 3HF), which is the primary source for a trading
 * address. Older directory listings (Yell's Church Street entry, 192.com's
 * Castlefield Street entry) and the Companies House registered office
 * (188 Lightwood Road) are stale citations to be corrected, not alternatives —
 * see docs/SEO.md#local-seo-and-citations.
 */
export const showroom = {
  name: "RABS Flooring Showroom",
  line1: fact("194 Waterloo Road", "verified", "Client confirmation + Google Business Profile"),
  locality: fact("Burslem", "verified", "Royal Mail / commercial listings for ST6 3HF"),
  city: "Stoke-on-Trent",
  county: "Staffordshire",
  postcode: fact("ST6 3HF", "verified", "Client confirmation + Google Business Profile"),
  country: "GB",
  /** Approximate street-level coordinates — fine for the schema and the static
   * map link; swap for the exact GBP pin if RABS shares it. */
  geo: fact(
    { lat: 53.0447, lng: -2.1897 },
    "verified",
    "Approximate centroid for Waterloo Road ST6 3HF",
  ),
  mapsQuery: "194+Waterloo+Road,+Burslem,+Stoke-on-Trent+ST6+3HF",
  parking: fact(
    null,
    "needs-confirmation",
    "—",
    "Do not mention parking anywhere on the site until confirmed.",
  ),
} as const;

/**
 * Stale citations still live on public directories under RABS's old or
 * registered-office addresses. These are launch-checklist items for the
 * citation clean-up (docs/SEO.md), not addresses to reconsider — the trading
 * address above is confirmed.
 */
export const legacyAddresses = [
  {
    label: "Stale directory listing",
    value: "Portland House, 45 Church Street, Stoke-on-Trent, ST4 1DQ",
    source: "Yell, FindOpen",
    question: "Update or remove this listing — the showroom is on Waterloo Road.",
  },
  {
    label: "Registered office (Companies House)",
    value: "188 Lightwood Road, Stoke-on-Trent, ST3 4LA",
    source: "Companies House 11992568",
    question: "Registered office only, not customer-facing — no action needed unless it changes.",
  },
  {
    label: "Stale directory listing",
    value: "Unit 18 Castlefield Street, Stoke-on-Trent, ST4 7AQ",
    source: "192.com",
    question: "Update or remove this listing — the showroom is on Waterloo Road.",
  },
] as const;

/* -------------------------------------------------------------------------- */
/* Opening hours                                                              */
/* -------------------------------------------------------------------------- */

export type Weekday =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface OpeningHour {
  day: Weekday;
  opens: string | null;
  closes: string | null;
}

/**
 * Read directly from RABS's live Google Business Profile ("RABS Carpets
 * Furniture Store", 194 Waterloo Rd, ST6 3HF) — a primary source, so
 * `hoursStatus` is "verified" and the caveats and schema below react to that.
 */
export const openingHours: OpeningHour[] = [
  { day: "Monday", opens: "10:00", closes: "20:00" },
  { day: "Tuesday", opens: "10:00", closes: "20:00" },
  { day: "Wednesday", opens: "10:00", closes: "20:00" },
  { day: "Thursday", opens: "10:00", closes: "20:00" },
  { day: "Friday", opens: "10:00", closes: "20:00" },
  { day: "Saturday", opens: "10:00", closes: "20:00" },
  { day: "Sunday", opens: "11:00", closes: "18:00" },
];

export const hoursStatus: FactStatus = "verified";
export const hoursSummary = "Open 7 days · Mon–Sat 10am–8pm, Sun 11am–6pm";

/* -------------------------------------------------------------------------- */
/* Social                                                                      */
/* -------------------------------------------------------------------------- */

export const social = {
  instagram: {
    href: "https://www.instagram.com/rabsflooring/",
    handle: "@rabsflooring",
    status: "verified" as FactStatus,
  },
  facebook: {
    href: "https://www.facebook.com/p/RABS-Flooring-100043967033182/",
    handle: "RABS Flooring",
    status: "verified" as FactStatus,
  },
  tiktok: {
    href: null,
    handle: null,
    status: "needs-confirmation" as FactStatus,
  },
} as const;

/* -------------------------------------------------------------------------- */
/* Reviews aggregate                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Read directly from RABS's live Google Business Profile ("RABS Carpets
 * Furniture Store") — a primary source, not a syndicator, so the rating and
 * count are safe to publish. This number will drift as new reviews come in;
 * re-check it periodically rather than treating it as fixed.
 */
export const reviewAggregate = {
  publish: true,
  ratingValue: 4.9,
  reviewCount: 34,
  source: "Google Business Profile (checked directly)",
} as const;

/* -------------------------------------------------------------------------- */
/* Services actually evidenced                                                */
/* -------------------------------------------------------------------------- */

/**
 * RABS’s own social copy: "we supply and fit high quality carpet, vinyl,
 * laminate and LVT". Those four categories, and both supply-only and
 * supply-and-fit, are safe to state. Furniture and blinds appear throughout
 * recent brand material and showroom imagery. Everything null is unconfirmed
 * and must not be claimed anywhere in the UI.
 */
export const evidencedServices = {
  flooringTypes: ["carpet", "vinyl", "laminate", "lvt"],
  supplyOnly: true,
  supplyAndFit: true,
  furniture: true,
  blinds: true,
  commercial: null,
  homeMeasureFree: null,
  furnitureDeliveryFree: null,
  finance: null,
  deliveryRadius: null,
  warranty: null,
  brandsStocked: null,
} as const;

/* -------------------------------------------------------------------------- */
/* Runtime config                                                             */
/* -------------------------------------------------------------------------- */

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://rabs-flooring.vercel.app";

export const isIndexable = process.env.NEXT_PUBLIC_INDEXABLE === "true";

export const fullAddress = [
  showroom.line1.value,
  showroom.locality.value,
  showroom.city,
  showroom.postcode.value,
].join(", ");

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${showroom.mapsQuery}`;
export const mapUrl = `https://www.google.com/maps/search/?api=1&query=${showroom.mapsQuery}`;
