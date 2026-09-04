import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryPage } from "@/components/domain/CategoryPage";
import { furnitureCategories, getCategory } from "@/content/categories";
import { buildMetadata } from "@/lib/seo";

type Params = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return furnitureCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory("furniture", slug);
  if (!category) return {};

  return buildMetadata({
    title: category.metaTitle,
    description: category.metaDescription,
    path: `/furniture/${category.slug}`,
  });
}

export default async function FurnitureCategoryPage({ params }: Params) {
  const { category: slug } = await params;
  const category = getCategory("furniture", slug);
  if (!category) notFound();

  return (
    <CategoryPage
      category={category}
      siblings={furnitureCategories.filter((c) => c.slug !== category.slug)}
      groupLabel="Furniture"
      groupHref="/furniture"
    />
  );
}
