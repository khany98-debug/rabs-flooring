import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/Layout";
import { PhoneLink } from "@/components/layout/ContactLinks";
import { phone, email } from "@/content/site";
import { PITCH_MODE } from "@/content/pitch";

export function LegalPage({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  /** Null where the policy has not been written yet. */
  updated: string | null;
  intro: string;
  children?: ReactNode;
}) {
  return (
    <>
      <Breadcrumbs
        crumbs={[
          { name: "Home", href: "/" },
          { name: title, href: "#" },
        ]}
      />

      <h1 className="type-display mt-7 text-[2.25rem] leading-[0.95] text-ink sm:text-[3rem]">
        {title}
      </h1>

      <p className="mt-5 text-base leading-relaxed text-muted">{intro}</p>

      {updated && <p className="mt-4 text-xs text-muted">Last updated: {updated}</p>}

      <div className="mt-10 space-y-8">{children}</div>

      <div className="mt-14 border-t border-stone pt-8">
        <p className="text-sm leading-relaxed text-muted">
          Questions about any of this? Call us on{" "}
          <PhoneLink location="legal_page" className="text-burgundy underline underline-offset-2">
            {phone.display}
          </PhoneLink>{" "}
          or email{" "}
          <a href={`mailto:${email.value}`} className="text-burgundy underline underline-offset-2">
            {email.value}
          </a>
          .
        </p>
      </div>
    </>
  );
}

export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="type-editorial text-xl text-ink sm:text-2xl">{heading}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-body sm:text-base">{children}</div>
    </section>
  );
}

/**
 * Used on the commercial policy pages — delivery, returns, warranty, terms.
 *
 * These describe how RABS actually trades, and nobody but RABS can write them.
 * Inventing a returns window or a warranty period would create a contractual
 * promise the business never agreed to, so the page says plainly that the terms
 * are being confirmed and points the customer at a human in the meantime.
 */
export function AwaitingPolicy({ what, questions }: { what: string; questions: string[] }) {
  return (
    <div className="border-l-2 border-champagne bg-white p-6 sm:p-8">
      <p className="type-eyebrow mb-3 text-burgundy">Being finalised</p>
      <p className="text-sm leading-relaxed text-body sm:text-base">
        Our {what} are being written up properly. Rather than publish something vague, please ask us
        directly — we will give you a straight answer for your particular order, and it will be
        confirmed in writing before you commit to anything.
      </p>

      {PITCH_MODE && questions.length > 0 && (
        <div className="mt-6 border-t border-stone pt-5">
          <p className="type-eyebrow mb-3 text-muted">For RABS to confirm</p>
          <ul className="space-y-1.5 text-sm text-muted">
            {questions.map((q) => (
              <li key={q} className="flex gap-2">
                <span aria-hidden="true">&middot;</span>
                {q}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6">
        <PhoneLink
          location="awaiting_policy"
          className="inline-flex min-h-11 items-center bg-ink px-5 type-eyebrow text-[11px] text-white transition-colors hover:bg-charcoal"
        >
          Call {phone.display}
        </PhoneLink>
      </div>
    </div>
  );
}
