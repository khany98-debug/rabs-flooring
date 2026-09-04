/**
 * OFFERS — maps to an `offer` document type in the CMS.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * TWO HARD RULES, ENFORCED IN CODE
 *
 * 1. Expired campaigns disappear on their own. `getActiveOffers()` filters on
 *    `active` plus the startsAt/endsAt window, so nobody has to remember to
 *    take a finished promotion down. This is the single most common way a
 *    local business site goes stale.
 *
 * 2. No invented pricing. Every price field below is `null`. RABS runs real,
 *    changing promotions on social; none of those numbers have been verified,
 *    so the cards render an "Ask in store" treatment instead of a made-up
 *    figure. The moment RABS supplies real prices, fill in `priceNow` /
 *    `priceWas` and the card switches to the full price lockup automatically.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type OfferCategory = "flooring" | "furniture" | "whole-home" | "blinds";

export interface Offer {
  id: string;
  slug: string;
  title: string;
  /** One line under the title. Plain and specific. */
  summary: string;
  category: OfferCategory;
  /** Asset slot — /public/media/offers/<image>.jpg */
  image: string;
  /** Kicker printed on the diagonal promotional flash. */
  flash?: string;
  /** Both null until RABS confirms real figures. See rule 2 above. */
  priceWas: number | null;
  priceNow: number | null;
  /** e.g. "per room", "fitted", "from". Renders next to the price. */
  priceUnit?: string;
  /** The small print. Never leave this empty on a real promotion. */
  conditions: string[];
  /** ISO dates. `null` on endsAt means open-ended until switched off. */
  startsAt: string;
  endsAt: string | null;
  active: boolean;
  ctaLabel: string;
  ctaHref: string;
  /** Bigger card in the grid. Keep to one. */
  featured?: boolean;
}

/**
 * Campaign slots reflecting the kinds of promotion RABS actually runs.
 * Titles and mechanics are structural placeholders for the pitch — confirm
 * each one, add the real figures and the real small print before launch.
 */
export const offers: Offer[] = [
  {
    id: "offer-full-house",
    slug: "full-house-package",
    title: "Full house package",
    summary:
      "Carpet or LVT throughout, measured and fitted by our own team, quoted as one job rather than room by room.",
    category: "whole-home",
    image: "full-house",
    flash: "Our biggest package",
    priceWas: null,
    priceNow: null,
    priceUnit: "from",
    conditions: [
      "Price depends on the property size, the products chosen and the amount of subfloor preparation needed.",
      "Confirmed after a measure — we do not quote a whole house without seeing it.",
    ],
    startsAt: "2026-01-01",
    endsAt: null,
    active: true,
    ctaLabel: "Get a quote",
    ctaHref: "/get-a-quote?interest=whole-home",
    featured: true,
  },
  {
    id: "offer-sofas",
    slug: "sofa-event",
    title: "Sofas & corner suites",
    summary:
      "Current showroom stock, including corner units and three-piece sets. Come and sit on them.",
    category: "furniture",
    image: "sofas",
    flash: "In the showroom now",
    priceWas: null,
    priceNow: null,
    priceUnit: "from",
    conditions: ["Showroom stock changes regularly — call to check availability before travelling."],
    startsAt: "2026-01-01",
    endsAt: null,
    active: true,
    ctaLabel: "Enquire about sofas",
    ctaHref: "/get-a-quote?interest=furniture&category=sofas",
  },
  {
    id: "offer-dining",
    slug: "dining-sets",
    title: "Dining sets",
    summary: "Table and chair sets in a range of sizes and finishes, ready to view.",
    category: "furniture",
    image: "dining",
    priceWas: null,
    priceNow: null,
    priceUnit: "from",
    conditions: ["Availability varies. Ask the team what is in stock this week."],
    startsAt: "2026-01-01",
    endsAt: null,
    active: true,
    ctaLabel: "Enquire about dining",
    ctaHref: "/get-a-quote?interest=furniture&category=dining",
  },
  {
    id: "offer-lvt",
    slug: "lvt-supply-and-fit",
    title: "LVT supply & fit",
    summary:
      "Wood and stone-effect LVT, supplied and fitted by our own team. Ideal for kitchens and hallways.",
    category: "flooring",
    image: "lvt",
    priceWas: null,
    priceNow: null,
    priceUnit: "per m² from",
    conditions: [
      "Subfloor preparation is quoted separately where it is needed.",
      "Final price confirmed after measuring.",
    ],
    startsAt: "2026-01-01",
    endsAt: null,
    active: true,
    ctaLabel: "Get an LVT quote",
    ctaHref: "/get-a-quote?interest=flooring&type=lvt",
  },
];

/** The offer grid never shows anything outside its live window. */
export function getActiveOffers(now: Date = new Date()): Offer[] {
  const t = now.getTime();
  return offers.filter((o) => {
    if (!o.active) return false;
    if (new Date(o.startsAt).getTime() > t) return false;
    if (o.endsAt && new Date(o.endsAt).getTime() < t) return false;
    return true;
  });
}

export function getOffer(slug: string): Offer | undefined {
  return offers.find((o) => o.slug === slug);
}

/** True only when RABS has supplied a real, current price for this offer. */
export function hasRealPrice(offer: Offer): boolean {
  return typeof offer.priceNow === "number" && offer.priceNow > 0;
}
