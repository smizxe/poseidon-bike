"use client";

import * as React from "react";
import Image from "next/image";
import {
  Eye,
  ImagePlus,
  LayoutGrid,
  LoaderCircle,
  Plus,
  Save,
  FileText,
  Trash2,
  Upload,
  X,
} from "lucide-react";

import { CatalogProductCard } from "@/components/poseidon/catalog-product-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ProductCategorySummary, ProductInput, ProductRecord } from "@/lib/catalog-types";
import { createEmptyProduct, toCatalogProduct } from "@/lib/products";
import { cn } from "@/lib/utils";

type EditMode = "card" | "detail";

interface ProductAdminPageProps {
  initialProducts: ProductRecord[];
  initialCategories: ProductCategorySummary[];
  supabaseConfigured: boolean;
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function textareaClassName() {
  return "flex min-h-[120px] w-full rounded-2xl border border-input bg-background/70 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/20";
}

function sectionTitleClassName() {
  return "text-xs font-semibold tracking-[0.22em] text-primary uppercase";
}

export function ProductAdminPage({
  initialProducts,
  initialCategories,
  supabaseConfigured,
}: ProductAdminPageProps) {
  const [products, setProducts] = React.useState(initialProducts);
  const [selectedId, setSelectedId] = React.useState<string | "new">(
    initialProducts[0]?.id || "new",
  );
  const [draft, setDraft] = React.useState<ProductInput>(
    initialProducts[0] || createEmptyProduct(),
  );
  const [message, setMessage] = React.useState("");
  const [isSaving, setIsSaving] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [uploadingKey, setUploadingKey] = React.useState("");
  const [editMode, setEditMode] = React.useState<EditMode>("card");

  const isNew = selectedId === "new" || !draft.id;
  const previewProduct = toCatalogProduct({
    ...draft,
    detailTitle: draft.detailTitle || draft.name,
    detailDescription: draft.detailDescription || draft.cardDescription,
  });

  const categoryOptions = React.useMemo(() => {
    const seen = new Set<string>();
    const options = [
      ...initialCategories.map((item) => ({ slug: item.slug, label: item.name })),
      ...products.map((item) => ({ slug: item.categorySlug, label: item.categoryLabel })),
    ];

    return options.filter((item) => {
      const key = `${item.slug}:${item.label}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [initialCategories, products]);

  const applyDraft = React.useCallback((nextDraft: ProductInput) => {
    setDraft(nextDraft);
    setMessage("");
  }, []);

  const selectProduct = React.useCallback(
    (product: ProductRecord | null) => {
      if (!product) {
        setSelectedId("new");
        applyDraft(createEmptyProduct());
        return;
      }

      setSelectedId(product.id || "new");
      applyDraft({
        ...product,
        sharedImages: product.sharedImages || [],
      });
    },
    [applyDraft],
  );

  const updateDraftField = <Key extends keyof ProductInput>(key: Key, value: ProductInput[Key]) =>
    applyDraft({ ...draft, [key]: value });

  function updateColorAt(
    colorIndex: number,
    updater: (color: ProductInput["colors"][number]) => ProductInput["colors"][number],
  ) {
    const nextColors = [...draft.colors];
    nextColors[colorIndex] = updater(nextColors[colorIndex]);
    updateDraftField("colors", nextColors);
  }

  function updateSharedImageAt(
    imageIndex: number,
    updater: (
      image: ProductInput["sharedImages"][number],
    ) => ProductInput["sharedImages"][number],
  ) {
    const nextSharedImages = [...draft.sharedImages];
    nextSharedImages[imageIndex] = updater(nextSharedImages[imageIndex]);
    updateDraftField("sharedImages", nextSharedImages);
  }

  async function uploadAsset(file: File, folder: string) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || "Không thể upload ảnh.");
    }
    return payload.publicUrl as string;
  }

  async function handleFeatureUpload(file: File | null) {
    if (!file) return;
    setUploadingKey("feature");
    try {
      const url = await uploadAsset(file, `products/${draft.slug || "new-product"}/feature`);
      updateDraftField("featureImageUrl", url);
      setMessage("Đã upload ảnh feature.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Không thể upload ảnh feature.");
    } finally {
      setUploadingKey("");
    }
  }

  async function handleColorImageUpload(file: File | null, colorIndex: number, imageIndex: number) {
    if (!file) return;
    setUploadingKey(`color-${colorIndex}-${imageIndex}`);
    try {
      const color = draft.colors[colorIndex];
      const url = await uploadAsset(
        file,
        `products/${draft.slug || "new-product"}/colors/${color.slug || `color-${colorIndex + 1}`}`,
      );
      updateColorAt(colorIndex, (currentColor) => ({
        ...currentColor,
        images: [
          {
            imageUrl: url,
            altText:
              currentColor.images[0]?.altText ||
              `${draft.name || "Sản phẩm"} ${currentColor.name || "màu"}`,
            sortOrder: 10,
          },
        ],
      }));
      setMessage("Đã upload ảnh màu.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Không thể upload ảnh màu.");
    } finally {
      setUploadingKey("");
    }
  }

  async function handleSharedImageUpload(file: File | null, imageIndex: number) {
    if (!file) return;
    setUploadingKey(`shared-${imageIndex}`);
    try {
      const url = await uploadAsset(file, `products/${draft.slug || "new-product"}/gallery`);
      updateSharedImageAt(imageIndex, (currentImage) => ({
        ...currentImage,
        imageUrl: url,
      }));
      setMessage("Đã upload ảnh chung.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Không thể upload ảnh chung.");
    } finally {
      setUploadingKey("");
    }
  }

  async function saveProduct() {
    if (!supabaseConfigured) {
      setMessage("Supabase chưa được cấu hình. Hãy thêm env trước khi lưu.");
      return;
    }

    setIsSaving(true);
    setMessage("");
    try {
      const endpoint = isNew ? "/api/admin/products" : `/api/admin/products/${draft.id}`;
      const method = isNew ? "POST" : "PATCH";
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "Không thể lưu sản phẩm.");
      }

      const savedProduct = payload.product as ProductRecord;
      const nextProducts = [...products.filter((item) => item.id !== savedProduct.id), savedProduct].sort(
        (left, right) => left.sortOrder - right.sortOrder,
      );
      setProducts(nextProducts);
      setSelectedId(savedProduct.id || "new");
      setDraft(savedProduct);
      setMessage("Đã lưu sản phẩm.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Không thể lưu sản phẩm.");
    } finally {
      setIsSaving(false);
    }
  }

  async function deleteProduct() {
    if (!draft.id) {
      selectProduct(null);
      return;
    }

    if (!supabaseConfigured) {
      setMessage("Supabase chưa được cấu hình. Hãy thêm env trước khi xóa.");
      return;
    }

    setIsDeleting(true);
    setMessage("");
    try {
      const response = await fetch(`/api/admin/products/${draft.id}`, {
        method: "DELETE",
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "Không thể xóa sản phẩm.");
      }

      const nextProducts = products.filter((item) => item.id !== draft.id);
      setProducts(nextProducts);
      selectProduct(nextProducts[0] || null);
      setMessage("Đã xóa sản phẩm.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Không thể xóa sản phẩm.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="pb-20 pt-28 md:pt-32">
      <section className="section-shell space-y-8">
        {/* Header */}
        <div className="panel-dark overflow-hidden px-6 py-8 md:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="text-xs font-semibold tracking-[0.24em] text-sky-200 uppercase">
                Admin
              </div>
              <h1 className="font-heading text-3xl font-semibold tracking-tight md:text-5xl">
                Quản lý sản phẩm Poseidon
              </h1>
              <p className="max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
                Chỉnh card catalog, trang chi tiết, màu sắc, ảnh theo màu và thông số kỹ thuật trong
                một màn hình.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button type="button" variant="outline" className="rounded-full" onClick={() => selectProduct(null)}>
                <Plus className="size-4" />
                Sản phẩm mới
              </Button>
              <Button type="button" className="rounded-full" onClick={saveProduct} disabled={isSaving}>
                {isSaving ? <LoaderCircle className="size-4 animate-spin" /> : <Save className="size-4" />}
                Lưu sản phẩm
              </Button>
            </div>
          </div>
        </div>

        {!supabaseConfigured ? (
          <div className="rounded-[1.6rem] border border-amber-500/25 bg-amber-500/10 px-5 py-4 text-sm text-amber-100">
            Admin đang ở chế độ demo vì chưa cấu hình Supabase. Public site vẫn render được bằng dữ
            liệu fallback, nhưng CRUD và upload sẽ chỉ hoạt động sau khi bạn thêm env và chạy SQL trong
            thư mục `supabase/`.
          </div>
        ) : null}

        {message ? (
          <div className="rounded-[1.4rem] border border-border/70 bg-background/80 px-5 py-4 text-sm">
            {message}
          </div>
        ) : null}

        <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)_420px]">
          {/* Sidebar - Product list */}
          <Card className="panel h-fit py-0">
            <CardHeader>
              <CardTitle className="font-heading text-xl">Danh sách sản phẩm</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pb-5">
              <Button type="button" variant="outline" className="w-full rounded-full" onClick={() => selectProduct(null)}>
                <Plus className="size-4" />
                Tạo sản phẩm mới
              </Button>
              <div className="space-y-2">
                {products.map((product) => (
                  <button
                    key={product.id || product.slug}
                    type="button"
                    onClick={() => selectProduct(product)}
                    className={cn(
                      "w-full rounded-[1.35rem] border px-4 py-3 text-left transition-all",
                      selectedId === product.id
                        ? "border-primary bg-primary/10"
                        : "border-border/70 bg-background/70 hover:border-primary/35",
                    )}
                  >
                    <div className="font-medium">{product.name}</div>
                    <div className="mt-1 text-xs tracking-[0.18em] text-muted-foreground uppercase">
                      {product.categoryLabel}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Main editor */}
          <div className="space-y-6">
            {/* Mode toggle */}
            <div className="flex items-center gap-1 rounded-full border border-border/70 bg-background/70 p-1">
              <button
                type="button"
                onClick={() => setEditMode("card")}
                className={cn(
                  "inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all",
                  editMode === "card"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <LayoutGrid className="size-4" />
                Chỉnh sửa Card
              </button>
              <button
                type="button"
                onClick={() => setEditMode("detail")}
                className={cn(
                  "inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all",
                  editMode === "detail"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <FileText className="size-4" />
                Chỉnh sửa Chi tiết
              </button>
            </div>

            {/* Card editing mode */}
            {editMode === "card" ? (
              <Card className="panel py-0">
                <CardHeader>
                  <CardTitle className="font-heading text-xl">Card sản phẩm</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5 pb-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Tên sản phẩm">
                      <Input value={draft.name} onChange={(event) => updateDraftField("name", event.target.value)} />
                    </Field>
                    <Field label="Slug">
                      <div className="flex gap-2">
                        <Input value={draft.slug} onChange={(event) => updateDraftField("slug", slugify(event.target.value))} />
                        <Button type="button" variant="outline" onClick={() => updateDraftField("slug", slugify(draft.name))}>
                          Tạo
                        </Button>
                      </div>
                    </Field>
                    <Field label="Loại xe">
                      <Input list="category-label-options" value={draft.categoryLabel} onChange={(event) => updateDraftField("categoryLabel", event.target.value)} />
                      <datalist id="category-label-options">
                        {categoryOptions.map((option, index) => (
                          <option key={`label-${option.slug}-${option.label}-${index}`} value={option.label} />
                        ))}
                      </datalist>
                    </Field>
                    <Field label="Mã loại">
                      <Input list="category-slug-options" value={draft.categorySlug} onChange={(event) => updateDraftField("categorySlug", slugify(event.target.value))} />
                      <datalist id="category-slug-options">
                        {categoryOptions.map((option, index) => (
                          <option key={`slug-${option.slug}-${option.label}-${index}`} value={option.slug} />
                        ))}
                      </datalist>
                    </Field>
                    <Field label="Badge">
                      <Input value={draft.badge} onChange={(event) => updateDraftField("badge", event.target.value)} />
                    </Field>
                    <Field label="Sort order">
                      <Input type="number" value={draft.sortOrder} onChange={(event) => updateDraftField("sortOrder", Number(event.target.value))} />
                    </Field>
                    <Field label="Trọng lượng">
                      <Input value={draft.weight} onChange={(event) => updateDraftField("weight", event.target.value)} />
                    </Field>
                    <Field label="Kích cỡ bánh">
                      <Input value={draft.wheelSize} onChange={(event) => updateDraftField("wheelSize", event.target.value)} />
                    </Field>
                  </div>

                  <Field label="Mô tả card">
                    <textarea className={textareaClassName()} value={draft.cardDescription} onChange={(event) => updateDraftField("cardDescription", event.target.value)} />
                  </Field>

                  <Field label="Tóm tắt cuối card">
                    <Input value={draft.frameSummary} onChange={(event) => updateDraftField("frameSummary", event.target.value)} />
                  </Field>

                  {/* Feature image upload */}
                  <ImageUploadField
                    label="Ảnh feature card"
                    imageUrl={draft.featureImageUrl}
                    isUploading={uploadingKey === "feature"}
                    onUpload={(file) => handleFeatureUpload(file)}
                    onClear={() => updateDraftField("featureImageUrl", "")}
                  />

                  <ArrayEditor title="Tag pills" items={draft.cardTags} addLabel="Thêm tag" onChange={(items) => updateDraftField("cardTags", items)} />
                  <ArrayEditor title="Feature bullets" items={draft.cardHighlights} addLabel="Thêm bullet" onChange={(items) => updateDraftField("cardHighlights", items)} />
                </CardContent>
              </Card>
            ) : null}

            {/* Detail editing mode */}
            {editMode === "detail" ? (
              <Card className="panel py-0">
                <CardHeader>
                  <CardTitle className="font-heading text-xl">Trang chi tiết</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pb-6">
                  <Field label="Tiêu đề chi tiết">
                    <Input value={draft.detailTitle} onChange={(event) => updateDraftField("detailTitle", event.target.value)} />
                  </Field>
                  <Field label="Mô tả chi tiết">
                    <textarea className={textareaClassName()} value={draft.detailDescription} onChange={(event) => updateDraftField("detailDescription", event.target.value)} />
                  </Field>

                  <RepeaterSection
                    title="Thông số kỹ thuật"
                    subtitle="Dòng nào để trống sẽ không hiện ở trang chi tiết."
                    addLabel="Thêm thông số"
                    onAdd={() => updateDraftField("specifications", [...draft.specifications, { label: "", value: "", sortOrder: (draft.specifications.length + 1) * 10 }])}
                  >
                    {draft.specifications.map((specification, index) => (
                      <div key={`spec-${index}`} className="grid gap-3 rounded-[1.2rem] border border-border/70 bg-background/60 p-4 md:grid-cols-[0.8fr_1.2fr_auto]">
                        <Input value={specification.label} onChange={(event) => {
                          const next = [...draft.specifications];
                          next[index] = { ...specification, label: event.target.value };
                          updateDraftField("specifications", next);
                        }} placeholder="Khung" />
                        <Input value={specification.value} onChange={(event) => {
                          const next = [...draft.specifications];
                          next[index] = { ...specification, value: event.target.value };
                          updateDraftField("specifications", next);
                        }} placeholder="Magie đúc nguyên khối" />
                        <Button type="button" variant="ghost" size="icon" onClick={() => updateDraftField("specifications", draft.specifications.filter((_, itemIndex) => itemIndex !== index))}>
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    ))}
                  </RepeaterSection>

                  <RepeaterSection
                    title="Màu sắc và ảnh theo màu"
                    subtitle="Mỗi màu chỉ có một ảnh riêng. Khi khách chọn màu, ảnh đầu tiên sẽ đổi theo màu đó."
                    addLabel="Thêm màu"
                    onAdd={() => updateDraftField("colors", [...draft.colors, { name: "", slug: `mau-${draft.colors.length + 1}`, swatchHex: "#0f172a", isDefault: draft.colors.length === 0, sortOrder: (draft.colors.length + 1) * 10, images: [] }])}
                  >
                    {draft.colors.map((color, colorIndex) => (
                      <div key={`color-${colorIndex}`} className="space-y-4 rounded-[1.5rem] border border-border/70 bg-background/60 p-4">
                        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                          <div className="space-y-2">
                            <div className="text-xs font-medium text-muted-foreground">Tên màu</div>
                            <Input
                              value={color.name}
                              onChange={(event) => updateColorAt(colorIndex, (currentColor) => ({
                                ...currentColor,
                                name: event.target.value,
                              }))}
                              placeholder="Ví dụ: Trắng ngọc"
                            />
                          </div>
                          <div className="space-y-2">
                            <div className="text-xs font-medium text-muted-foreground">Slug màu</div>
                            <Input
                              value={color.slug}
                              onChange={(event) => updateColorAt(colorIndex, (currentColor) => ({
                                ...currentColor,
                                slug: slugify(event.target.value),
                              }))}
                              placeholder="trang-ngoc"
                            />
                          </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-[minmax(0,220px)_minmax(0,1fr)]">
                          <div className="space-y-2">
                            <div className="text-xs font-medium text-muted-foreground">Chọn màu</div>
                            <label className="flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl border border-input bg-background/70 px-4 py-3 transition-colors hover:border-primary/35 hover:bg-primary/5">
                              <span
                                className="size-10 shrink-0 rounded-xl border border-border/70 shadow-sm"
                                style={{ backgroundColor: color.swatchHex }}
                              />
                              <span className="text-sm font-medium text-foreground">Mở bảng màu</span>
                              <input
                                type="color"
                                value={color.swatchHex}
                                onChange={(event) =>
                                  updateColorAt(colorIndex, (currentColor) => ({
                                    ...currentColor,
                                    swatchHex: event.target.value,
                                  }))
                                }
                                className="sr-only"
                              />
                            </label>
                          </div>
                          <div className="space-y-2">
                            <div className="text-xs font-medium text-muted-foreground">Mã Hex</div>
                            <Input
                              value={color.swatchHex}
                              onChange={(event) => updateColorAt(colorIndex, (currentColor) => ({
                                ...currentColor,
                                swatchHex: event.target.value,
                              }))}
                              placeholder="#f5f5f4"
                            />
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/60 bg-background/45 px-4 py-3">
                          <label className="inline-flex items-center gap-2 text-sm font-medium">
                            <input
                              type="radio"
                              checked={color.isDefault}
                              onChange={() =>
                                updateDraftField(
                                  "colors",
                                  draft.colors.map((item, index) => ({
                                    ...item,
                                    isDefault: index === colorIndex,
                                  })),
                                )
                              }
                            />
                            Đặt làm màu mặc định
                          </label>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="rounded-full"
                            onClick={() =>
                              updateDraftField(
                                "colors",
                                draft.colors.filter((_, index) => index !== colorIndex),
                              )
                            }
                          >
                            <Trash2 className="size-4" />
                            Xóa màu
                          </Button>
                        </div>

                        <div className="space-y-3 rounded-[1.2rem] border border-border/70 bg-background/70 p-4">
                          <div className="flex items-start gap-3">
                            {color.images[0]?.imageUrl ? (
                              <div className="relative size-16 shrink-0 overflow-hidden rounded-xl border border-border/70">
                                <Image src={color.images[0].imageUrl} alt={color.images[0].altText || ""} fill className="object-cover" />
                              </div>
                            ) : null}
                            <div className="flex-1 space-y-2">
                              <Input
                                value={color.images[0]?.altText || ""}
                                onChange={(event) =>
                                  updateColorAt(colorIndex, (currentColor) => ({
                                    ...currentColor,
                                    images: [
                                      {
                                        imageUrl: currentColor.images[0]?.imageUrl || "",
                                        altText: event.target.value,
                                        sortOrder: 10,
                                      },
                                    ],
                                  }))
                                }
                                placeholder="Alt text ảnh màu"
                              />
                              <div className="flex gap-2">
                                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border/70 px-4 py-2 text-sm transition-colors hover:border-primary/35 hover:bg-primary/5">
                                  {uploadingKey === `color-${colorIndex}-0` ? <LoaderCircle className="size-4 animate-spin" /> : <Upload className="size-4" />}
                                  {color.images[0]?.imageUrl ? "Đổi ảnh màu" : "Upload ảnh màu"}
                                  <input type="file" accept="image/*" className="hidden" onChange={(event) => handleColorImageUpload(event.target.files?.[0] || null, colorIndex, 0)} />
                                </label>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() =>
                                    updateColorAt(colorIndex, (currentColor) => ({
                                      ...currentColor,
                                      images: [],
                                    }))
                                  }
                                >
                                  <Trash2 className="size-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </RepeaterSection>

                  <RepeaterSection
                    title="Ảnh chung"
                    subtitle="Ảnh thứ 2, 3, 4... dùng chung cho mọi màu. Khi đổi màu, khách sẽ quay về ảnh đầu tiên của màu đó."
                    addLabel="Thêm ảnh chung"
                    onAdd={() =>
                      updateDraftField("sharedImages", [
                        ...draft.sharedImages,
                        {
                          imageUrl: "",
                          altText: `${draft.name || "Sản phẩm"} - ảnh chung ${draft.sharedImages.length + 1}`,
                          sortOrder: (draft.sharedImages.length + 1) * 10,
                        },
                      ])
                    }
                  >
                    {draft.sharedImages.map((image, imageIndex) => (
                      <div key={`shared-image-${imageIndex}`} className="space-y-3 rounded-[1.2rem] border border-border/70 bg-background/70 p-4">
                        <div className="flex items-start gap-3">
                          {image.imageUrl ? (
                            <div className="relative size-16 shrink-0 overflow-hidden rounded-xl border border-border/70">
                              <Image src={image.imageUrl} alt={image.altText || ""} fill className="object-cover" />
                            </div>
                          ) : null}
                          <div className="flex-1 space-y-2">
                            <Input
                              value={image.altText}
                              onChange={(event) =>
                                updateSharedImageAt(imageIndex, (currentImage) => ({
                                  ...currentImage,
                                  altText: event.target.value,
                                }))
                              }
                              placeholder="Alt text ảnh chung"
                            />
                            <div className="flex gap-2">
                              <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border/70 px-4 py-2 text-sm transition-colors hover:border-primary/35 hover:bg-primary/5">
                                {uploadingKey === `shared-${imageIndex}` ? <LoaderCircle className="size-4 animate-spin" /> : <Upload className="size-4" />}
                                {image.imageUrl ? "Đổi ảnh chung" : "Upload ảnh chung"}
                                <input type="file" accept="image/*" className="hidden" onChange={(event) => handleSharedImageUpload(event.target.files?.[0] || null, imageIndex)} />
                              </label>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  updateDraftField(
                                    "sharedImages",
                                    draft.sharedImages.filter((_, index) => index !== imageIndex),
                                  )
                                }
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </RepeaterSection>

                  <div className="flex flex-wrap items-center justify-between gap-3 rounded-[1.4rem] border border-border/70 bg-background/60 p-4">
                    <label className="inline-flex items-center gap-3 text-sm font-medium">
                      <input type="checkbox" checked={draft.published} onChange={(event) => updateDraftField("published", event.target.checked)} />
                      Hiển thị công khai trên website
                    </label>

                    {!isNew ? (
                      <Button type="button" variant="destructive" className="rounded-full" onClick={deleteProduct} disabled={isDeleting}>
                        {isDeleting ? <LoaderCircle className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
                        Xóa sản phẩm
                      </Button>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            ) : null}
          </div>

          {/* Preview panel - changes based on mode */}
          <div className="space-y-6 xl:sticky xl:top-28 xl:self-start">
            {editMode === "card" ? (
              <Card className="panel py-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="font-heading text-xl">Preview card</CardTitle>
                  <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-xs text-muted-foreground">
                    <Eye className="size-3.5" />
                    Live preview
                  </div>
                </CardHeader>
                <CardContent className="pb-6">
                  <CatalogProductCard product={previewProduct} showAction actionLabel="Xem chi tiết" className="shadow-none" />
                </CardContent>
              </Card>
            ) : (
              <Card className="panel py-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="font-heading text-xl">Tóm tắt detail</CardTitle>
                  <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-xs text-muted-foreground">
                    <Eye className="size-3.5" />
                    Live preview
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 pb-6">
                  <div className="rounded-[1.4rem] border border-border/70 bg-background/70 p-4">
                    <div className="mb-2 text-xs tracking-[0.18em] text-primary uppercase">Tiêu đề</div>
                    <div className="font-heading text-2xl font-semibold">{draft.detailTitle || draft.name || "Chưa có tiêu đề"}</div>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {draft.detailDescription || "Mô tả chi tiết sẽ hiện ở đây."}
                    </p>
                  </div>

                  <div className="rounded-[1.4rem] border border-border/70 bg-background/70 p-4">
                    <div className="mb-3 text-xs tracking-[0.18em] text-primary uppercase">Màu sắc</div>
                    <div className="flex flex-wrap gap-2">
                      {draft.colors.length > 0 ? (
                        draft.colors.map((color) => (
                          <div key={color.slug} className="inline-flex items-center gap-2 rounded-full border border-border/70 px-3 py-2 text-sm">
                            <span className="size-4 rounded-full border border-white/70" style={{ backgroundColor: color.swatchHex }} />
                            {color.name || "Màu mới"}
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-muted-foreground">Chưa có màu nào.</div>
                      )}
                    </div>
                  </div>

                  <div className="rounded-[1.4rem] border border-border/70 bg-background/70 p-4">
                    <div className="mb-3 text-xs tracking-[0.18em] text-primary uppercase">Thông số kỹ thuật</div>
                    <div className="space-y-2">
                      {draft.specifications.filter((item) => item.label && item.value).length > 0 ? (
                        draft.specifications.filter((item) => item.label && item.value).slice(0, 6).map((item, index) => (
                          <div key={`${item.label}-${index}`} className="grid grid-cols-[110px_1fr] gap-3 text-sm">
                            <div className="font-medium">{item.label}</div>
                            <div className="text-muted-foreground">{item.value}</div>
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-muted-foreground">Chưa có thông số kỹ thuật.</div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── Image upload field ─── */

function ImageUploadField({
  label,
  imageUrl,
  isUploading,
  onUpload,
  onClear,
}: {
  label: string;
  imageUrl: string;
  isUploading: boolean;
  onUpload: (file: File) => void;
  onClear: () => void;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  function handleDrop(event: React.DragEvent) {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      onUpload(file);
    }
  }

  return (
    <div className="space-y-3 rounded-[1.4rem] border border-border/70 bg-background/60 p-4">
      <div className={sectionTitleClassName()}>{label}</div>

      {imageUrl ? (
        <div className="relative inline-block">
          <div className="relative h-40 w-64 overflow-hidden rounded-xl border border-border/70">
            <Image src={imageUrl} alt="Feature image" fill className="object-cover" />
          </div>
          <button
            type="button"
            onClick={onClear}
            className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-sm transition-colors hover:bg-destructive/90"
          >
            <X className="size-3.5" />
          </button>
        </div>
      ) : null}

      <div
        onDragOver={(event) => { event.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "flex cursor-pointer flex-col items-center gap-3 rounded-2xl border-2 border-dashed px-6 py-8 text-center transition-colors",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border/70 hover:border-primary/35 hover:bg-primary/5",
        )}
        onClick={() => inputRef.current?.click()}
      >
        {isUploading ? (
          <LoaderCircle className="size-8 animate-spin text-primary" />
        ) : (
          <ImagePlus className="size-8 text-muted-foreground" />
        )}
        <div>
          <p className="text-sm font-medium">
            {isUploading ? "Đang upload..." : imageUrl ? "Kéo thả để đổi ảnh" : "Kéo thả ảnh vào đây"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            hoặc nhấn để chọn file
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) onUpload(file);
            event.target.value = "";
          }}
        />
      </div>
    </div>
  );
}

/* ─── Shared small components ─── */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}

function RepeaterSection({
  title,
  subtitle,
  addLabel,
  onAdd,
  children,
}: {
  title: string;
  subtitle?: string;
  addLabel: string;
  onAdd: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4 rounded-[1.5rem] border border-border/70 bg-background/60 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className={sectionTitleClassName()}>{title}</div>
          {subtitle ? <div className="mt-1 text-sm text-muted-foreground">{subtitle}</div> : null}
        </div>
        <Button type="button" variant="outline" className="rounded-full" onClick={onAdd}>
          <Plus className="size-4" />
          {addLabel}
        </Button>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function ArrayEditor({
  title,
  items,
  onChange,
  addLabel,
}: {
  title: string;
  items: string[];
  onChange: (items: string[]) => void;
  addLabel: string;
}) {
  return (
    <RepeaterSection title={title} addLabel={addLabel} onAdd={() => onChange([...items, ""])}>
      {items.map((item, index) => (
        <div key={`${title}-${index}`} className="flex gap-3">
          <Input
            value={item}
            onChange={(event) =>
              onChange(items.map((currentItem, currentIndex) => (currentIndex === index ? event.target.value : currentItem)))
            }
            placeholder="Nhập nội dung"
          />
          <Button type="button" variant="ghost" size="icon" onClick={() => onChange(items.filter((_, currentIndex) => currentIndex !== index))}>
            <Trash2 className="size-4" />
          </Button>
        </div>
      ))}
    </RepeaterSection>
  );
}
