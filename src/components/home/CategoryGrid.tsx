import { Section, Container, SectionHeading } from "@/components/ui/Layout";
import { CategoryCard } from "@/components/ui/Cards";
import { Reveal } from "@/components/ui/Reveal";
import { homeCategoryCards } from "@/content/categories";

/**
 * "Everything for the home."
 *
 * Eight categories, deliberately not eight identical tiles. The four flooring
 * categories run tall, the four furniture/blinds categories run wide beneath
 * them. Two clean rows that always tile — and the change in proportion is what
 * stops the grid reading as a directory of thumbnails, which is the fastest
 * way a retail homepage starts to look like a template.
 *
 * On mobile it is a two-column grid rather than a horizontal rail: a carousel
 * would hide half the categories behind a swipe most people never make, and
 * these eight categories are the entire proposition.
 */
export function CategoryGrid() {
  const flooring = homeCategoryCards.slice(0, 4);
  const rest = homeCategoryCards.slice(4);

  return (
    <Section tone="parchment" aria-labelledby="categories-title">
      <Container wide>
        <SectionHeading
          id="categories-title"
          eyebrow="Shop by category"
          title={["Everything", "for the home."]}
          lead="Flooring, furniture and blinds in one showroom — so the floor, the sofa and the finish can be chosen against each other, rather than guessed at across three different shops."
          action={{ label: "See the full range", href: "/flooring" }}
        />

        <div className="mt-12 space-y-2.5 sm:space-y-3 lg:space-y-4">
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4 lg:gap-4">
            {flooring.map((cat, i) => (
              <Reveal key={cat.href} delay={Math.min(i, 3) * 0.06}>
                <CategoryCard {...cat} tall priority={i < 2} />
              </Reveal>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4 lg:gap-4">
            {rest.map((cat, i) => (
              <Reveal key={cat.href} delay={Math.min(i, 3) * 0.06}>
                <CategoryCard {...cat} />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
