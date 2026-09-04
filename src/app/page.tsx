import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ShowroomAnnounce } from "@/components/home/ShowroomAnnounce";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { OfferSection } from "@/components/home/OfferSection";
import { FinderSection } from "@/components/home/FinderSection";
import { WholeHome } from "@/components/home/WholeHome";
import { WhyRabs } from "@/components/home/WhyRabs";
import { ProjectsPreview } from "@/components/home/ProjectsPreview";
import { ReviewSection } from "@/components/home/ReviewSection";
import { SocialWall } from "@/components/home/SocialWall";
import { FinalCTA } from "@/components/home/FinalCTA";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Flooring & Furniture in Stoke-on-Trent | RABS",
  description:
    "Carpets, LVT, laminate, vinyl, sofas, beds and blinds at the RABS showroom in Stoke-on-Trent. Supply only or supplied and fitted by our own team. Get a free quote.",
  path: "/",
});

/**
 * HOMEPAGE
 *
 * The section order follows the customer's actual sequence of questions rather
 * than a template's: who are you and what do you sell (hero) → where are you
 * (showroom) → show me the range (categories) → what is it going to cost
 * (offers) → I do not know what I want (finder) → can you do the lot
 * (whole-home) → why you (why RABS) → prove it (projects, reviews, social) →
 * right, how do I start (final CTA).
 *
 * The tone prop on each section drives the vertical rhythm — ink, parchment,
 * oxblood, burgundy, ivory — so no two adjacent bands share a ground.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ShowroomAnnounce />
      <CategoryGrid />
      <OfferSection />
      <FinderSection />
      <WholeHome />
      <WhyRabs />
      <ProjectsPreview />
      <ReviewSection />
      <SocialWall />
      <FinalCTA />
    </>
  );
}
