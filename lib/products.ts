import { categories as legacyCategories, products as legacyProducts } from "@/lib/site-data";
import {
  CatalogProduct,
  ProductCategorySummary,
  ProductColor,
  ProductColorImage,
  ProductInput,
  ProductRecord,
  ProductSpecification,
} from "@/lib/catalog-types";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseAdminConfigured, isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabasePublicClient } from "@/lib/supabase/public";

const PRODUCT_SELECT = `
  id,
  slug,
  name,
  category_slug,
  category_label,
  badge,
  card_description,
  detail_title,
  detail_description,
  feature_image_url,
  card_tags,
  card_highlights,
  weight,
  wheel_size,
  frame_summary,
  published,
  sort_order,
  created_at,
  updated_at,
  product_specifications (
    id,
    label,
    value,
    sort_order
  ),
  product_colors (
    id,
    name,
    slug,
    swatch_hex,
    is_default,
    sort_order,
    product_color_images (
      id,
      image_url,
      alt_text,
      sort_order
    )
  )
`;

const CATEGORY_META = legacyCategories.reduce<Record<string, Omit<ProductCategorySummary, "count">>>(
  (accumulator, category) => {
    accumulator[category.slug] = {
      slug: category.slug,
      name: category.name,
      shortLabel: category.shortLabel,
      description: category.description,
      image: category.image,
    };
    return accumulator;
  },
  {},
);

type ProductSpecificationRow = {
  id?: string;
  label?: string;
  value?: string;
  sort_order?: number;
};

type ProductColorImageRow = {
  id?: string;
  image_url?: string;
  alt_text?: string;
  sort_order?: number;
};

type ProductColorRow = {
  id?: string;
  name?: string;
  slug?: string;
  swatch_hex?: string;
  is_default?: boolean;
  sort_order?: number;
  product_color_images?: ProductColorImageRow[] | null;
};

type ProductRow = {
  id?: string;
  slug?: string;
  name?: string;
  category_slug?: string;
  category_label?: string;
  badge?: string;
  card_description?: string;
  detail_title?: string;
  detail_description?: string;
  feature_image_url?: string;
  card_tags?: unknown;
  card_highlights?: unknown;
  weight?: string;
  wheel_size?: string;
  frame_summary?: string;
  published?: boolean;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
  product_specifications?: ProductSpecificationRow[] | null;
  product_colors?: ProductColorRow[] | null;
};

function normalizeTextArray(items: unknown): string[] {
  if (!Array.isArray(items)) return [];
  return items
    .map((item) => String(item || "").trim())
    .filter(Boolean);
}

function normalizeSpecifications(
  items: ProductSpecificationRow[] | null | undefined,
): ProductSpecification[] {
  if (!Array.isArray(items)) return [];

  return items
    .map((item, index) => ({
      id: item.id,
      label: String(item.label || "").trim(),
      value: String(item.value || "").trim(),
      sortOrder: Number(item.sort_order ?? index),
    }))
    .filter((item) => item.label && item.value)
    .sort((left, right) => left.sortOrder - right.sortOrder);
}

function normalizeColorImages(items: ProductColorImageRow[] | null | undefined): ProductColorImage[] {
  if (!Array.isArray(items)) return [];

  return items
    .map((image, imageIndex) => ({
      id: image.id,
      imageUrl: String(image.image_url || "").trim(),
      altText: String(image.alt_text || "").trim(),
      sortOrder: Number(image.sort_order ?? imageIndex),
    }))
    .filter((image) => image.imageUrl)
    .sort((left, right) => left.sortOrder - right.sortOrder);
}

function normalizeColors(items: ProductColorRow[] | null | undefined): ProductColor[] {
  if (!Array.isArray(items)) return [];

  return items
    .map((item, index) => ({
      id: item.id,
      name: String(item.name || "").trim(),
      slug: String(item.slug || "").trim(),
      swatchHex: String(item.swatch_hex || "#0f172a"),
      isDefault: Boolean(item.is_default),
      sortOrder: Number(item.sort_order ?? index),
      images: normalizeColorImages(item.product_color_images),
    }))
    .filter((color) => color.name && color.slug)
    .sort((left, right) => left.sortOrder - right.sortOrder);
}

function normalizeSharedImages(colors: ProductColor[]) {
  const sourceColor = colors.find((color) => color.isDefault) || colors[0];
  return (sourceColor?.images || []).slice(1).map((image, index) => ({
    ...image,
    sortOrder: (index + 1) * 10,
  }));
}

