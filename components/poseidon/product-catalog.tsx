"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bike,
  CircleHelp,
  Filter,
  Search,
  Store,
  Waves,
} from "lucide-react";

import { Reveal } from "@/components/reveal";
import { WaveAnimation } from "@/components/ui/wave-animation-1";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { categories, products } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const defaultValue = "Tất cả";

export function ProductCatalog() {
  const [search, setSearch] = React.useState("");
  const [category, setCategory] = React.useState(defaultValue);

  const normalizedSearch = search.trim().toLowerCase();

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      normalizedSearch.length === 0 ||
      product.name.toLowerCase().includes(normalizedSearch) ||
      product.tagline.toLowerCase().includes(normalizedSearch);
    const matchesCategory = category === defaultValue || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pb-20 pt-28 md:pt-32">
      <section className="section-shell">
        <div className="panel-dark relative overflow-hidden px-6 py-8 md:px-10 md:py-10">
          <div className="absolute inset-0 ocean-grid opacity-20" />
          <div className="absolute inset-x-0 bottom-0 h-[58%] opacity-65">
            <WaveAnimation
              className="w-full"
              height={460}
              waveSpeed={2}
              waveIntensity={40}
              particleColor="#38bdf8"
              pointSize={1.5}
              gridDistance={3}
            />
          </div>

          <div className="relative space-y-6">
            <Reveal variant="soft">
              <div className="glass-pill w-fit">Trang sản phẩm</div>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="font-heading text-4xl leading-tight font-semibold tracking-tight md:text-6xl">
                Bộ sưu tập xe đạp Poseidon
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                Từ xe gấp đô thị gọn nhẹ, MTB chinh phục địa hình đến road tốc độ cao,
                tất cả đều mang tinh thần đại dương mạnh mẽ và rõ cá tính.
              </p>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-3">
              <Reveal variant="soft" delay={220}>
                <div className="rounded-[1.7rem] border border-white/10 bg-white/6 p-4">
                  <div className="mb-1 text-xs tracking-[0.18em] text-sky-200 uppercase">
                    Danh mục
                  </div>
                  <div className="font-heading text-3xl font-semibold">{categories.length}</div>
                </div>
              </Reveal>
              <Reveal variant="soft" delay={300}>
                <div className="rounded-[1.7rem] border border-white/10 bg-white/6 p-4">
                  <div className="mb-1 text-xs tracking-[0.18em] text-sky-200 uppercase">
                    Mẫu xe
                  </div>
                  <div className="font-heading text-3xl font-semibold">{products.length}</div>
                </div>
              </Reveal>
              <Reveal variant="soft" delay={380}>
                <div className="rounded-[1.7rem] border border-white/10 bg-white/6 p-4">
                  <div className="mb-1 text-xs tracking-[0.18em] text-sky-200 uppercase">
                    Hỗ trợ
                  </div>
                  <div className="font-heading text-3xl font-semibold">24/7</div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <Reveal variant="soft">
              <Card className="panel py-0">
                <CardContent className="space-y-5 p-5">
                  <div className="flex items-center gap-2">
                    <Filter className="size-4 text-primary" />
                    <div className="font-heading text-lg font-semibold">Bộ lọc xe đạp</div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="catalog-search"
                      className="text-sm font-medium text-foreground"
                    >
                      Tìm theo tên xe
                    </label>
                    <div className="relative">
                      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="catalog-search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Ví dụ: PS700, PS101..."
                        className="h-11 rounded-full bg-background/70 pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Danh mục</label>
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => setCategory(defaultValue)}
                        className={cn(
                          "w-full rounded-full border px-4 py-2.5 text-left text-sm transition-colors",
                          category === defaultValue
                            ? "border-primary bg-primary/10 font-medium text-primary"
                            : "border-border/60 bg-background/70 text-muted-foreground hover:border-primary/30",
                        )}
                      >
                        Tất cả ({products.length})
                      </button>
                      {categories.map((item) => {
                        const count = products.filter((p) => p.category === item.slug).length;

                        return (
                          <button
                            key={item.slug}
                            type="button"
                            onClick={() =>
                              setCategory(category === item.slug ? defaultValue : item.slug)
                            }
                            className={cn(
                              "w-full rounded-full border px-4 py-2.5 text-left text-sm transition-colors",
                              category === item.slug
                                ? "border-primary bg-primary/10 font-medium text-primary"
                                : "border-border/60 bg-background/70 text-muted-foreground hover:border-primary/30",
                            )}
                          >
                            {item.name} ({count})
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    type="button"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "w-full rounded-full bg-background/70",
                    )}
                    onClick={() => {
                      setSearch("");
                      setCategory(defaultValue);
                    }}
                  >
                    Xóa bộ lọc
                  </button>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal variant="soft" delay={120}>
              <Card className="panel-dark py-0">
                <CardContent className="space-y-4 p-5">
                  <div className="glass-pill w-fit">Hỗ trợ chọn xe</div>
                  <h3 className="font-heading text-2xl font-semibold">
                    Chưa biết bắt đầu từ đâu?
                  </h3>
                  <p className="text-sm leading-7 text-slate-300">
                    Liên hệ đại lý gần bạn để được tư vấn trực tiếp, test ride và nhận
                    hỗ trợ chọn size xe phù hợp.
                  </p>
                  <Link
                    href="/dai-ly"
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "w-full rounded-full bg-white text-slate-950 hover:bg-white/92",
                    )}
                  >
                    <CircleHelp className="size-4" />
                    Gặp đại lý gần bạn
                  </Link>
                </CardContent>
              </Card>
            </Reveal>
          </aside>

          <div className="space-y-8">
            <Reveal>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">
                    Hiển thị {filteredProducts.length} mẫu xe
                  </div>
                  <div className="mt-1 font-heading text-2xl font-semibold">
                    Bộ sưu tập Poseidon
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/ve-chung-toi"
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "rounded-full border-border/70 bg-background/70",
                    )}
                  >
                    <Waves className="size-4" />
                    Về thương hiệu
                  </Link>
                  <Link
                    href="/dai-ly"
                    className={cn(buttonVariants({ variant: "outline" }), "rounded-full")}
                  >
                    <Store className="size-4" />
                    Hệ thống đại lý
                  </Link>
                </div>
              </div>
            </Reveal>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product, index) => (
                <Reveal key={product.slug} variant="soft" delay={(index % 3) * 70}>
                  <Card className="panel group relative overflow-hidden py-0">
                    <CardContent className="space-y-4 p-5">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted/30">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute left-3 top-3 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-sm">
                          {product.badge}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-4">
                          <div className="text-xs tracking-[0.18em] text-primary uppercase">
                            {product.categoryLabel}
                          </div>
                          <div className="text-xs text-muted-foreground">{product.weight}</div>
                        </div>

                        <h3 className="font-heading text-2xl font-semibold">{product.name}</h3>
                        <p className="text-sm leading-7 text-muted-foreground">
                          {product.tagline}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {product.specs.map((spec) => (
                          <span
                            key={spec}
                            className="rounded-full border border-border/60 bg-muted/50 px-3 py-1 text-xs text-muted-foreground"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>

                      <div className="space-y-2 rounded-[1.5rem] border border-border/60 bg-background/70 p-4">
                        {product.highlights.slice(0, 4).map((item) => (
                          <div
                            key={item}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <Bike className="mt-0.5 size-4 shrink-0 text-primary" />
                            {item}
                          </div>
                        ))}
                      </div>

                      <div className="flex items-end justify-between gap-4 pt-2">
                        <div className="text-sm text-muted-foreground">
                          {product.frame} &middot; {product.wheelSize}
                        </div>

                        <Link
                          href="/dai-ly"
                          className={cn(buttonVariants({ size: "lg" }), "rounded-full")}
                        >
                          Tư vấn
                          <ArrowRight className="size-4" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>

            {filteredProducts.length === 0 ? (
              <Reveal variant="soft">
                <Card className="panel py-0">
                  <CardContent className="p-8 text-center">
                    <div className="font-heading text-2xl font-semibold">
                      Chưa có mẫu xe phù hợp bộ lọc hiện tại
                    </div>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      Bạn hãy đổi bộ lọc hoặc xóa điều kiện tìm kiếm để xem lại toàn bộ
                      catalogue.
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
