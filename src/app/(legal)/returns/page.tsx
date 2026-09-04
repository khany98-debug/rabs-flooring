import type { Metadata } from "next";
import { LegalPage, AwaitingPolicy } from "@/components/domain/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Returns",
  description: "Returns, cancellations and faulty goods at RABS Flooring in Stoke-on-Trent, including how cut flooring and special orders are treated. Speak to the team.",
  path: "/returns",
});

/**
 * These are RABS's own commercial terms. Nobody but RABS can write them, and
 * publishing an invented returns and cancellation terms would create a promise the business never
 * agreed to — which is a contractual problem, not a copywriting one. The page
 * says so plainly and points the customer at a human.
 */
export default function ReturnsPage() {
  return (
    <LegalPage title="Returns" updated={null} intro="What happens if something is not right.">
      <AwaitingPolicy
        what="returns and cancellation terms"
        questions={[
          "Returns window for furniture bought in the showroom",
          "Whether cut flooring (carpet, vinyl cut from a roll) is returnable — normally it is not",
          "How special orders and made-to-measure items are treated",
          "Restocking or collection charges, if any",
          "The process for reporting a fault, and expected response",
          "How deposits are treated on cancellation",
        ]}
      />
    </LegalPage>
  );
}
