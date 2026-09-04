import { Section, Container, SectionHeading } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { brand } from "@/content/site";

/**
 * "Why RABS."
 *
 * Five points, not a wall of twelve icons. Every claim here is either
 * evidenced by RABS's own material (they supply and fit carpet, vinyl,
 * laminate and LVT; they carry furniture and blinds; they have a Stoke-on-Trent
 * showroom) or is a verifiable public record (the company has been registered
 * since 2019).
 *
 * Nothing about awards, years of experience, guarantees, free measuring or
 * price-matching appears anywhere — none of it has been confirmed, and those
 * are exactly the claims a competitor or a trading standards officer checks.
 */

const REASONS = [
  {
    title: "Flooring and furniture together",
    body: "Carpet, LVT, laminate, vinyl, sofas, beds, dining and blinds under one roof. Choose the floor and the furniture against each other instead of guessing across two shops.",
  },
  {
    title: "Fitted by our own team",
    body: "We supply and fit carpet, vinyl, laminate and LVT. Prefer to fit it yourself? Supply-only is fine too — just tell us which you want.",
  },
  {
    title: "A real showroom",
    body: "Full-size displays you can walk on, sit on and see in daylight — not a folder of postage-stamp samples.",
  },
  {
    title: "Local and established",
    body: `${brand.legalName} has been registered in Stoke-on-Trent since 2019. We are a few minutes away if anything needs looking at.`,
  },
  {
    title: "Straight answers",
    body: "If a floor is wrong for your room, we will say so. It is a smaller sale and a much better outcome than fitting something that will not last.",
  },
] as const;

export function WhyRabs() {
  return (
    <Section tone="burgundy" aria-labelledby="why-title">
      <div className="texture-weave pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />
      <Container wide>
        <div className="relative">
          <SectionHeading
            id="why-title"
            eyebrow="Why RABS"
            title={["Everything you need,", "in one place."]}
            onDark
          />

          <ul className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {REASONS.map((reason, i) => (
              <Reveal key={reason.title} delay={Math.min(i, 3) * 0.06}>
                <li className="border-t border-white/20 pt-6">
                  <span className="rule-gold mb-5 block h-px w-9" aria-hidden="true" />
                  <h3 className="type-editorial text-xl text-white sm:text-2xl">{reason.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{reason.body}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
