import { notFound } from "next/navigation";

import { ProductDetailView } from "@/components/poseidon/product-detail-view";
import { getProductBySlug } from "@/lib/products";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product || !product.published) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}
