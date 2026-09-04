import type { Metadata } from "next";
import { brand, siteUrl, isIndexable } from "@/content/site";

/**
 * Metadata helper.
 *
 * While NEXT_PUBLIC_INDEXABLE is anything other than "true" every page is
 * marked noindex/nofollow. This build lives on a Vercel preview domain and
 * must never compete with rabsflooring.co.uk in search results. The same flag
 * gates robots.ts and the X-Robots-Tag header in next.config.ts — three layers
 * so it cannot be defeated by one missed setting.
 */
export function buildMetadata({
  title,
  description,
  path,
  image = "/og/default.png",
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
}): Metadata {
  const url = `${siteUrl}${path}`;

  return {
    /**
     * `absolute` bypasses the layout's "%s | RABS Flooring" template. Page
     * titles here are written whole, several already ending in the brand name,
     * and letting the template append it again produces
     * "… | RABS Flooring | RABS Flooring" in the tab and the SERP.
     */
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: isIndexable
      ? { index: true, follow: true }
      : { index: false, follow: false, nocache: true },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: brand.name,
      locale: "en_GB",
      images: [{ url: `${siteUrl}${image}`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}${image}`],
    },
  };
}

/** Page title suffix. Kept short so titles do not truncate in the SERP. */
export const titleSuffix = "RABS Flooring | Stoke-on-Trent";
