import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";
import { flooringCategories, furnitureCategories } from "@/content/categories";
import { articles } from "@/content/articles";
import { projects } from "@/content/projects";

/**
 * Built from the same content the pages render, so a new category or article
 * appears in the sitemap automatically. Priorities reflect commercial value:
 * the quote page and the showroom page matter more than the cookie policy.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: [string, number, MetadataRoute.Sitemap[number]["changeFrequency"]][] = [
    ["", 1, "weekly"],
    ["/flooring", 0.9, "weekly"],
    ["/furniture", 0.9, "weekly"],
    ["/blinds", 0.7, "monthly"],
    ["/offers", 0.9, "weekly"],
    ["/showroom", 0.9, "monthly"],
    ["/fitting", 0.8, "monthly"],
    ["/our-work", 0.8, "weekly"],
    ["/get-a-quote", 0.9, "monthly"],
    ["/contact", 0.8, "monthly"],
    ["/about", 0.6, "yearly"],
    ["/reviews", 0.6, "monthly"],
    ["/inspiration", 0.7, "weekly"],
    ["/areas-we-cover", 0.6, "monthly"],
    ["/privacy", 0.2, "yearly"],
    ["/cookies", 0.2, "yearly"],
    ["/terms", 0.2, "yearly"],
    ["/delivery", 0.3, "yearly"],
    ["/returns", 0.3, "yearly"],
    ["/warranty", 0.3, "yearly"],
  ];

  return [
    ...staticRoutes.map(([path, priority, changeFrequency]) => ({
      url: `${siteUrl}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })),
    ...flooringCategories.map((c) => ({
      url: `${siteUrl}/flooring/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...furnitureCategories.map((c) => ({
      url: `${siteUrl}/furniture/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...projects.map((p) => ({
      url: `${siteUrl}/our-work/${p.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
    ...articles.map((a) => ({
      url: `${siteUrl}/inspiration/${a.slug}`,
      lastModified: new Date(a.updated ?? a.published),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
