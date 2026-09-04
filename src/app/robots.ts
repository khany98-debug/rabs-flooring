import type { MetadataRoute } from "next";
import { siteUrl, isIndexable } from "@/content/site";

/**
 * Third and final indexing guard, alongside the X-Robots-Tag header in
 * next.config.ts and the per-page robots metadata in lib/seo.ts.
 *
 * While this build lives on a preview domain it must not compete with
 * rabsflooring.co.uk in search. Set NEXT_PUBLIC_INDEXABLE=true only when the
 * production domain goes live.
 */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
