import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, Container, SectionHeading } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { brand, showroom } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import { jsonLd, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "About RABS Flooring | Stoke-on-Trent",
  description:
    "RABS Flooring supplies and fits carpet, vinyl, laminate and LVT, and stocks furniture and blinds, from our showroom in Stoke-on-Trent.",
  path: "/about",
});

const crumbs = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
];

/**
 * About page.
 *
 * Written entirely from what can be evidenced: the registered company and its
 * incorporation date (Companies House), the services RABS describe themselves
 * (supply and fit carpet, vinyl, laminate, LVT), the showroom, and the
 * tagline they already use.
 *
 * There is no founder story, no "over 20 years of experience", no team count,
 * no awards and no family history — not because those would not be good copy,
 * but because none of it has been confirmed, and invented heritage is the
 * easiest claim in the world for a customer to catch.
 */
export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(crumbs))} />

      <PageHero
        eyebrow="About us"
        title={["Turning houses", "into homes."]}
        lead={`Flooring, furniture and professional fitting from our showroom in ${showroom.locality.value}, ${showroom.city}.`}
        image="team/team"
        imageHint="Team or showroom photograph"
        crumbs={crumbs}
      />

      <Section tone="parchment">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink">
                <Media
                  slot="showroom/interior-wide"
                  alt="Inside the RABS Flooring showroom"
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  hint="Showroom interior"
                />
              </div>
            </Reveal>

            <div>
              <SectionHeading
                eyebrow="Who we are"
                title={["A Stoke-on-Trent", "business."]}
                size="md"
              />

              <div className="mt-7 space-y-5 text-base leading-relaxed text-muted">
                <p>
                  RABS supplies and fits carpet, vinyl, laminate and LVT, and stocks furniture and
                  blinds alongside them. Everything in one showroom, so a customer doing a room — or
                  a whole house — is not running between three different shops trying to remember a
                  shade of grey.
                </p>
                <p>
                  {brand.legalName} has been registered here since 2019. We are local, which means
                  if something needs looking at afterwards we are a few minutes away rather than a
                  call centre and a reference number.
                </p>
                <p>
                  The tagline is not marketing. Most of what we sell goes into somebody&rsquo;s
                  living room, or the bedroom their kids sleep in. That is a different kind of sale
                  from shifting a box, and we try to treat it that way.
                </p>
              </div>

              <dl className="mt-10 grid gap-6 border-t border-stone pt-8 sm:grid-cols-2">
                <div>
                  <dt className="type-eyebrow mb-2 text-burgundy">Registered as</dt>
                  <dd className="text-sm text-body">{brand.legalName}</dd>
                </div>
                <div>
                  <dt className="type-eyebrow mb-2 text-burgundy">Company number</dt>
                  <dd className="text-sm text-body">{brand.companyNumber}</dd>
                </div>
                <div>
                  <dt className="type-eyebrow mb-2 text-burgundy">Trading since</dt>
                  <dd className="text-sm text-body">Registered 2019</dd>
                </div>
                <div>
                  <dt className="type-eyebrow mb-2 text-burgundy">Showroom</dt>
                  <dd className="text-sm text-body">
                    {showroom.locality.value}, {showroom.city}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="ink" aria-labelledby="how-title">
        <Container wide>
          <SectionHeading
            id="how-title"
            eyebrow="How we work"
            title={["Straight answers,", "properly fitted."]}
            onDark
          />

          <div className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "We measure before we quote",
                body: "A price given over the phone without seeing the rooms is a guess. We would rather take ten minutes and give you a number that holds.",
              },
              {
                title: "We tell you if it is wrong",
                body: "If the floor you have set your heart on is a bad idea for that room, we will say so. Smaller sale, better outcome.",
              },
              {
                title: "Preparation is not an optional extra",
                body: "Most floors that disappoint people were fitted onto a subfloor nobody dealt with. It is the part you never see and always feel.",
              },
              {
                title: "Supply only is fine",
                body: "Plenty of customers fit their own. We will still measure properly so you order the right amount.",
              },
              {
                title: "One quote for the lot",
                body: "Flooring, furniture, blinds and fitting priced together, rather than four separate bills arriving at different times.",
              },
              {
                title: "We are round the corner",
                body: "Local matters most after the sale, not during it.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={Math.min(i, 3) * 0.05}>
                <div className="border-t border-white/15 pt-6">
                  <span className="rule-gold mb-4 block h-px w-8" aria-hidden="true" />
                  <h3 className="type-editorial text-xl text-white">{item.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/65">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="ivory">
        <Container>
          <div className="text-center">
            <span className="rule-gold mx-auto mb-6 block h-px w-12" aria-hidden="true" />
            <h2 className="type-display text-3xl text-ink sm:text-4xl lg:text-5xl">
              <span className="block">Come and say hello.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted">
              No appointment needed. Bring your room sizes and a couple of photos and we will take it
              from there.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/showroom" variant="red" size="lg" arrow>
                Visit the showroom
              </Button>
              <Button href="/get-a-quote" variant="outline" size="lg">
                Get a free quote
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
