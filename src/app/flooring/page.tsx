import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, Container, SectionHeading } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { ArticleCard } from "@/components/ui/Cards";
import { FlooringFinder } from "@/components/domain/FlooringFinder";
import { flooringCategories } from "@/content/categories";
import { articles } from "@/content/articles";
import { buildMetadata } from "@/lib/seo";
import { jsonLd, breadcrumbSchema } from "@/lib/schema";
import Link from "next/link";

export const metadata: Metadata = buildMetadata({
  title: "Flooring in Stoke-on-Trent | Carpets & LVT | RABS",
  description:
    "Carpets, LVT, laminate and vinyl at the RABS Flooring showroom in Stoke-on-Trent. Supply only or supplied and fitted by our own team. Get a free quote.",
  path: "/flooring",
});

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Flooring", href: "/flooring" },
];

export default function FlooringHubPage() {
  const guides = articles.filter((a) => a.category === "Flooring advice").slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(crumbs))} />

      <PageHero
        eyebrow="Flooring"
        title={["Floors that", "earn their keep."]}
        lead="Carpet, LVT, laminate and vinyl — supplied on their own, or measured, supplied and fitted by our team."
        image="flooring/hero"
        imageHint="Flooring display wall"
        crumbs={crumbs}
        size="lg"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/get-a-quote?interest=flooring" variant="gold" size="lg" arrow>
            Get a free quote
          </Button>
          <Button href="#find-my-floor" variant="outline" size="lg" onDark>
            Help me choose
          </Button>
        </div>
      </PageHero>

      {/* The four categories, given room to breathe */}
      <Section tone="parchment" aria-labelledby="types-title">
        <Container wide>
          <SectionHeading
            id="types-title"
            eyebrow="Four ways to floor a room"
            title={["Pick the material,", "then pick the look."]}
            lead="Each of these solves a different problem. Getting the material right matters far more than getting the exact shade right."
          />

          <div className="mt-12 space-y-4">
            {flooringCategories.map((category, i) => (
              <Reveal key={category.slug} delay={Math.min(i, 3) * 0.06}>
                <Link
                  href={`/flooring/${category.slug}`}
                  className="media-zoom group grid overflow-hidden border border-stone bg-white transition-colors hover:border-champagne md:grid-cols-[minmax(0,22rem)_1fr]"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink md:aspect-auto md:min-h-[15rem]">
                    <Media
                      slot={category.image}
                      alt=""
                      sizes="(max-width: 768px) 100vw, 22rem"
                      hint={`${category.name} display`}
                    />
                  </div>

                  <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                    <span className="type-eyebrow text-burgundy">
                      {String(i + 1).padStart(2, "0")} — {category.name}
                    </span>
                    <h3 className="type-editorial mt-3 text-2xl text-ink sm:text-3xl">
                      {category.strapline}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                      {category.intro}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 type-eyebrow text-[10px] text-burgundy">
                      Explore {category.name.toLowerCase()}
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 20 12"
                        className="h-2.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M0 6h18M13 1l5 5-5 5" strokeLinecap="square" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Finder */}
      <Section tone="ink" id="find-my-floor" aria-labelledby="finder-hub-title">
        <Container wide>
          <SectionHeading
            id="finder-hub-title"
            eyebrow="Find my floor"
            title={["Two questions.", "A sensible answer."]}
            lead="Tell us the room and what matters in it, and we will tell you where we would start."
            onDark
          />
          <Reveal className="mt-12">
            <FlooringFinder />
          </Reveal>
        </Container>
      </Section>

      {/* Fitting */}
      <Section tone="ivory">
        <Container wide>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <Reveal>
              <SectionHeading
                eyebrow="Fitting"
                title={["Supply only,", "or supplied and fitted."]}
                size="md"
              />
              <p className="mt-6 text-base leading-relaxed text-muted">
                We supply and fit carpet, vinyl, laminate and LVT. If you would rather fit it
                yourself, that is fine — plenty of customers do, and we will still measure it
                properly so you order the right amount.
              </p>
              <div className="mt-8">
                <Button href="/fitting" variant="red" size="md" arrow>
                  How fitting works
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-ink">
                <Media
                  slot="team/fitting"
                  alt="A RABS fitter at work"
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  hint="Fitting team at work"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Guides */}
      {guides.length > 0 && (
        <Section tone="parchment" aria-labelledby="guides-title">
          <Container wide>
            <SectionHeading
              id="guides-title"
              eyebrow="Before you decide"
              title={["Flooring advice", "worth reading."]}
              size="md"
              action={{ label: "All guides", href: "/inspiration" }}
            />
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {guides.map((article, i) => (
                <Reveal key={article.slug} delay={i * 0.06}>
                  <ArticleCard article={article} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
