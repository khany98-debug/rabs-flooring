/**
 * NAVIGATION — maps to a `navigation` document type in the CMS.
 *
 * The two mega menus are deliberately shallow: a customer landing from
 * Instagram is two taps from any category and one tap from a quote.
 */

export interface NavLink {
  label: string;
  href: string;
  /** Small note under the label in the mega menu. */
  hint?: string;
}

export interface MegaColumn {
  title: string;
  links: NavLink[];
}

export interface NavItem {
  label: string;
  href: string;
  /** Present = renders a mega menu. */
  mega?: {
    columns: MegaColumn[];
    /** The promoted panel on the right of the menu. */
    feature: {
      eyebrow: string;
      title: string;
      body: string;
      href: string;
      cta: string;
      image: string;
    };
  };
  /** Renders in the brand red. Used for Offers. */
  accent?: boolean;
}

export const mainNav: NavItem[] = [
  {
    label: "Flooring",
    href: "/flooring",
    mega: {
      columns: [
        {
          title: "Shop by type",
          links: [
            { label: "Carpets", href: "/flooring/carpets", hint: "Soft, warm, quiet" },
            { label: "LVT", href: "/flooring/lvt", hint: "Built for family life" },
            { label: "Laminate", href: "/flooring/laminate", hint: "Smart value" },
            { label: "Vinyl", href: "/flooring/vinyl", hint: "Practical, waterproof" },
          ],
        },
        {
          title: "Help me choose",
          links: [
            { label: "All flooring", href: "/flooring" },
            { label: "Find my floor", href: "/flooring#find-my-floor" },
            { label: "Professional fitting", href: "/fitting" },
            { label: "Flooring guides", href: "/inspiration" },
          ],
        },
      ],
      feature: {
        eyebrow: "This week at RABS",
        title: "Current flooring deals",
        body: "Offers change regularly. See what is on right now before you visit.",
        href: "/offers",
        cta: "View offers",
        image: "offers/lvt",
      },
    },
  },
  {
    label: "Furniture",
    href: "/furniture",
    mega: {
      columns: [
        {
          title: "Shop by room",
          links: [
            { label: "Sofas", href: "/furniture/sofas", hint: "Corners and suites" },
            { label: "Beds", href: "/furniture/beds", hint: "Frames and mattresses" },
            { label: "Dining", href: "/furniture/dining", hint: "Tables and chairs" },
            { label: "Living room", href: "/furniture/living-room", hint: "Units and tables" },
          ],
        },
        {
          title: "More",
          links: [
            { label: "All furniture", href: "/furniture" },
            { label: "Furniture offers", href: "/offers" },
            { label: "Furniture guides", href: "/inspiration" },
            { label: "Visit the showroom", href: "/showroom" },
          ],
        },
      ],
      feature: {
        eyebrow: "Worth the trip",
        title: "Sit on it first",
        body: "Comfort is the one thing a photograph cannot tell you. Come and try it.",
        href: "/showroom",
        cta: "Plan your visit",
        image: "furniture/sofas",
      },
    },
  },
  { label: "Blinds", href: "/blinds" },
  { label: "Offers", href: "/offers", accent: true },
  { label: "Our Work", href: "/our-work" },
  { label: "Showroom", href: "/showroom" },
  { label: "About", href: "/about" },
];

export const footerNav: MegaColumn[] = [
  {
    title: "Flooring",
    links: [
      { label: "Carpets", href: "/flooring/carpets" },
      { label: "LVT", href: "/flooring/lvt" },
      { label: "Laminate", href: "/flooring/laminate" },
      { label: "Vinyl", href: "/flooring/vinyl" },
      { label: "Professional fitting", href: "/fitting" },
    ],
  },
  {
    title: "Furniture",
    links: [
      { label: "Sofas", href: "/furniture/sofas" },
      { label: "Beds", href: "/furniture/beds" },
      { label: "Dining", href: "/furniture/dining" },
      { label: "Living room", href: "/furniture/living-room" },
      { label: "Blinds", href: "/blinds" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About RABS", href: "/about" },
      { label: "Our work", href: "/our-work" },
      { label: "Reviews", href: "/reviews" },
      { label: "Inspiration & guides", href: "/inspiration" },
      { label: "Areas we cover", href: "/areas-we-cover" },
    ],
  },
  {
    title: "Visit & contact",
    links: [
      { label: "The showroom", href: "/showroom" },
      { label: "Current offers", href: "/offers" },
      { label: "Get a free quote", href: "/get-a-quote" },
      { label: "Contact us", href: "/contact" },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Cookies", href: "/cookies" },
  { label: "Terms", href: "/terms" },
  { label: "Delivery", href: "/delivery" },
  { label: "Returns", href: "/returns" },
  { label: "Warranty", href: "/warranty" },
];
