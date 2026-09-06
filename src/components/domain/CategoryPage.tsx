import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section, Container, SectionHeading, Badge } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { CategoryCard } from "@/components/ui/Cards";
import { jsonLd, breadcrumbSchema, faqSchema } from "@/lib/schema";
import type { Category } from "@/content/categories";
import { cn } from "@/lib/utils";
import { PITCH_MODE } from "@/content/pitch";

/**
 * The shared skeleton behind every category page — but the *content* is
 * entirely per-category: its own headline, its own buying guidance, its own
 * room-by-room verdicts, its own FAQs (see content/categories.ts).
 *
 * The distinction matters. Sharing a layout is good engineering; sharing the
 * copy with the keyword swapped is a doorway page, and it reads as one to both
 * customers and search engines.
 */

const verdictLabel = {
  great: "Great choice",
  good: "Works well",
  consider: "Think twice",
} as const;

export function CategoryPage({
  category,
  siblings,
  groupLabel,
  groupHref,
  href,
}: {
  category: Category;
  /** Other categories in the same group, for the cross-sell rail. */
  siblings: Category[];
  groupLabel: string;
  groupHref: string;
  /** This page's own path. Blinds sits at /blinds, not under its group. */
  href?: string;
}) {
  const selfHref = href ?? `${groupHref}/${category.slug}`;
  const crumbs = [
    { name: "Home", href: "/" },
    { name: groupLabel, href: groupHref },
    { name: category.name, href: selfHref },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([breadcrumbSchema(crumbs), faqSchema(category.faqs)])}
      />

      <PageHero
        eyebrow={groupLabel}
        title={category.headline}
        lead={category.intro}
        image={category.image}
        imageHint={`${category.name} — hero image`}
        crumbs={crumbs}
        size="lg"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={`/get-a-quote?interest=${category.group}&type=${category.slug}`} variant="gold" size="lg" arrow>
            Get a free quote
          </Button>
          <Button href="/showroom" variant="outline" size="lg" onDark>
            See it in the showroom
          </Button>
        </div>
      </PageHero>

      {/* Browse-by rail. Presentational until a real catalogue exists — it
          communicates the breadth of choice without pretending to filter
          stock the site does not have. */}
      {category.filters && (
        <Section tone="ivory" padded={false}>
          <Container wide>
            <div className="grid gap-8 border-b border-stone py-10 sm:grid-cols-3">
              {category.filters.map((filter) => (
                <div key={filter.label}>
                  <p className="type-eyebrow mb-4 text-burgundy">{filter.label}</p>
                  <ul className="flex flex-wrap gap-2">
                    {filter.options.map((option) => (
                      <li key={option}>
                        <Link
                          href={`/get-a-quote?interest=${category.group}&type=${category.slug}&note=${encodeURIComponent(option)}`}
                          className="inline-flex min-h-9 items-center border border-stone px-3 text-xs text-body transition-colors hover:border-burgundy hover:text-burgundy"
                        >
                          {option}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="py-5 text-xs text-muted">
              Ranges change regularly. Give us a call and we will tell you what we have in right now.
            </p>
          </Container>
        </Section>
      )}

      {/* Buying guidance */}
      <Section tone="ivory" aria-labelledby="buying-title">
        <Container wide>
          <SectionHeading
            id="buying-title"
            eyebrow="What to think about"
            title={["Choosing", `your ${category.name.toLowerCase()}.`]}
            lead={`The things that actually change how happy you are with ${category.name.toLowerCase()} a year later.`}
          />

          <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {category.buying.map((point, i) => (
              <Reveal key={point.title} delay={Math.min(i, 3) * 0.06}>
                <div className="border-t border-stone pt-6">
                  <span className="type-display block text-2xl text-bronze">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="type-editorial mt-3 text-xl text-ink sm:text-2xl">{point.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{point.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Room-by-room */}
      <Section tone="ink" aria-labelledby="rooms-title">
        <Container wide>
          <SectionHeading
            id="rooms-title"
            eyebrow="Room by room"
            title={["Where it works —", "and where it doesn't."]}
            lead="An honest verdict for each room. We would rather tell you now than fit something that will disappoint you."
            onDark
          />

          <ul className="mt-12 divide-y divide-white/10 border-y border-white/10">
            {category.rooms.map((room, i) => (
              <Reveal key={room.room} delay={Math.min(i, 4) * 0.05}>
                <li className="grid gap-3 py-6 sm:grid-cols-[10rem_9rem_1fr] sm:items-baseline sm:gap-6">
                  <h3 className="type-editorial text-xl text-white">{room.room}</h3>
                  <div>
                    <Badge
                      tone={room.verdict === "great" ? "gold" : room.verdict === "good" ? "outline" : "outline"}
                      className={cn(
                        room.verdict === "good" && "border-white/40 text-white/80",
                        room.verdict === "consider" && "border-ember/70 text-ember",
                      )}
                    >
                      {verdictLabel[room.verdict]}
                    </Badge>
                  </div>
                  <p className="text-sm leading-relaxed text-white/60">{room.note}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Showroom nudge */}
      <Section tone="parchment">
        <Container wide>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <Reveal>
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-ink">
                <Media
                  slot="showroom/interior-wide"
                  alt={
                    PITCH_MODE
                      ? "AI-generated concept showroom interior for the RABS Flooring proposal"
                      : "Inside the RABS Flooring showroom"
                  }
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  hint="Showroom interior"
                />
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <SectionHeading
                eyebrow="Worth the trip"
                title={["Come and", "see it properly."]}
                size="md"
              />
              <p className="mt-6 text-base leading-relaxed text-muted">{category.showroomReason}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/showroom" variant="red" size="md" arrow>
                  Plan your visit
                </Button>
                <Button href="/get-a-quote" variant="outline" size="md">
                  Get a quote first
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* FAQs */}
      <Section tone="ivory" aria-labelledby="faq-title">
        <Container>
          <SectionHeading
            id="faq-title"
            eyebrow="Common questions"
            title={[`${category.name}:`, "the questions we get asked."]}
            size="md"
          />

          <dl className="mt-10 divide-y divide-stone border-y border-stone">
            {category.faqs.map((faq) => (
              <div key={faq.q} className="py-7">
                <dt className="type-editorial text-xl text-ink">{faq.q}</dt>
                <dd className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* Cross-sell */}
      {siblings.length > 0 && (
        <Section tone="parchment" aria-labelledby="also-title">
          <Container wide>
            <SectionHeading
              id="also-title"
              eyebrow="Also worth a look"
              title={["Other", groupLabel.toLowerCase()]}
              size="md"
              action={{ label: `All ${groupLabel.toLowerCase()}`, href: groupHref }}
            />
            <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {siblings.map((sibling) => (
                <CategoryCard
                  key={sibling.slug}
                  name={sibling.name}
                  href={`${groupHref}/${sibling.slug}`}
                  image={sibling.image}
                  line={sibling.strapline}
                />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
