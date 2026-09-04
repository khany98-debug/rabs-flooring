import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container, Breadcrumbs, Section, SectionHeading } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { ArticleCard } from "@/components/ui/Cards";
import { articles, getArticle } from "@/content/articles";
import { formatDate } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";
import { jsonLd, breadcrumbSchema, articleSchema } from "@/lib/schema";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/inspiration/${article.slug}`,
    type: "article",
  });
}

/**
 * Article template.
 *
 * A single measured column at a comfortable reading width, with the CTA at the
 * end rather than interrupting the middle. Somebody reading "best flooring for
 * stairs" is doing research; shoving a quote form into paragraph three is how
 * you lose them before they have decided they need you.
 */
export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Inspiration", href: "/inspiration" },
    { name: article.title, href: `/inspiration/${article.slug}` },
  ];

  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([breadcrumbSchema(crumbs), articleSchema(article)])}
      />

      <article>
        <div className="bg-ink pb-14 pt-8 text-white sm:pb-16">
          <Container>
            <Breadcrumbs crumbs={crumbs} onDark />

            <div className="mt-8 max-w-3xl">
              <p className="type-eyebrow text-gold">{article.category}</p>
              <h1 className="type-display mt-4 text-[2.25rem] leading-[0.95] sm:text-[3rem] lg:text-[3.5rem]">
                {article.title}
              </h1>
              <p className="mt-5 text-base leading-relaxed text-white/70 sm:text-lg">
                {article.excerpt}
              </p>
              <p className="mt-6 text-xs text-white/45">
                {formatDate(article.published)}
                {article.updated && ` · Updated ${formatDate(article.updated)}`}
                {" · "}
                {article.readMinutes} min read
              </p>
            </div>
          </Container>
        </div>

        <Container>
          <div className="relative -mt-8 aspect-[16/9] w-full overflow-hidden bg-charcoal sm:aspect-[21/9]">
            <Media
              slot={article.image}
              alt=""
              priority
              sizes="(max-width: 1360px) 100vw, 1360px"
              hint="Article header image"
            />
          </div>
        </Container>

        <div className="bg-parchment py-14 sm:py-20">
          <Container>
            <div className="mx-auto max-w-[46rem]">
              <p className="text-lg leading-relaxed text-ink sm:text-xl">{article.intro}</p>

              <div className="mt-12 space-y-11">
                {article.sections.map((section) => (
                  <section key={section.heading}>
                    <h2 className="type-editorial text-2xl text-ink sm:text-3xl">
                      {section.heading}
                    </h2>
                    <div className="mt-4 space-y-4">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph.slice(0, 40)} className="text-base leading-relaxed text-body">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {section.bullets && (
                      <ul className="mt-6 space-y-2.5 border-l-2 border-champagne pl-5">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="text-sm leading-relaxed text-muted">
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>

              {/* CTA at the end, where a reader has actually finished */}
              <div className="mt-14 border border-stone bg-white p-7 sm:p-9">
                <span className="rule-gold mb-5 block h-px w-10" aria-hidden="true" />
                <h2 className="type-display text-2xl text-ink sm:text-3xl">
                  Still weighing it up?
                </h2>
                <p className="mt-3 text-base leading-relaxed text-muted">
                  Come in and see the options side by side, or send us your rooms and we will come
                  back to you.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Button href={article.cta.href} variant="red" size="md" arrow>
                    {article.cta.label}
                  </Button>
                  <Link
                    href="/showroom"
                    className="inline-flex min-h-11 items-center justify-center border border-ink/20 px-6 py-3.5 type-eyebrow text-xs text-ink transition-colors hover:border-burgundy hover:text-burgundy"
                  >
                    Visit the showroom
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </article>

      {related.length > 0 && (
        <Section tone="ivory" aria-labelledby="related-articles">
          <Container wide>
            <SectionHeading
              id="related-articles"
              eyebrow="Keep reading"
              title={["More", "guides."]}
              size="md"
              action={{ label: "All guides", href: "/inspiration" }}
            />
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
