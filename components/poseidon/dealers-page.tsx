"use client";

import * as React from "react";
import { MapPin, Phone, Search, Store } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DealerDirectoryItem } from "@/lib/dealer-directory";
import { cn } from "@/lib/utils";

interface DealersPageProps {
  dealers: DealerDirectoryItem[];
  provinces: string[];
}

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function DealersPage({ dealers, provinces }: DealersPageProps) {
  const [query, setQuery] = React.useState("");
  const [provinceFilter, setProvinceFilter] = React.useState("Tất cả");

  const filteredDealers = React.useMemo(() => {
    const normalizedQuery = normalizeText(query);

    return dealers.filter((dealer) => {
      const matchesProvince =
        provinceFilter === "Tất cả" || dealer.province === provinceFilter;
      const searchableText = normalizeText(
        `${dealer.province} ${dealer.storeName} ${dealer.phone} ${dealer.address}`,
      );
      const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);

      return matchesProvince && matchesQuery;
    });
  }, [dealers, provinceFilter, query]);

  return (
    <div className="pb-20 pt-28 md:pt-32">
      <section className="section-shell">
        <div className="panel overflow-hidden px-6 py-8 md:px-8">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-3">
                <div className="eyebrow">Hệ thống đại lý</div>
                <div className="space-y-3">
                  <h1 className="section-title max-w-4xl text-balance">
                    Tra cứu cửa hàng Poseidon theo khu vực, tên shop hoặc hotline.
                  </h1>
                  <p className="section-copy max-w-3xl">
                    Trang này chỉ tập trung vào dữ liệu tra cứu. Bạn có thể tìm nhanh theo tỉnh
                    thành, tên cửa hàng hoặc số điện thoại để ra đúng đại lý cần liên hệ.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <SummaryStat label="Điểm bán" value={`${dealers.length}`} />
                <SummaryStat label="Tỉnh thành" value={`${provinces.length}`} />
                <SummaryStat label="Kết quả" value={`${filteredDealers.length}`} />
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto]">
              <label className="flex items-center gap-3 rounded-[1.5rem] border border-border/70 bg-background/72 px-4 py-3 shadow-[0_18px_45px_-34px_rgba(37,99,235,0.18)]">
                <Search className="size-4 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Tìm theo tỉnh thành, tên cửa hàng, hotline hoặc địa chỉ"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </label>

              <div className="flex flex-wrap gap-2">
                {["Tất cả", ...provinces].map((province) => (
                  <button
                    key={province}
                    type="button"
                    onClick={() => setProvinceFilter(province)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                      provinceFilter === province
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border/70 bg-background/72 text-foreground hover:border-primary/35 hover:bg-primary/6",
                    )}
                  >
                    {province}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pt-8">
        <Card className="panel overflow-hidden py-0">
          <CardHeader className="border-b border-border/60 bg-background/55">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle className="font-heading text-2xl">Danh sách đại lý</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  Hiện có {filteredDealers.length} kết quả phù hợp với bộ lọc hiện tại.
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {filteredDealers.length > 0 ? (
              <>
                <div className="hidden overflow-x-auto lg:block">
                  <table className="w-full min-w-[920px] text-sm">
                    <thead className="bg-background/78">
                      <tr className="text-left text-muted-foreground">
                        <th className="px-6 py-4 font-medium">Khu vực</th>
                        <th className="px-6 py-4 font-medium">Cửa hàng</th>
                        <th className="px-6 py-4 font-medium">Hotline</th>
                        <th className="px-6 py-4 font-medium">Địa chỉ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDealers.map((dealer, index) => (
                        <tr
                          key={dealer.id}
                          className={cn(
                            "border-t border-border/60 transition-colors hover:bg-primary/4",
                            index % 2 === 0 ? "bg-background/35" : "bg-transparent",
                          )}
                        >
                          <td className="px-6 py-5 align-top">
                            <span className="inline-flex rounded-full border border-primary/18 bg-primary/8 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                              {dealer.province}
                            </span>
                          </td>
                          <td className="px-6 py-5 align-top">
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5 rounded-xl border border-border/70 bg-background/85 p-2">
                                <Store className="size-4 text-primary" />
                              </div>
                              <div className="font-medium text-foreground">{dealer.storeName}</div>
                            </div>
                          </td>
                          <td className="px-6 py-5 align-top">
                            <a
                              href={`tel:${dealer.phone.replace(/[^0-9+]/g, "")}`}
                              className="inline-flex items-center gap-2 font-medium text-foreground transition-colors hover:text-primary"
                            >
                              <Phone className="size-4 text-primary" />
                              {dealer.phone}
                            </a>
                          </td>
                          <td className="px-6 py-5 align-top text-muted-foreground">
                            <div className="flex items-start gap-2 leading-7">
                              <MapPin className="mt-1 size-4 shrink-0 text-primary" />
                              <span>{dealer.address}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="grid gap-4 p-4 lg:hidden">
                  {filteredDealers.map((dealer) => (
                    <div
                      key={dealer.id}
                      className="rounded-[1.6rem] border border-border/70 bg-background/72 p-4 shadow-[0_20px_50px_-38px_rgba(15,23,42,0.22)]"
                    >
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <span className="inline-flex rounded-full border border-primary/18 bg-primary/8 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                          {dealer.province}
                        </span>
                        <Store className="size-4 text-primary" />
                      </div>

                      <div className="space-y-3">
                        <div className="font-heading text-xl font-semibold text-foreground">
                          {dealer.storeName}
                        </div>
                        <a
                          href={`tel:${dealer.phone.replace(/[^0-9+]/g, "")}`}
                          className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
                        >
                          <Phone className="size-4 text-primary" />
                          {dealer.phone}
                        </a>
                        <div className="flex items-start gap-2 text-sm leading-7 text-muted-foreground">
                          <MapPin className="mt-1 size-4 shrink-0 text-primary" />
                          <span>{dealer.address}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex min-h-[280px] flex-col items-center justify-center gap-3 px-6 py-16 text-center">
                <div className="rounded-2xl border border-border/70 bg-background/72 p-3">
                  <Search className="size-5 text-primary" />
                </div>
                <div className="font-heading text-2xl font-semibold">Không tìm thấy kết quả</div>
                <p className="max-w-md text-sm leading-7 text-muted-foreground">
                  Thử đổi từ khóa tìm kiếm hoặc chuyển sang khu vực khác để xem danh sách đại lý.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function SummaryStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.4rem] border border-border/70 bg-background/72 px-4 py-4 text-center shadow-[0_18px_45px_-34px_rgba(37,99,235,0.18)]">
      <div className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">{label}</div>
      <div className="mt-2 font-heading text-3xl font-semibold tracking-tight">{value}</div>
    </div>
  );
}
