import { allCategories } from "@/content/categories";
import { articles } from "@/content/articles";
import { offers } from "@/content/offers";
import { projects } from "@/content/projects";

/**
 * Site search index.
 *
 * Built from the same typed content the pages render, so it can never drift
 * out of sync. Small enough (tens of entries) to ship in the client bundle and
 * match synchronously — no search service, no network round trip, no empty
 * state while results load.
 *
 * The matcher is intentionally forgiving rather than clever: it scores on
 * whole-phrase hits, then per-word hits across the title, keywords and body.
 * That is enough for "grey carpet", "corner sofa" or "lvt" to land correctly,
 * which is the realistic extent of what anyone types into a flooring site.
 */

export type SearchType = "Flooring" | "Furniture" | "Offer" | "Project" | "Guide" | "Page";

export interface SearchItem {
  title: string;
  href: string;
  type: SearchType;
  description: string;
  /** Extra terms people actually search for that are not in the title. */
  keywords: string[];
}

const staticPages: SearchItem[] = [
  {
    title: "Get a free quote",
    href: "/get-a-quote",
    type: "Page",
    description: "Tell us about your rooms and we will come back to you.",
    keywords: ["quote", "price", "estimate", "measure", "cost"],
  },
  {
    title: "Visit the showroom",
    href: "/showroom",
    type: "Page",
    description: "Where we are, when we are open and what you will find.",
    keywords: ["showroom", "shop", "store", "address", "directions", "opening hours", "burslem", "waterloo road"],
  },
  {
    title: "Professional fitting",
    href: "/fitting",
    type: "Page",
    description: "How fitting works, from measure to finished floor.",
    keywords: ["fitting", "fitters", "installation", "supply and fit", "supply only"],
  },
  {
    title: "Our work",
    href: "/our-work",
    type: "Page",
    description: "Real rooms we have fitted.",
    keywords: ["projects", "gallery", "case studies", "before and after"],
  },
  {
    title: "Contact us",
    href: "/contact",
    type: "Page",
    description: "Phone, WhatsApp and where to find us.",
    keywords: ["contact", "phone", "call", "email", "whatsapp"],
  },
  {
    title: "Areas we cover",
    href: "/areas-we-cover",
    type: "Page",
    description: "Where we fit across Stoke-on-Trent and Staffordshire.",
    keywords: ["areas", "coverage", "hanley", "burslem", "tunstall", "newcastle under lyme"],
  },
];

export const searchIndex: SearchItem[] = [
  ...allCategories.map<SearchItem>((c) => ({
    title: c.name,
    href: c.group === "blinds" ? "/blinds" : `/${c.group}/${c.slug}`,
    type: c.group === "furniture" ? "Furniture" : c.group === "blinds" ? "Furniture" : "Flooring",
    description: c.strapline,
    keywords: [
      ...(c.filters?.flatMap((f) => f.options.map((o) => o.toLowerCase())) ?? []),
      ...c.rooms.map((r) => r.room.toLowerCase()),
    ],
  })),
  ...offers.map<SearchItem>((o) => ({
    title: o.title,
    href: `/offers#${o.slug}`,
    type: "Offer",
    description: o.summary,
    keywords: ["offer", "deal", "sale", "promotion", o.category],
  })),
  ...projects.map<SearchItem>((p) => ({
    title: p.title,
    href: `/our-work/${p.slug}`,
    type: "Project",
    description: p.summary,
    keywords: [p.category.toLowerCase(), ...p.rooms.map((r) => r.toLowerCase())],
  })),
  ...articles.map<SearchItem>((a) => ({
    title: a.title,
    href: `/inspiration/${a.slug}`,
    type: "Guide",
    description: a.excerpt,
    keywords: ["guide", "advice", "how to", a.category.toLowerCase()],
  })),
  ...staticPages,
];

function haystack(item: SearchItem): string {
  return `${item.title} ${item.description} ${item.keywords.join(" ")}`.toLowerCase();
}

export function search(query: string, limit = 8): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];

  const words = q.split(/\s+/).filter(Boolean);

  const scored = searchIndex
    .map((item) => {
      const hay = haystack(item);
      const title = item.title.toLowerCase();
      let score = 0;

      if (title === q) score += 100;
      if (title.startsWith(q)) score += 45;
      if (title.includes(q)) score += 25;
      if (hay.includes(q)) score += 12;

      for (const w of words) {
        if (title.includes(w)) score += 8;
        else if (hay.includes(w)) score += 3;
      }

      return { item, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map((r) => r.item);
}

/** Results grouped by type, in a stable display order. */
const typeOrder: SearchType[] = ["Flooring", "Furniture", "Offer", "Project", "Guide", "Page"];

export function groupResults(results: SearchItem[]): { type: SearchType; items: SearchItem[] }[] {
  return typeOrder
    .map((type) => ({ type, items: results.filter((r) => r.type === type) }))
    .filter((g) => g.items.length > 0);
}
