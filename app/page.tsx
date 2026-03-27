import { HomePage } from "@/components/poseidon/home-page";
import { getCatalogCategories, getFeaturedProducts, getProducts } from "@/lib/products";

export default async function Home() {
  const [featuredProducts, categorySummaries, products] = await Promise.all([
    getFeaturedProducts(),
    getCatalogCategories(),
    getProducts(),
  ]);

  return (
    <HomePage
      featuredProducts={featuredProducts}
      categorySummaries={categorySummaries}
      productCount={products.length}
    />
  );
}
