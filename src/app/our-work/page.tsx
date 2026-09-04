import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, Container } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/ui/Cards";
import { Reveal } from "@/components/ui/Reveal";
import { projects } from "@/content/projects";
import { PITCH_MODE } from "@/content/pitch";
import { buildMetadata } from "@/lib/seo";
import { jsonLd, breadcrumbSchema } from "@/lib/schema";
import { social } from "@/content/site";

export const metadata: Metadata = buildMetadata({
  title: "Our Work | Flooring & Furniture Projects in Stoke-on-Trent",
  description:
    "Rooms and whole houses fitted by RABS Flooring across Stoke-on-Trent — carpet, LVT, laminate, vinyl and furniture.",
  path: "/our-work",
});

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Our work", href: "/our-work" },
];

export default function OurWorkPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(crumbs))} />

      <PageHero
        eyebrow="Our work"
        title={["Real homes.", "Real RABS projects."]}
        lead="Rooms we have measured, supplied and fitted around Stoke-on-Trent."
        image="projects/hero"
        imageHint="Best finished-room photograph"
        crumbs={crumbs}
      >
        <Button href="/get-a-quote" variant="gold" size="lg" arrow>
          Start your project
        </Button>
      </PageHero>

      <Section tone="parchment">
        <Container wide>
          {PITCH_MODE && (
            <div className="mb-10 border-l-2 border-champagne bg-white p-5 sm:p-6">
              <p className="type-eyebrow mb-2 text-burgundy">A note on this page</p>
              <p className="max-w-3xl text-sm leading-relaxed text-muted">
                The projects below are layout examples showing how a real case study is structured.
                RABS has genuine installation photography on{" "}
                <a
                  href={social.instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-burgundy underline underline-offset-2"
                >
                  Instagram
                </a>
                ; once those photos and the job details are supplied, they replace these entirely.
                We have not invented customers, locations or testimonials.
              </p>
            </div>
          )}

          {projects.length === 0 ? (
            <div className="mx-auto max-w-xl py-16 text-center">
              <h2 className="type-display text-3xl text-ink">Photos coming soon</h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                We are putting our recent jobs together here. In the meantime, the latest work is
                always on our Instagram.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, i) => (
                <Reveal key={project.id} delay={Math.min(i, 5) * 0.06}>
                  <ProjectCard project={project} priority={i < 3} />
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </Section>

      <Section tone="ink">
        <Container>
          <div className="text-center">
            <h2 className="type-display text-3xl sm:text-4xl lg:text-5xl">
              <span className="block">Want your home</span>
              <span className="block text-gold">on this page?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/65">
              Tell us what you are thinking of doing and we will come back to you with a proper
              quote.
            </p>
            <div className="mt-9">
              <Button href="/get-a-quote" variant="gold" size="lg" arrow>
                Get a free quote
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
