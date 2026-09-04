import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, Container, SectionHeading } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { buildMetadata } from "@/lib/seo";
import { jsonLd, breadcrumbSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Flooring Fitting in Stoke-on-Trent | RABS",
  description:
    "Carpet, vinyl, laminate and LVT supplied and fitted by the RABS team in Stoke-on-Trent. Supply-only is available too. Get a free quote.",
  path: "/fitting",
});

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Fitting", href: "/fitting" },
];

/**
 * Fitting page.
 *
 * Every promise here is deliberately about *process*, not about terms. There
 * is no "free measuring", no timescale, no guarantee and no insurance claim —
 * none of those have been confirmed by RABS, and they are precisely the claims
 * a customer will hold you to later. What RABS's own material does evidence is
 * that they supply and fit carpet, vinyl, laminate and LVT, so that is what
 * the page says.
 */

const STAGES = [
  {
    n: "01",
    title: "We measure",
    body: "Your own measurements are ideal for planning a budget, but we take the ordering figures ourselves. Doorways, recesses, chimney breasts and the direction the material runs all change how much you actually need.",
  },
  {
    n: "02",
    title: "We check the subfloor",
    body: "This is the part most quotes skip. Boards that move, a floor that is not level, old adhesive still down — all of it shows through the finished floor. We would rather tell you at the measure than on fitting day.",
  },
  {
    n: "03",
    title: "You get one clear quote",
    body: "Covering, underlay, gripper, bars, any preparation and the fitting itself. If something might need doing once the old floor comes up, we will say so up front rather than surprising you.",
  },
  {
    n: "04",
    title: "We fit it",
    body: "Old floor up, subfloor prepared, new floor down, edges and bars finished properly. We tidy up after ourselves.",
  },
];

const FAQS = [
  {
    q: "Do you fit flooring you have not supplied?",
    a: "Ask us. It depends on the product and how it has been stored — call and describe what you have and we will tell you honestly whether it is a job we can take on.",
  },
  {
    q: "Can I buy flooring without fitting?",
    a: "Yes. We supply carpet, vinyl, laminate and LVT on their own, and we will still measure properly so you order the right amount rather than guessing.",
  },
  {
    q: "Do I need to move the furniture?",
    a: "Talk to us when we measure. It depends on the room and what is in it, and it is much easier to agree beforehand than on the day.",
  },
  {
    q: "What about the old flooring?",
    a: "Tell us at the quote stage whether you want it taken up and taken away, and we will price it in rather than leaving it as an unpleasant extra.",
  },
  {
    q: "How long does a room take?",
    a: "Most single rooms are a same-day job. A whole house depends on the size, the products and how much subfloor preparation is needed — we will give you a realistic timescale with your quote rather than an optimistic one.",
  },
];

export default function FittingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([breadcrumbSchema(crumbs), faqSchema(FAQS)])}
      />

      <PageHero
        eyebrow="Professional fitting"
        title={["Fitted properly.", "First time."]}
        lead="We supply and fit carpet, vinyl, laminate and LVT. A good floor is about eighty per cent preparation — which is the part nobody sees and everybody feels."
        image="team/fitting"
        imageHint="Fitting team at work"
        crumbs={crumbs}
        size="lg"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/get-a-quote?interest=flooring" variant="gold" size="lg" arrow>
            Get a fitting quote
          </Button>
          <Button href="/flooring" variant="outline" size="lg" onDark>
            Browse flooring
          </Button>
        </div>
      </PageHero>

      {/* How a job runs */}
      <Section tone="parchment" aria-labelledby="stages-title">
        <Container wide>
          <SectionHeading
            id="stages-title"
            eyebrow="How it works"
            title={["From measure", "to finished floor."]}
            lead="No mystery, no surprises on the day."
          />

          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <ol className="space-y-9">
              {STAGES.map((stage, i) => (
                <Reveal key={stage.n} delay={Math.min(i, 3) * 0.06}>
                  <li className="flex gap-5">
                    <span className="type-display shrink-0 text-3xl text-bronze">{stage.n}</span>
                    <div className="border-l border-stone pl-5">
                      <h3 className="type-editorial text-xl text-ink sm:text-2xl">{stage.title}</h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-muted">{stage.body}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={0.1}>
              <div className="sticky top-28">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-ink">
                  <Media
                    slot="team/fitting-detail"
                    alt="Detail of a floor being fitted"
                    sizes="(max-width: 1024px) 100vw, 46vw"
                    hint="Close-up of fitting work"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Supply only vs supply and fit */}
      <Section tone="ink" aria-labelledby="options-title">
        <Container wide>
          <SectionHeading
            id="options-title"
            eyebrow="Two ways to buy"
            title={["Supply only, or", "supplied and fitted."]}
            lead="Both are fine. It is your house."
            onDark
          />

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {[
              {
                title: "Supplied and fitted",
                body: "We measure, order, prepare the subfloor and fit it. One quote, one team, one point of contact if anything needs looking at afterwards.",
                points: [
                  "Measured by us, so the quantities are right",
                  "Subfloor preparation included in the quote",
                  "Underlay, gripper, bars and finishing sorted",
                  "One number to ring if you have a question",
                ],
                cta: "Get a fitted quote",
                href: "/get-a-quote?interest=flooring&supply=fitted",
              },
              {
                title: "Supply only",
                body: "Plenty of customers fit their own, or have someone lined up. We will still measure properly so you are not ordering blind — a wasted roll costs more than the measure.",
                points: [
                  "Carpet, vinyl, laminate and LVT",
                  "We will still work out what you need",
                  "Advice on underlay and preparation",
                  "No pressure to use our fitters",
                ],
                cta: "Enquire about supply only",
                href: "/get-a-quote?interest=flooring&supply=supply-only",
              },
            ].map((option, i) => (
              <Reveal key={option.title} delay={i * 0.08}>
                <div className="flex h-full flex-col border border-white/15 bg-charcoal p-7 sm:p-9">
                  <h3 className="type-display text-2xl text-white sm:text-3xl">{option.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/65">{option.body}</p>

                  <ul className="mt-7 flex-1 space-y-3">
                    {option.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm text-white/75">
                        <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-gold" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="m4 10 4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <Button href={option.href} variant="gold" size="sm" arrow>
                      {option.cta}
                    </Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQs */}
      <Section tone="ivory" aria-labelledby="fitting-faq">
        <Container>
          <SectionHeading
            id="fitting-faq"
            eyebrow="Common questions"
            title={["Fitting:", "what people ask."]}
            size="md"
          />

          <dl className="mt-10 divide-y divide-stone border-y border-stone">
            {FAQS.map((faq) => (
              <div key={faq.q} className="py-7">
                <dt className="type-editorial text-xl text-ink">{faq.q}</dt>
                <dd className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{faq.a}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 text-center">
            <Button href="/get-a-quote" variant="red" size="lg" arrow>
              Get a free quote
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
