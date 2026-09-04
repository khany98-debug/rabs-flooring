import type { Metadata } from "next";
import { LegalPage, AwaitingPolicy } from "@/components/domain/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Delivery",
  description: "How delivery works for furniture and flooring from RABS Flooring in Stoke-on-Trent, including areas covered, charges and lead times. Call us to confirm.",
  path: "/delivery",
});

/**
 * These are RABS's own commercial terms. Nobody but RABS can write them, and
 * publishing an invented delivery terms would create a promise the business never
 * agreed to — which is a contractual problem, not a copywriting one. The page
 * says so plainly and points the customer at a human.
 */
export default function DeliveryPage() {
  return (
    <LegalPage title="Delivery" updated={null} intro="How we get things to you, and what it costs.">
      <AwaitingPolicy
        what="delivery terms"
        questions={[
          "Delivery radius from the showroom",
          "Delivery charges, and whether any orders qualify for free delivery",
          "Whether delivery includes carrying items into a room of choice",
          "Typical lead times for furniture that is not in stock",
          "Whether old furniture can be taken away, and at what cost",
          "Access requirements the customer needs to have checked beforehand",
        ]}
      />
    </LegalPage>
  );
}
