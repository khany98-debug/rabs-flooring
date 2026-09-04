import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, Container } from "@/components/ui/Layout";
import { ArticleCard } from "@/components/ui/Cards";
import { Reveal } from "@/components/ui/Reveal";
import { articles, articleCategories } from "@/content/articles";
import { buildMetadata } from "@/lib/seo";
import { jsonLd, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Flooring & Furniture Guides | RABS Flooring",
  description:
    "Practical advice on choosing flooring and furniture — carpet vs LVT, the best floor for stairs, measuring up and choosing a sofa that fits.",
  path: "/inspiration",
});

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Inspiration", href: "/inspiration" },
];

/**
 * Guides hub.
 *
 * Six articles, each answering a question customers actually ask in the
 * showroom. Deliberately not thirty thin posts targeting keyword variations —
 * "best carpet Stoke", "best carpet Hanley", "best carpet Burslem" — which is
 * the pattern search engines have spent years demoting.
 */
export default function InspirationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(crumbs))} />

      <PageHero
        eyebrow="Inspiration & guides"
        title={["Know before", "you buy."]}
        lead="The advice we end up giving most days in the showroom, written down."
        image="flooring/hero"
        imageHint="Flooring or interior editorial shot"
        crumbs={crumbs}
      />

      {articleCategories.map((category) => {
        const items = articles.filter((a) => a.category === category);
        if (items.length === 0) return null;

        return (
          <Section
            key={category}
            tone={category === "Flooring advice" ? "parchment" : "ivory"}
            aria-labelledby={`cat-${category.replace(/\s+/g, "-")}`}
          >
            <Container wide>
              <div className="mb-10 flex items-center gap-3">
                <span className="rule-gold h-px w-8" aria-hidden="true" />
                <h2
                  id={`cat-${category.replace(/\s+/g, "-")}`}
                  className="type-eyebrow text-burgundy"
                >
                  {category}
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {items.map((article, i) => (
                  <Reveal key={article.slug} delay={Math.min(i, 3) * 0.06}>
                    <ArticleCard article={article} />
                  </Reveal>
                ))}
              </div>
            </Container>
          </Section>
        );
      })}
    </>
  );
}
