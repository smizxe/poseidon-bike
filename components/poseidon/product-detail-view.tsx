"use client";

import * as React from "react";
import Image from "next/image";

import { ProductRecord } from "@/lib/catalog-types";
import { cn } from "@/lib/utils";

interface ProductDetailViewProps {
  product: ProductRecord;
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const defaultColorIndex = Math.max(
    0,
    product.colors.findIndex((color) => color.isDefault),
  );
  const [selectedColorIndex, setSelectedColorIndex] = React.useState(defaultColorIndex);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);

  const selectedColor = product.colors[selectedColorIndex] || product.colors[0];
  const gallery = React.useMemo(
    () =>
      [selectedColor?.images[0], ...product.sharedImages]
        .filter((image): image is NonNullable<typeof image> => Boolean(image?.imageUrl))
        .filter(
          (image, index, items) =>
            items.findIndex((candidate) => candidate.imageUrl === image.imageUrl) === index,
        ),
    [product.sharedImages, selectedColor],
  );
  const selectedImage = gallery[selectedImageIndex] || gallery[0];
  const visibleSpecs = product.specifications.filter((specification) => specification.value);

  React.useEffect(() => {
    setSelectedImageIndex(0);
  }, [selectedColorIndex]);

  return (
    <div className="pb-20 pt-28 md:pt-32">
      <section className="section-shell">
        <div className="panel px-6 py-8 md:px-10 md:py-10">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-4">
              <div className="relative aspect-[1.08/0.82] overflow-hidden rounded-[2rem] border border-border/60 bg-background/85">
                {selectedImage ? (
                  <Image
                    src={selectedImage.imageUrl}
                    alt={selectedImage.altText || product.name}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    Chưa có ảnh cho màu này
                  </div>
                )}
              </div>

              {gallery.length > 0 ? (
                <div className="grid grid-cols-4 gap-3 md:grid-cols-5">
                  {gallery.map((image, index) => (
                    <button
                      key={`${image.imageUrl}-${index}`}
                      type="button"
                      onClick={() => setSelectedImageIndex(index)}
                      className={cn(
                        "relative aspect-[1.05/0.78] overflow-hidden rounded-2xl border bg-background transition-all",
                        index === selectedImageIndex
                          ? "border-primary shadow-[0_14px_30px_-18px_rgba(56,189,248,0.6)]"
                          : "border-border/70 hover:border-primary/35",
                      )}
                    >
                      <Image
                        src={image.imageUrl}
                        alt={image.altText || `${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="160px"
                      />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="text-sm tracking-[0.18em] text-primary uppercase">
                  {product.categoryLabel}
                </div>
                <h1 className="font-heading text-4xl font-semibold tracking-tight md:text-5xl">
                  {product.detailTitle || product.name}
                </h1>
                <p className="text-base leading-8 text-muted-foreground md:text-lg">
                  {product.detailDescription}
                </p>
              </div>

              {product.colors.length > 0 ? (
                <div className="space-y-3">
                  <div className="text-sm font-medium text-foreground">Màu sắc</div>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color, index) => (
                      <button
                        key={color.slug}
                        type="button"
                        onClick={() => setSelectedColorIndex(index)}
                        className={cn(
                          "flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition-all",
                          index === selectedColorIndex
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border/70 bg-background/70 text-muted-foreground hover:border-primary/35",
                        )}
                      >
                        <span
                          className="size-4 rounded-full border border-white/70 shadow-sm"
                          style={{ backgroundColor: color.swatchHex }}
                        />
                        {color.name}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="grid gap-4 sm:grid-cols-3">
                {product.weight ? (
                  <div className="rounded-[1.5rem] border border-border/70 bg-background/70 p-4">
                    <div className="mb-1 text-xs tracking-[0.18em] text-primary uppercase">
                      Trọng lượng
                    </div>
                    <div className="font-medium">{product.weight}</div>
                  </div>
                ) : null}
                {product.wheelSize ? (
                  <div className="rounded-[1.5rem] border border-border/70 bg-background/70 p-4">
                    <div className="mb-1 text-xs tracking-[0.18em] text-primary uppercase">
                      Bánh xe
                    </div>
                    <div className="font-medium">{product.wheelSize}</div>
                  </div>
                ) : null}
                {product.frameSummary ? (
                  <div className="rounded-[1.5rem] border border-border/70 bg-background/70 p-4">
                    <div className="mb-1 text-xs tracking-[0.18em] text-primary uppercase">
                      Tóm tắt
                    </div>
                    <div className="font-medium">{product.frameSummary}</div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      {visibleSpecs.length > 0 ? (
        <section className="section-shell py-16">
          <div className="panel overflow-hidden py-0">
            <div className="border-b border-border/60 px-6 py-5 md:px-8">
              <div className="w-fit rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                Thông số kỹ thuật
              </div>
            </div>
            <div className="divide-y divide-border/60">
              {visibleSpecs.map((specification) => (
                <div
                  key={specification.label}
                  className="grid gap-2 px-6 py-4 md:grid-cols-[220px_1fr] md:px-8"
                >
                  <div className="font-medium text-foreground">{specification.label}</div>
                  <div className="text-muted-foreground">{specification.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