function normalizeProduct(row: ProductRow): ProductRecord {
  const colors = normalizeColors(row.product_colors);
  const sharedImages = normalizeSharedImages(colors);

  return {
    id: row.id,
    slug: String(row.slug || "").trim(),
    name: String(row.name || "").trim(),
    categorySlug: String(row.category_slug || "").trim(),
    categoryLabel: String(row.category_label || "").trim(),
    badge: String(row.badge || "").trim(),
    cardDescription: String(row.card_description || "").trim(),
    detailTitle: String(row.detail_title || row.name || "").trim(),
    detailDescription: String(row.detail_description || row.card_description || "").trim(),
    featureImageUrl: String(row.feature_image_url || "").trim(),
    cardTags: normalizeTextArray(row.card_tags),
    cardHighlights: normalizeTextArray(row.card_highlights),
    weight: String(row.weight || "").trim(),
    wheelSize: String(row.wheel_size || "").trim(),
    frameSummary: String(row.frame_summary || "").trim(),
    published: row.published !== false,
    sortOrder: Number(row.sort_order ?? 0),
    specifications: normalizeSpecifications(row.product_specifications),
    colors: colors.map((color) => ({
      ...color,
      images: color.images.slice(0, 1).map((image) => ({
        ...image,
        sortOrder: 10,
      })),
    })),
    sharedImages,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function fallbackColorHex(categorySlug: string) {
  switch (categorySlug) {
    case "fold":
      return "#d6dee8";
    case "mtb":
      return "#0f172a";
    case "touring":
      return "#1f2937";
    case "road":
      return "#1d4ed8";
    default:
      return "#0f172a";
  }
}

function fallbackProducts(): ProductRecord[] {
  return legacyProducts.map((product, index) => ({
    slug: product.slug,
    name: product.name,
    categorySlug: product.category,
    categoryLabel: product.categoryLabel,
    badge: product.badge,
    cardDescription: product.tagline,
    detailTitle: product.name,
    detailDescription: product.tagline,
    featureImageUrl: product.image,
    cardTags: product.specs,
    cardHighlights: product.highlights,
    weight: product.weight,
    wheelSize: product.wheelSize,
    frameSummary: `${product.frame} · ${product.wheelSize}`,
    published: true,
    sortOrder: (index + 1) * 10,
    specifications: [
      { label: "Khung", value: product.frame, sortOrder: 10 },
      { label: "Bo truyen dong", value: product.groupset, sortOrder: 20 },
      { label: "Phanh", value: product.brake, sortOrder: 30 },
      { label: "Banh", value: product.wheelSize, sortOrder: 40 },
      { label: "Trong luong", value: product.weight, sortOrder: 50 },
    ].filter((item) => item.value),
    colors: [
      {
        name: "Mac dinh",
        slug: "mac-dinh",
        swatchHex: fallbackColorHex(product.category),
        isDefault: true,
        sortOrder: 10,
        images: product.gallery[0]
          ? [
              {
                imageUrl: product.gallery[0],
                altText: `${product.name} - anh mau`,
                sortOrder: 10,
              },
            ]
          : [],
      },
    ],
    sharedImages: product.gallery.slice(1).map((image, imageIndex) => ({
      imageUrl: image,
      altText: `${product.name} - hinh ${imageIndex + 2}`,
      sortOrder: (imageIndex + 1) * 10,
    })),
  }));
}

function sortProducts(products: ProductRecord[]) {
  return [...products].sort((left, right) => left.sortOrder - right.sortOrder);
}

function mergeProducts(primary: ProductRecord[], fallback: ProductRecord[]) {
  const bySlug = new Map<string, ProductRecord>();

  for (const product of fallback) {
    bySlug.set(product.slug, product);
  }

  for (const product of primary) {
    bySlug.set(product.slug, product);
  }

  return sortProducts([...bySlug.values()]);
}

export function toCatalogProduct(product: ProductRecord): CatalogProduct {
  const defaultColor = product.colors.find((color) => color.isDefault) || product.colors[0];
  const defaultImage = defaultColor?.images[0]?.imageUrl || product.featureImageUrl;

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    categorySlug: product.categorySlug,
    categoryLabel: product.categoryLabel,
    badge: product.badge,
    image: defaultImage || product.featureImageUrl,
    tagline: product.cardDescription,
    tags: product.cardTags,
    highlights: product.cardHighlights,
    weight: product.weight,
    wheelSize: product.wheelSize,
    frameSummary: product.frameSummary,
  };
}

export function buildCategorySummaries(products: ProductRecord[]): ProductCategorySummary[] {
  const counts = products.reduce<Record<string, number>>((accumulator, product) => {
    accumulator[product.categorySlug] = (accumulator[product.categorySlug] || 0) + 1;
    return accumulator;
  }, {});

  return Object.entries(counts)
    .map(([slug, count]) => {
      const firstProduct = products.find((product) => product.categorySlug === slug);
      const meta = CATEGORY_META[slug];

      return {
        slug,
        name: meta?.name || firstProduct?.categoryLabel || slug,
        shortLabel: meta?.shortLabel || firstProduct?.categoryLabel || slug,
        description:
          meta?.description ||
          firstProduct?.cardDescription ||
          "Danh muc duoc quan ly truc tiep tu Supabase.",
        image:
          meta?.image ||
          firstProduct?.featureImageUrl ||
          firstProduct?.colors[0]?.images[0]?.imageUrl ||
          "/brand/poseidon-hero-bike-png.png",
        count,
      };
    })
    .sort((left, right) => left.name.localeCompare(right.name, "vi"));
}

async function fetchSupabaseProducts(options?: { includeDrafts?: boolean }) {
  const supabase =
    options?.includeDrafts && isSupabaseAdminConfigured()
      ? createSupabaseAdminClient()
      : createSupabasePublicClient();
  if (!supabase) {
    return null;
  }

  let query = supabase.from("products").select(PRODUCT_SELECT).order("sort_order");
  if (!options?.includeDrafts) {
    query = query.eq("published", true);
  }

  const { data, error } = await query;
  if (error) {
    throw new Error(error.message);
  }

  return sortProducts((data || []).map(normalizeProduct));
}

export async function getProducts(options?: { includeDrafts?: boolean }) {
  const fallback = sortProducts(fallbackProducts()).filter(
    (product) => options?.includeDrafts || product.published,
  );

  if (!isSupabaseConfigured()) {
    return fallback;
  }

  try {
    const products = await fetchSupabaseProducts(options);
    return products ? mergeProducts(products, fallback) : fallback;
  } catch {
    return fallback;
  }
}

export async function getCatalogProducts() {
  return (await getProducts()).map(toCatalogProduct);
}

export async function getCatalogCategories() {
  return buildCategorySummaries(await getProducts());
}

export async function getProductBySlug(slug: string) {
  const products = await getProducts({ includeDrafts: true });
  return products.find((product) => product.slug === slug) || null;
}

export async function getFeaturedProducts(limit = 6) {
  return (await getProducts()).slice(0, limit).map(toCatalogProduct);
}

export function createEmptyProduct(): ProductInput {
  return {
    slug: "",
    name: "",
    categorySlug: "road",
    categoryLabel: "Road",
    badge: "",
    cardDescription: "",
    detailTitle: "",
    detailDescription: "",
    featureImageUrl: "",
    cardTags: [],
    cardHighlights: [],
    weight: "",
    wheelSize: "",
    frameSummary: "",
    published: true,
    sortOrder: 999,
    specifications: [],
    sharedImages: [],
    colors: [
      {
        name: "Mac dinh",
        slug: "mac-dinh",
        swatchHex: "#0f172a",
        isDefault: true,
        sortOrder: 10,
        images: [],
      },
    ],
  };
}

function sanitizeProductInput(input: ProductInput): ProductInput {
  const colors = (input.colors || [])
    .map((color, colorIndex) => ({
      ...color,
      name: color.name.trim(),
      slug: color.slug.trim() || `mau-${colorIndex + 1}`,
      swatchHex: color.swatchHex.trim() || "#0f172a",
      sortOrder: color.sortOrder || (colorIndex + 1) * 10,
      images: (color.images || [])
        .map((image, imageIndex) => ({
          ...image,
          imageUrl: image.imageUrl.trim(),
          altText: image.altText.trim(),
          sortOrder: image.sortOrder || (imageIndex + 1) * 10,
        }))
        .filter((image) => image.imageUrl)
        .slice(0, 1)
        .map((image) => ({
          ...image,
          sortOrder: 10,
        })),
    }))
    .filter((color) => color.name);

  const hasDefaultColor = colors.some((color) => color.isDefault);
  const normalizedColors = colors.map((color, index) => ({
    ...color,
    isDefault: hasDefaultColor ? color.isDefault : index === 0,
  }));

  return {
    ...input,
    slug: input.slug.trim(),
    name: input.name.trim(),
    categorySlug: input.categorySlug.trim(),
    categoryLabel: input.categoryLabel.trim(),
    badge: input.badge.trim(),
    cardDescription: input.cardDescription.trim(),
    detailTitle: (input.detailTitle || input.name).trim(),
    detailDescription: (input.detailDescription || input.cardDescription).trim(),
    featureImageUrl: input.featureImageUrl.trim(),
    cardTags: normalizeTextArray(input.cardTags),
    cardHighlights: normalizeTextArray(input.cardHighlights),
    weight: input.weight.trim(),
    wheelSize: input.wheelSize.trim(),
    frameSummary: input.frameSummary.trim(),
    sortOrder: Number(input.sortOrder || 0),
    specifications: (input.specifications || [])
      .map((specification, index) => ({
        ...specification,
        label: specification.label.trim(),
        value: specification.value.trim(),
        sortOrder: specification.sortOrder || (index + 1) * 10,
      }))
      .filter((specification) => specification.label && specification.value),
    sharedImages: (input.sharedImages || [])
      .map((image, index) => ({
        ...image,
        imageUrl: image.imageUrl.trim(),
        altText: image.altText.trim(),
        sortOrder: image.sortOrder || (index + 1) * 10,
      }))
      .filter((image) => image.imageUrl),
    colors: normalizedColors,
  };
}

export async function listAdminProducts() {
  return getProducts({ includeDrafts: true });
}

export async function saveAdminProduct(input: ProductInput, id?: string) {
  if (!isSupabaseAdminConfigured()) {
    throw new Error("Supabase chua duoc cau hinh. Hay them env truoc khi luu.");
  }

  const payload = sanitizeProductInput(input);
  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    throw new Error("Khong the khoi tao Supabase admin client.");
  }

  const productPayload = {
    slug: payload.slug,
    name: payload.name,
    category_slug: payload.categorySlug,
    category_label: payload.categoryLabel,
    badge: payload.badge,
    card_description: payload.cardDescription,
    detail_title: payload.detailTitle,
    detail_description: payload.detailDescription,
    feature_image_url: payload.featureImageUrl,
    card_tags: payload.cardTags,
    card_highlights: payload.cardHighlights,
    weight: payload.weight,
    wheel_size: payload.wheelSize,
    frame_summary: payload.frameSummary,
    published: payload.published,
    sort_order: payload.sortOrder,
  };

  const productQuery = id
    ? supabase.from("products").update(productPayload).eq("id", id).select("id").single()
    : supabase.from("products").insert(productPayload).select("id").single();

  const { data: savedProduct, error: productError } = await productQuery;
  if (productError || !savedProduct?.id) {
    throw new Error(productError?.message || "Khong the luu san pham.");
  }

  const productId = savedProduct.id;

  const { error: deleteSpecsError } = await supabase
    .from("product_specifications")
    .delete()
    .eq("product_id", productId);
  if (deleteSpecsError) {
    throw new Error(deleteSpecsError.message);
  }

  const { error: deleteColorsError } = await supabase
    .from("product_colors")
    .delete()
    .eq("product_id", productId);
  if (deleteColorsError) {
    throw new Error(deleteColorsError.message);
  }

  if (payload.specifications.length > 0) {
    const { error: specificationError } = await supabase.from("product_specifications").insert(
      payload.specifications.map((specification) => ({
        product_id: productId,
        label: specification.label,
        value: specification.value,
        sort_order: specification.sortOrder,
      })),
    );
    if (specificationError) {
      throw new Error(specificationError.message);
    }
  }

  for (const color of payload.colors) {
    const { data: savedColor, error: colorError } = await supabase
      .from("product_colors")
      .insert({
        product_id: productId,
        name: color.name,
        slug: color.slug,
        swatch_hex: color.swatchHex,
        is_default: color.isDefault,
        sort_order: color.sortOrder,
      })
      .select("id")
      .single();

    if (colorError || !savedColor?.id) {
      throw new Error(colorError?.message || `Khong the luu mau ${color.name}.`);
    }

    const combinedImages = [
      ...(color.images[0]
        ? [
            {
              ...color.images[0],
              sortOrder: 10,
            },
          ]
        : []),
      ...payload.sharedImages.map((image, index) => ({
        ...image,
        sortOrder: (index + 2) * 10,
      })),
    ].filter(
      (image, index, items) =>
        items.findIndex((candidate) => candidate.imageUrl === image.imageUrl) === index,
    );

    if (combinedImages.length > 0) {
      const { error: imageError } = await supabase.from("product_color_images").insert(
        combinedImages.map((image) => ({
          product_color_id: savedColor.id,
          image_url: image.imageUrl,
          alt_text: image.altText,
          sort_order: image.sortOrder,
        })),
      );
      if (imageError) {
        throw new Error(imageError.message);
      }
    }
  }

  const product = await getProductBySlug(payload.slug);
  if (!product) {
    throw new Error("Da luu nhung khong doc lai duoc san pham.");
  }

  return product;
}

export async function deleteAdminProduct(id: string) {
  if (!isSupabaseAdminConfigured()) {
    throw new Error("Supabase chua duoc cau hinh. Hay them env truoc khi xoa.");
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    throw new Error("Khong the khoi tao Supabase admin client.");
  }

  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }

  return { success: true };
}
