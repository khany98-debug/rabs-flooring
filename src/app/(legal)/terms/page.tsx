import type { Metadata } from "next";
import { LegalPage, AwaitingPolicy } from "@/components/domain/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms & Conditions",
  description: "Terms of sale and website terms for RABS Flooring in Stoke-on-Trent, covering deposits, payment, quotes and fitting. Ask us for the detail on your order.",
  path: "/terms",
});

/**
 * These are RABS's own commercial terms. Nobody but RABS can write them, and
 * publishing an invented terms of sale would create a promise the business never
 * agreed to — which is a contractual problem, not a copywriting one. The page
 * says so plainly and points the customer at a human.
 */
export default function TermsPage() {
  return (
    <LegalPage title="Terms & conditions" updated={null} intro="The terms that apply when you buy from us.">
      <AwaitingPolicy
        what="terms of sale"
        questions={[
          "Deposit requirements and when the balance is due",
          "Accepted payment methods",
          "Whether finance is offered, and through which provider (this must be FCA-compliant)",
          "How quotes are validated and how long a quote stands",
          "What happens if additional subfloor work is discovered on fitting day",
          "Liability position and any limitations",
        ]}
      />
    </LegalPage>
  );
}
