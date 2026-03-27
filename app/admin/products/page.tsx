import { ProductAdminPage } from "@/components/admin/product-admin-page";
import { requireAdminSession } from "@/lib/admin-auth";
import { getCatalogCategories, listAdminProducts } from "@/lib/products";
import { isSupabaseAdminConfigured } from "@/lib/supabase/config";

export default async function AdminProductsPage() {
  await requireAdminSession();

  const [products, categories] = await Promise.all([
    listAdminProducts(),
    getCatalogCategories(),
  ]);

  return (
    <ProductAdminPage
      initialProducts={products}
      initialCategories={categories}
      supabaseConfigured={isSupabaseAdminConfigured()}
    />
  );
}
