import type { ReactNode } from "react";
import { Container } from "@/components/ui/Layout";

/**
 * Shared shell for the policy pages: a single measured column on parchment,
 * with no hero. These are pages people read when they need an answer, not
 * pages that need selling.
 */
export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-parchment py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-[46rem]">{children}</div>
      </Container>
    </div>
  );
}
