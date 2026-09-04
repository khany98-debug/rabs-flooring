/**
 * STRUCTURED DATA
 *
 * Rules applied throughout this file:
 *   • No AggregateRating until RABS confirms the live Google numbers
 *     (reviewAggregate.publish is false — see site.ts).
 *   • No Offer schema with a price, because no price has been confirmed.
 *     Emitting a fabricated price is a manual-action risk, not just bad taste.
 *   • openingHoursSpecification is only emitted once the hours are confirmed,
 *     because publishing wrong hours is worse than publishing none.
 */

import {
  brand,
  phone,
  email,
  showroom,
  openingHours,
  hoursStatus,
  reviewAggregate,
  siteUrl,
  social,
} from "@/content/site";

type Json = Record<string, unknown>;

export function localBusinessSchema(): Json {
  const schema: Json = {
    "@context": "https://schema.org",
    "@type": "HomeGoodsStore",
    "@id": `${siteUrl}/#business`,
    name: brand.name,
    legalName: brand.legalName,
    description: brand.positioning,
    url: siteUrl,
    telephone: phone.e164,
    slogan: brand.tagline,
    image: `${siteUrl}/og/default.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: showroom.line1.value,
      addressLocality: showroom.city,
      addressRegion: showroom.county,
      postalCode: showroom.postcode.value,
      addressCountry: showroom.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: showroom.geo.value.lat,
      longitude: showroom.geo.value.lng,
    },
    sameAs: [social.instagram.href, social.facebook.href].filter(Boolean),
    currenciesAccepted: "GBP",
  };

  // Only publish an email once we know the inbox is monitored.
  if (email.status === "verified") schema.email = email.value;

  // Only publish hours once the Waterloo Road / Church Street conflict is settled.
  if (hoursStatus === "verified") {
    schema.openingHoursSpecification = openingHours
      .filter((h) => h.opens && h.closes)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${h.day}`,
        opens: h.opens,
        closes: h.closes,
      }));
  }

  // Only publish a rating when it comes from a confirmed primary source.
  if (reviewAggregate.publish) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: reviewAggregate.ratingValue,
      reviewCount: reviewAggregate.reviewCount,
    };
  }

  return schema;
}

export function websiteSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: brand.name,
    publisher: { "@id": `${siteUrl}/#business` },
    inLanguage: "en-GB",
  };
}

export function breadcrumbSchema(crumbs: { name: string; href: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${siteUrl}${c.href}`,
    })),
  };
}

export function articleSchema(a: {
  title: string;
  excerpt: string;
  slug: string;
  published: string;
  updated: string | null;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.excerpt,
    datePublished: a.published,
    dateModified: a.updated ?? a.published,
    mainEntityOfPage: `${siteUrl}/inspiration/${a.slug}`,
    author: { "@type": "Organization", name: brand.name },
    publisher: { "@id": `${siteUrl}/#business` },
  };
}

/**
 * FAQPage is only emitted on category pages, where the questions genuinely
 * are the page's main content. It is deliberately not sprayed across every
 * template — search engines have narrowed FAQ rich-result eligibility and
 * over-application reads as manipulation.
 */
export function faqSchema(faqs: { q: string; a: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Renders a schema object into a JSON-LD script tag. */
export function jsonLd(schema: Json | Json[]) {
  return {
    __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
  };
}
