import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryPage } from "@/components/domain/CategoryPage";
import { flooringCategories, getCategory } from "@/content/categories";
import { buildMetadata } from "@/lib/seo";

type Params = { params: Promise<{ category: string }> };

/** Statically generated — four known categories, no runtime lookups. */
export function generateStaticParams() {
  return flooringCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory("flooring", slug);
  if (!category) return {};

  return buildMetadata({
    title: category.metaTitle,
    description: category.metaDescription,
    path: `/flooring/${category.slug}`,
  });
}

export default async function FlooringCategoryPage({ params }: Params) {
  const { category: slug } = await params;
  const category = getCategory("flooring", slug);
  if (!category) notFound();

  return (
    <CategoryPage
      category={category}
      siblings={flooringCategories.filter((c) => c.slug !== category.slug)}
      groupLabel="Flooring"
      groupHref="/flooring"
    />
  );
}
