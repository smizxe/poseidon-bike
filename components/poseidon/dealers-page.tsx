import Link from "next/link";
import { Building2, CircleDashed, MapPinned, PhoneCall, Users } from "lucide-react";

import { SectionHeading } from "@/components/poseidon/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  lightOnDarkLinkClass,
  outlineLinkClass,
  primaryLinkClass,
} from "@/lib/button-styles";
import { dealerBenefits, dealerList, dealerRegions } from "@/lib/site-data";

export function DealersPage() {
  return (
    <div className="pb-20 pt-28 md:pt-32">
      <section className="section-shell">
        <div className="panel relative overflow-hidden px-6 py-8 md:px-10 md:py-10">
          <div className="absolute inset-0 ocean-grid opacity-35" />
          <div className="relative grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="space-y-5">
              <div className="eyebrow">
                <MapPinned className="size-3.5" />
                Hệ thống đại lý
              </div>
              <h1 className="font-heading text-4xl leading-tight font-semibold tracking-tight md:text-6xl">
                120+ đại lý ủy quyền trên toàn quốc
              </h1>
              <p className="max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                Dù bạn ở Hà Nội, Đà Nẵng hay TP.HCM — luôn có một showroom
                Poseidon gần bạn để xem xe, test ride và nhận tư vấn chọn size
                phù hợp.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/san-pham"
                  className={`${primaryLinkClass} px-6`}
                >
                  Xem sản phẩm
                </Link>
                <Link
                  href="/ve-chung-toi"
                  className={`${outlineLinkClass} px-6`}
                >
                  Về thương hiệu
                </Link>
              </div>
            </div>

            <div className="panel-dark relative min-h-[360px] overflow-hidden p-6">
              <div className="absolute inset-0 soft-spotlight opacity-70" />
              <div className="relative h-full rounded-[1.8rem] border border-white/10 bg-slate-950/60 p-6">
                <div className="mb-6 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm tracking-[0.2em] text-sky-200 uppercase">
                      Phân phối toàn quốc
                    </div>
                    <div className="font-heading text-3xl font-semibold">
                      3 vùng — 120+ điểm bán
                    </div>
                  </div>
                  <CircleDashed className="size-10 text-sky-300" />
                </div>

                <div className="relative mx-auto mt-8 h-[210px] max-w-[420px] rounded-[1.8rem] border border-white/10 bg-white/4">
                  <div className="absolute left-[27%] top-[20%] size-4 rounded-full bg-sky-300 shadow-[0_0_0_10px_rgba(125,211,252,0.14)]" />
                  <div className="absolute left-[46%] top-[42%] size-4 rounded-full bg-blue-300 shadow-[0_0_0_10px_rgba(96,165,250,0.14)]" />
                  <div className="absolute left-[63%] top-[62%] size-4 rounded-full bg-cyan-300 shadow-[0_0_0_10px_rgba(103,232,249,0.14)]" />
                  <div className="absolute inset-y-0 left-[28%] w-px bg-gradient-to-b from-transparent via-white/35 to-transparent" />
                  <div className="absolute inset-y-0 left-[47%] w-px bg-gradient-to-b from-transparent via-white/35 to-transparent" />
                  <div className="absolute inset-x-0 top-[42%] h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {dealerRegions.map((region) => (
                    <div
                      key={region.name}
                      className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4"
                    >
                      <div className="text-sm font-medium">{region.name}</div>
                      <div className="mt-0.5 font-heading text-lg font-semibold text-sky-200">
                        {region.count} đại lý
                      </div>
                      <div className="mt-1 text-xs text-slate-400">
                        {region.cities.join(" • ")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-20">
        <SectionHeading
          eyebrow="Tại sao chọn Poseidon"
          title="Quyền lợi khi trở thành đại lý ủy quyền"
          description="Poseidon đồng hành cùng đại lý từ ngày đầu mở bán — từ hỗ trợ trưng bày, đào tạo kỹ thuật đến chính sách hậu mãi minh bạch."
          align="center"
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {dealerBenefits.map((benefit) => (
            <Card key={benefit.title} className="panel py-0">
              <CardHeader>
                <benefit.icon className="mb-4 size-10 text-primary" />
                <CardTitle className="font-heading text-2xl">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <p className="text-sm leading-7 text-muted-foreground">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="section-shell pb-20">
        <SectionHeading
          eyebrow="Showroom tiêu biểu"
          title="Ghé thăm showroom gần bạn"
          description="Xem xe trực tiếp, test ride tại chỗ và được tư vấn chọn size bởi đội ngũ am hiểu sản phẩm."
          align="center"
        />

        <div className="mt-12 grid gap-5 xl:grid-cols-3">
          {dealerList.map((dealer) => (
            <Card key={dealer.name} className="panel py-0">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs tracking-[0.2em] text-primary uppercase">
                      {dealer.region}
                    </div>
                    <CardTitle className="mt-2 font-heading text-2xl">
                      {dealer.name}
                    </CardTitle>
                  </div>
                  <Building2 className="size-8 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pb-6">
                <div className="text-sm leading-7 text-muted-foreground">
                  {dealer.address}
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[1.2rem] border border-border/60 bg-background/70 p-4">
                    <div className="mb-1 text-xs tracking-[0.18em] text-primary uppercase">
                      Hotline
                    </div>
                    <div className="font-medium">{dealer.phone}</div>
                  </div>
                  <div className="rounded-[1.2rem] border border-border/60 bg-background/70 p-4">
                    <div className="mb-1 text-xs tracking-[0.18em] text-primary uppercase">
                      Thế mạnh
                    </div>
                    <div className="font-medium">{dealer.specialty}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="size-4 text-primary" />
                  {dealer.note}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="panel-dark px-6 py-8 md:px-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div className="space-y-4">
              <div className="eyebrow border-sky-300/25 bg-sky-300/10 text-sky-200">
                Hợp tác kinh doanh
              </div>
              <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-5xl">
                Trở thành đại lý ủy quyền Poseidon
              </h2>
              <p className="max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                Bạn đang kinh doanh xe đạp hoặc muốn mở đại lý? Liên hệ ngay
                để nhận thông tin chính sách hợp tác, bảng giá sỉ và hỗ trợ mở
                showroom từ đội ngũ Poseidon.
              </p>
            </div>

            <div className="rounded-[1.8rem] border border-white/10 bg-white/6 p-6">
              <div className="mb-3 text-sm tracking-[0.18em] text-sky-200 uppercase">
                Liên hệ hợp tác
              </div>
              <div className="space-y-4 text-sm leading-7 text-slate-300">
                <p>
                  <span className="font-medium text-white">Hotline đại lý:</span>{" "}
                  1900 63 99 63
                </p>
                <p>
                  <span className="font-medium text-white">Email:</span>{" "}
                  dealer@poseidonbike.vn
                </p>
                <p>
                  <span className="font-medium text-white">Giờ tư vấn:</span>{" "}
                  08:30 — 20:30 mỗi ngày, kể cả cuối tuần
                </p>
              </div>
              <div className="mt-6">
                <Link
                  href="tel:19006399​63"
                  className={lightOnDarkLinkClass}
                >
                  <PhoneCall className="size-4" />
                  Gọi tư vấn ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
