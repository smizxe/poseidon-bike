export interface ProductSpecification {
  id?: string;
  label: string;
  value: string;
  sortOrder: number;
}

export interface ProductColorImage {
  id?: string;
  imageUrl: string;
  altText: string;
  sortOrder: number;
}

export interface ProductColor {
  id?: string;
  name: string;
  slug: string;
  swatchHex: string;
  isDefault: boolean;
  sortOrder: number;
  images: ProductColorImage[];
}

export interface ProductRecord {
  id?: string;
  slug: string;
  name: string;
  categorySlug: string;
  categoryLabel: string;
  badge: string;
  cardDescription: string;
  detailTitle: string;
  detailDescription: string;
  featureImageUrl: string;
  cardTags: string[];
  cardHighlights: string[];
  weight: string;
  wheelSize: string;
  frameSummary: string;
  published: boolean;
  sortOrder: number;
  specifications: ProductSpecification[];
  colors: ProductColor[];
  sharedImages: ProductColorImage[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductCategorySummary {
  slug: string;
  name: string;
  shortLabel: string;
  description: string;
  image: string;
  count: number;
}

export interface CatalogProduct {
  id?: string;
  slug: string;
  name: string;
  categorySlug: string;
  categoryLabel: string;
  badge: string;
  image: string;
  tagline: string;
  tags: string[];
  highlights: string[];
  weight: string;
  wheelSize: string;
  frameSummary: string;
}

export type ProductInput = ProductRecord;
