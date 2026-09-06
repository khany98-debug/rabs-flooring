import { Media } from "@/components/ui/Media";
import { Button } from "@/components/ui/Button";
import { Section, Container, SectionHeading } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { PITCH_MODE } from "@/content/pitch";

/**
 * "One team. Your whole home."
 *
 * This is RABS's strongest commercial argument and the thing a national chain
 * cannot easily copy: most customers doing a house currently need a flooring
 * shop, a furniture shop, a fitter and a delivery company. RABS can compress
 * that.
 *
 * The steps below describe how a job runs. Each one is deliberately written
 * without a promise attached — no timescales, no "free", no guarantees —
 * because none of those have been confirmed.
 */

const STEPS = [
  {
    n: "01",
    title: "Come and see it",
    body: "Bring your room sizes and a photo or two. Seeing flooring and furniture side by side in one showroom is quicker than three separate trips.",
  },
  {
    n: "02",
    title: "We measure",
    body: "We take the ordering measurements ourselves, check the subfloor and flag anything that needs preparing before a floor goes down.",
  },
  {
    n: "03",
    title: "One quote",
    body: "Flooring, furniture, blinds and fitting priced together as one job, so you can see the whole picture rather than four separate bills.",
  },
  {
    n: "04",
    title: "We fit it",
    body: "Fitted by our own team, room by room or the whole property in one go — whichever works around you.",
  },
] as const;

export function WholeHome() {
  return (
    <Section tone="ivory" aria-labelledby="whole-home-title">
      <Container wide>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink sm:aspect-[3/2] lg:aspect-[4/5]">
              <Media
                slot="projects/whole-house-after"
                alt={
                  PITCH_MODE
                    ? "AI-generated concept interior for a whole-home RABS proposal"
                    : "A whole-house flooring and furniture project by RABS"
                }
                sizes="(max-width: 1024px) 100vw, 46vw"
                hint="Finished room — whole house job"
              />
            </div>
          </Reveal>

          <div>
            <SectionHeading
              id="whole-home-title"
              eyebrow="Whole-home projects"
              title={["One team.", "Your whole home."]}
              lead="A flooring shop, a furniture shop, a fitter and a delivery company is four sets of dates to juggle and four people to chase. Doing it in one place is simply less hassle."
            />

            <ol className="mt-10 space-y-7">
              {STEPS.map((step, i) => (
                <Reveal key={step.n} delay={i * 0.06}>
                  <li className="flex gap-5">
                    <span className="type-display shrink-0 text-2xl text-bronze">{step.n}</span>
                    <div className="border-l border-stone pl-5">
                      <h3 className="type-editorial text-xl text-ink">{step.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.body}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href="/get-a-quote?interest=whole-home" variant="red" size="lg" arrow>
                Plan your home
              </Button>
              <Button href="/fitting" variant="outline" size="lg">
                How fitting works
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
