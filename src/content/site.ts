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
 * ADDRESS — the single most important thing to confirm before go-live.
 *
 * Recent RABS brand material shows 194 Waterloo Road (Burslem), ST6 3HF.
 * Public directories still carry Portland House, 45 Church Street, ST4 1DQ,
 * and Companies House lists 188 Lightwood Road, ST3 4LA as the registered
 * office. Three different places. Nothing ships as the trading address until
 * RABS confirms which is correct.
 */
export const showroom = {
  name: "RABS Flooring Showroom",
  line1: fact("194 Waterloo Road", "needs-confirmation", "RABS brand material (2026)"),
  locality: fact("Burslem", "verified", "Royal Mail / commercial listings for ST6 3HF"),
  city: "Stoke-on-Trent",
  county: "Staffordshire",
  postcode: fact("ST6 3HF", "needs-confirmation", "RABS brand material (2026)"),
  country: "GB",
  /** Approximate — replace with the exact pin from Google Business Profile. */
  geo: fact(
    { lat: 53.0447, lng: -2.1897 },
    "needs-confirmation",
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

/** Kept on record so nobody re-publishes a stale address by accident. */
export const legacyAddresses = [
  {
    label: "Previous / directory listing",
    value: "Portland House, 45 Church Street, Stoke-on-Trent, ST4 1DQ",
    source: "Yell, FindOpen",
    question: "Is Church Street still trading, or fully closed?",
  },
  {
    label: "Registered office (Companies House)",
    value: "188 Lightwood Road, Stoke-on-Trent, ST3 4LA",
    source: "Companies House 11992568",
    question: "Registered office only — confirm it is not customer-facing.",
  },
  {
    label: "Directory listing",
    value: "Unit 18 Castlefield Street, Stoke-on-Trent, ST4 7AQ",
    source: "192.com",
    question: "Warehouse / trade counter, or a stale citation to remove?",
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
 * Brand material implies seven days, 9:00–18:00. Directories say Mon–Sat
 * 10:00–18:00, Sunday closed. Until RABS confirms, `hoursStatus` stays
 * "conflicting" and the UI labels these hours as indicative rather than fact.
 */
export const openingHours: OpeningHour[] = [
  { day: "Monday", opens: "09:00", closes: "18:00" },
  { day: "Tuesday", opens: "09:00", closes: "18:00" },
  { day: "Wednesday", opens: "09:00", closes: "18:00" },
  { day: "Thursday", opens: "09:00", closes: "18:00" },
  { day: "Friday", opens: "09:00", closes: "18:00" },
  { day: "Saturday", opens: "09:00", closes: "18:00" },
  { day: "Sunday", opens: "09:00", closes: "18:00" },
];

export const hoursStatus: FactStatus = "conflicting";
export const hoursSummary = "Open 7 days · 9:00am – 6:00pm";

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
 * A 4.7 / 30 aggregate appears on a review-syndication site. That is not a
 * primary source, so `publish` is false: no star rating, no review count and
 * no AggregateRating schema is emitted until RABS confirms the live Google
 * Business Profile numbers. Flip `publish` once verified.
 */
export const reviewAggregate = {
  publish: false,
  ratingValue: 4.7,
  reviewCount: 30,
  source: "Birdeye syndication of Google reviews — unverified",
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
