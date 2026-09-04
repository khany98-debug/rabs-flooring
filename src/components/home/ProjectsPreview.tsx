import { Section, Container, SectionHeading } from "@/components/ui/Layout";
import { ProjectCard } from "@/components/ui/Cards";
import { Reveal } from "@/components/ui/Reveal";
import { getFeaturedProjects } from "@/content/projects";

/**
 * "Real homes. Real RABS projects."
 *
 * Removes itself when there is nothing genuine to show, rather than filling
 * the space with stock interiors. A gallery of somebody else's houses is worse
 * than no gallery — customers in Stoke recognise their own streets, and they
 * recognise a stock photo just as fast.
 */
export function ProjectsPreview() {
  const projects = getFeaturedProjects(3);
  if (projects.length === 0) return null;

  return (
    <Section tone="parchment" aria-labelledby="projects-title">
      <Container wide>
        <SectionHeading
          id="projects-title"
          eyebrow="Our work"
          title={["Real homes.", "Real RABS projects."]}
          lead="Rooms we have measured, supplied and fitted around Stoke-on-Trent."
          action={{ label: "See all our work", href: "/our-work" }}
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.07}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
