import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/domain/LegalPage";
import { brand, email, phone, showroom } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Notice",
  description: "How RABS Flooring handles the personal information you send through this website.",
  path: "/privacy",
});

/**
 * This one can be written accurately, because it describes what THIS website
 * does — which is fully known: a quote form that emails the team, a consent
 * flag in localStorage, and optional analytics that do not run without consent.
 *
 * It does not attempt to describe RABS's wider in-store data handling (CCTV,
 * customer records, finance applications). That needs RABS's input and is
 * flagged in docs/CLIENT-CONFIRMATION.md.
 */
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy notice"
      updated={null}
      intro="What happens to the information you send us through this website, in plain English."
    >
      <LegalSection heading="Who we are">
        <p>
          {brand.legalName} (company number {brand.companyNumber}), trading as {brand.name}, of{" "}
          {showroom.line1.value}, {showroom.locality.value}, {showroom.city},{" "}
          {showroom.postcode.value}. You can reach us on {phone.display} or at {email.value}.
        </p>
      </LegalSection>

      <LegalSection heading="What we collect">
        <p>
          If you fill in the quote form, we collect what you type into it: your name, phone number,
          postcode, optionally your email address, the rooms and products you are interested in,
          any sizes or notes you add, and how you would like us to get back to you.
        </p>
        <p>
          If you allow analytics cookies, we also collect anonymous information about how the site
          is used — which pages get visited and which buttons get pressed. That is not linked to
          you personally.
        </p>
      </LegalSection>

      <LegalSection heading="Why we collect it">
        <p>
          To answer your enquiry and give you a quote. That is the whole reason. We do not sell your
          details, we do not pass them to third parties for marketing, and we will not add you to a
          mailing list because you asked about a carpet.
        </p>
      </LegalSection>

      <LegalSection heading="What happens to it">
        <p>
          Your enquiry is sent to us by email so the team can read it and get back to you. It is not
          stored in a database on this website.
        </p>
      </LegalSection>

      <LegalSection heading="Cookies">
        <p>
          The site stores one small item in your browser to remember whether you accepted or
          rejected analytics cookies. Nothing else is stored unless you accept.
        </p>
        <p>
          Analytics cookies do not run before you make that choice. If you reject them, no analytics
          are loaded at all. You can change your mind by clearing this site&rsquo;s data in your
          browser.
        </p>
      </LegalSection>

      <LegalSection heading="Your rights">
        <p>
          You can ask us what we hold about you, ask us to correct it, or ask us to delete it. Ring
          us on {phone.display} or email {email.value} and we will sort it out.
        </p>
        <p>
          If you are not happy with how we have handled your information, you can complain to the
          Information Commissioner&rsquo;s Office at ico.org.uk.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
