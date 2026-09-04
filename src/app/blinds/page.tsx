import type { Metadata } from "next";
import { CategoryPage } from "@/components/domain/CategoryPage";
import { blindsCategory, furnitureCategories } from "@/content/categories";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: blindsCategory.metaTitle,
  description: blindsCategory.metaDescription,
  path: "/blinds",
});

/**
 * Blinds sits at the top level rather than under furniture: it is a distinct
 * buying decision people search for on its own, and burying it two levels deep
 * would cost the page its own entry point.
 */
export default function BlindsPage() {
  return (
    <CategoryPage
      category={blindsCategory}
      siblings={furnitureCategories.slice(0, 4)}
      groupLabel="Furniture"
      groupHref="/furniture"
      href="/blinds"
    />
  );
}
