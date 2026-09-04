import type { Metadata } from "next";
import { LegalPage, AwaitingPolicy } from "@/components/domain/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Warranty",
  description: "Guarantees and warranties on flooring, furniture and fitting from RABS Flooring in Stoke-on-Trent. Ask us what is covered on your particular order.",
  path: "/warranty",
});

/**
 * These are RABS's own commercial terms. Nobody but RABS can write them, and
 * publishing an invented warranty terms would create a promise the business never
 * agreed to — which is a contractual problem, not a copywriting one. The page
 * says so plainly and points the customer at a human.
 */
export default function WarrantyPage() {
  return (
    <LegalPage title="Warranty" updated={null} intro="What is covered, for how long, and by whom.">
      <AwaitingPolicy
        what="warranty terms"
        questions={[
          "Manufacturer warranty periods for each product category",
          "Whether RABS offers its own guarantee on fitting workmanship, and for how long",
          "What voids a warranty (unsuitable use, wrong cleaning products, subfloor issues)",
          "How a claim is made and what evidence is needed",
          "Whether warranties transfer if the customer sells the house",
        ]}
      />
    </LegalPage>
  );
}
