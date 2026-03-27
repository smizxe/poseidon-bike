import { ProductCatalog } from "@/components/poseidon/product-catalog";
import { getCatalogCategories, getCatalogProducts } from "@/lib/products";

export default async function Products() {
  const [products, categories] = await Promise.all([
    getCatalogProducts(),
    getCatalogCategories(),
  ]);

  return <ProductCatalog products={products} categories={categories} />;
}
