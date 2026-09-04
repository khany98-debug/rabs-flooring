import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/domain/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Cookie Policy",
  description: "Which cookies the RABS Flooring website uses, why, and how to accept or reject them. Analytics are optional and never run before you choose.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookies"
      updated={null}
      intro="A short, honest list. There is not much to it."
    >
      <LegalSection heading="Essential">
        <p>
          One item stored in your browser records whether you accepted or rejected analytics
          cookies, so we do not ask you again on every page. It contains one word and nothing else.
        </p>
      </LegalSection>

      <LegalSection heading="Analytics (optional)">
        <p>
          If you accept, we use analytics to see which pages people visit and which buttons get
          pressed. It tells us that a page is useful; it does not tell us who you are.
        </p>
        <p>
          These do not load until you accept. Reject them and nothing analytics-related runs at all
          — not a reduced version, none of it.
        </p>
      </LegalSection>

      <LegalSection heading="What we do not use">
        <p>
          No advertising cookies. No retargeting pixels. No social media tracking widgets. The
          Instagram section on this site is our own images linking out, not an embedded widget, so
          it cannot track you.
        </p>
      </LegalSection>

      <LegalSection heading="Changing your mind">
        <p>
          Clear this site&rsquo;s data in your browser settings and the banner will appear again on
          your next visit.
        </p>
        <p>
          See also our{" "}
          <Link href="/privacy" className="text-burgundy underline underline-offset-2">
            privacy notice
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
