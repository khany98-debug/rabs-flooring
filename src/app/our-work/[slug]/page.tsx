import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Section, Container, SectionHeading } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard, SampleTag } from "@/components/ui/Cards";
import { projects, getProject } from "@/content/projects";
import { buildMetadata } from "@/lib/seo";
import { jsonLd, breadcrumbSchema } from "@/lib/schema";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return buildMetadata({
    title: `${project.title} | Our Work`,
    description: project.summary,
    path: `/our-work/${project.slug}`,
  });
}

/**
 * Project case study.
 *
 * Sections render only when there is genuine content for them: no "The
 * Challenge" heading over invented narrative, no testimonial block when no
 * customer has given one, no before/after strip without both halves. A case
 * study with three honest sections beats one with eight padded ones.
 */
export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Our work", href: "/our-work" },
    { name: project.title, href: `/our-work/${project.slug}` },
  ];

  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 3);
  const hasBeforeAfter = project.beforeImages.length > 0 && project.afterImages.length > 0;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(crumbs))} />

      <PageHero
        eyebrow={project.category}
        title={project.title}
        lead={project.summary}
        image={`projects/${project.images[0]}`}
        imageHint="Project hero photograph"
        crumbs={crumbs}
      />

      {/* Facts */}
      <Section tone="parchment" padded={false}>
        <Container wide>
          <dl className="grid gap-8 border-b border-stone py-12 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="type-eyebrow mb-3 text-burgundy">Rooms</dt>
              <dd className="text-sm leading-relaxed text-body">{project.rooms.join(", ")}</dd>
            </div>
            {project.flooringType && (
              <div>
                <dt className="type-eyebrow mb-3 text-burgundy">Flooring</dt>
                <dd className="text-sm leading-relaxed text-body">{project.flooringType}</dd>
              </div>
            )}
            <div>
              <dt className="type-eyebrow mb-3 text-burgundy">What we did</dt>
              <dd className="text-sm leading-relaxed text-body">{project.services.join(", ")}</dd>
            </div>
            {project.furniture.length > 0 && (
              <div>
                <dt className="type-eyebrow mb-3 text-burgundy">Furniture</dt>
                <dd className="text-sm leading-relaxed text-body">{project.furniture.join(", ")}</dd>
              </div>
            )}
            {project.location && (
              <div>
                <dt className="type-eyebrow mb-3 text-burgundy">Area</dt>
                <dd className="text-sm leading-relaxed text-body">{project.location}</dd>
              </div>
            )}
          </dl>
        </Container>
      </Section>

      {/* Before / after — only when both halves exist */}
      {hasBeforeAfter && (
        <Section tone="ivory" aria-labelledby="before-after">
          <Container wide>
            <SectionHeading id="before-after" eyebrow="The difference" title={["Before", "and after."]} size="md" />
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <Reveal>
                <figure>
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink">
                    <SampleTag />
                    <Media
                      slot={`projects/${project.beforeImages[0]}`}
                      alt="Before the work started"
                      sizes="(max-width: 640px) 100vw, 46vw"
                      hint="Before photo"
                    />
                  </div>
                  <figcaption className="mt-3 type-eyebrow text-muted">Before</figcaption>
                </figure>
              </Reveal>
              <Reveal delay={0.08}>
                <figure>
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink">
                    <SampleTag />
                    <Media
                      slot={`projects/${project.afterImages[0]}`}
                      alt="After the work was finished"
                      sizes="(max-width: 640px) 100vw, 46vw"
                      hint="After photo"
                    />
                  </div>
                  <figcaption className="mt-3 type-eyebrow text-burgundy">After</figcaption>
                </figure>
              </Reveal>
            </div>
          </Container>
        </Section>
      )}

      {/* Gallery */}
      {project.images.length > 1 && (
        <Section tone="parchment" aria-labelledby="gallery">
          <Container wide>
            <SectionHeading id="gallery" eyebrow="The finished job" title={["A closer", "look."]} size="md" />
            <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {project.images.map((image, i) => (
                <Reveal key={image} delay={Math.min(i, 4) * 0.05}>
                  <div className="media-zoom relative aspect-square w-full overflow-hidden bg-ink">
                    <SampleTag />
                    <Media
                      slot={`projects/${image}`}
                      alt={`${project.title} — ${project.isExample ? "concept image" : `photo ${i + 1}`}`}
                      sizes="(max-width: 640px) 46vw, 24vw"
                      hint="Project photo"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Testimonial — only when a real, attributed one exists */}
      {project.testimonial && (
        <Section tone="burgundy">
          <Container>
            <figure className="mx-auto max-w-3xl text-center">
              <blockquote>
                <p className="type-editorial text-2xl leading-snug text-white sm:text-3xl">
                  &ldquo;{project.testimonial.quote}&rdquo;
                </p>
              </blockquote>
              <figcaption className="mt-6 type-eyebrow text-gold">
                {project.testimonial.attribution} · {project.testimonial.source}
              </figcaption>
            </figure>
          </Container>
        </Section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <Section tone="ivory" aria-labelledby="related">
          <Container wide>
            <SectionHeading
              id="related"
              eyebrow="More of our work"
              title={["Other", "projects."]}
              size="md"
              action={{ label: "See all", href: "/our-work" }}
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section tone="ink">
        <Container>
          <div className="text-center">
            <h2 className="type-display text-3xl sm:text-4xl lg:text-5xl">
              <span className="block">Something similar</span>
              <span className="block text-gold">in mind?</span>
            </h2>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/get-a-quote" variant="gold" size="lg" arrow>
                Get a free quote
              </Button>
              <Button href="/showroom" variant="outline" size="lg" onDark>
                Visit the showroom
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
