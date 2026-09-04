import type { Metadata } from "next";
import { Suspense } from "react";
import { Container, Breadcrumbs } from "@/components/ui/Layout";
import { QuoteWizard } from "@/components/quote/QuoteWizard";
import { PhoneLink, WhatsAppLink } from "@/components/layout/ContactLinks";
import { phone, showroom } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import { jsonLd, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Get a Free Quote | Flooring & Furniture | RABS Flooring",
  description:
    "Tell us about your rooms and the RABS team will come back to you with a quote. Carpets, LVT, laminate, vinyl, furniture and blinds in Stoke-on-Trent.",
  path: "/get-a-quote",
});

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Get a quote", href: "/get-a-quote" },
];

/**
 * The quote page runs without the usual page hero: this is a task, and a
 * decorative 400px banner above a form is just something to scroll past. The
 * sidebar keeps the phone number visible throughout, because a good number of
 * people start a form, decide it is easier to talk to someone, and should not
 * have to hunt for the number when they do.
 */
export default function QuotePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(crumbs))} />

      <div className="bg-ink pb-16 pt-8 text-white sm:pb-20 sm:pt-10">
        <Container wide>
          <Breadcrumbs crumbs={crumbs} onDark />
          <div className="mt-7 max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="rule-gold h-px w-8" aria-hidden="true" />
              <p className="type-eyebrow text-gold">Free, no obligation</p>
            </div>
            <h1 className="type-display text-[2.5rem] leading-[0.9] sm:text-[3.5rem] lg:text-[4rem]">
              <span className="block">Let&rsquo;s get you</span>
              <span className="block text-gold">a price.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/70">
              A few quick questions about your rooms. It takes a couple of minutes, and it means we
              can come back to you with something useful rather than a guess.
            </p>
          </div>
        </Container>
      </div>

      <div className="bg-parchment py-12 sm:py-16 lg:py-20">
        <Container wide>
          <div className="grid gap-8 lg:grid-cols-[1fr_20rem] lg:gap-12">
            <Suspense
              fallback={
                <div className="border border-stone bg-white p-9">
                  <p className="text-sm text-muted">Loading…</p>
                </div>
              }
            >
              <QuoteWizard />
            </Suspense>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="border border-stone bg-white p-6">
                <h2 className="type-editorial text-xl text-ink">Rather just talk?</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Plenty of people would sooner have a two-minute conversation than fill anything
                  in. That is completely fine.
                </p>

                <div className="mt-6 space-y-2.5">
                  <PhoneLink
                    location="quote_sidebar"
                    className="flex min-h-12 items-center justify-center bg-ink px-5 type-eyebrow text-[11px] text-white transition-colors hover:bg-charcoal"
                  >
                    Call {phone.display}
                  </PhoneLink>
                  <WhatsAppLink
                    location="quote_sidebar"
                    className="flex min-h-12 items-center justify-center border border-ink/20 px-5 type-eyebrow text-[11px] text-ink transition-colors hover:border-burgundy hover:text-burgundy"
                  >
                    Message on WhatsApp
                  </WhatsAppLink>
                </div>

                <div className="mt-7 border-t border-stone pt-6">
                  <p className="type-eyebrow mb-3 text-burgundy">Or call in</p>
                  <address className="not-italic text-sm leading-relaxed text-muted">
                    {showroom.line1.value}
                    <br />
                    {showroom.locality.value}, {showroom.city}
                    <br />
                    {showroom.postcode.value}
                  </address>
                </div>
              </div>

              <div className="mt-4 border border-stone bg-ivory p-6">
                <h2 className="type-editorial text-lg text-ink">What happens next</h2>
                <ol className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                  <li className="flex gap-3">
                    <span className="type-eyebrow shrink-0 text-bronze">01</span>
                    We read what you have sent and get in touch the way you asked.
                  </li>
                  <li className="flex gap-3">
                    <span className="type-eyebrow shrink-0 text-bronze">02</span>
                    If we need to measure, we arrange a time that suits you.
                  </li>
                  <li className="flex gap-3">
                    <span className="type-eyebrow shrink-0 text-bronze">03</span>
                    You get a clear price covering the lot — no surprises later.
                  </li>
                </ol>
              </div>
            </aside>
          </div>
        </Container>
      </div>
    </>
  );
}
