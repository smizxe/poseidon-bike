import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CircleCheckBig, ShieldCheck, Store, Waves } from "lucide-react";

import { WaveAnimation } from "@/components/ui/wave-animation-1";
import { SectionHeading } from "@/components/poseidon/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  outlineLinkClass,
  primaryLinkClass,
} from "@/lib/button-styles";
import {
  categories,
  homeHighlights,
  newsItems,
  processSteps,
  products,
  stats,
} from "@/lib/site-data";

export function HomePage() {
  return (
    <div className="pb-20">
      <section className="relative min-h-screen overflow-hidden bg-slate-950 pt-28 text-white md:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(56,189,248,0.12),transparent_24%),radial-gradient(circle_at_82%_20%,rgba(59,130,246,0.18),transparent_28%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[850px]">
          <WaveAnimation
            height={850}
            waveSpeed={3}
            waveIntensity={50}
            particleColor="#38bdf8"
            pointSize={2}
            gridDistance={2}
            className="w-full"
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />

        <div className="section-shell relative flex min-h-[calc(100svh-7rem)] items-center py-12 md:py-16">
          <div className="grid w-full items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-8">
              <div className="glass-pill w-fit border-sky-300/25 bg-sky-300/10 text-sky-100">
                <Waves className="size-3.5" />
                Bộ sưu tập 2026
              </div>

              <div className="space-y-6">
                <h1 className="font-heading text-5xl leading-[0.95] font-semibold tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
                  Bứt tốc trên
                  <br />
                  mọi cung đường
                  <br />
                  cùng Poseidon.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
                  Từ road khí động học, MTB chinh phục địa hình đến những mẫu
                  touring bền bỉ cho hành trình dài, Poseidon mang đến cảm giác
                  lái mạnh mẽ, ổn định và đầy hứng khởi cho từng rider.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/san-pham"
                  className={`${primaryLinkClass} bg-sky-400 px-7 text-slate-950 shadow-[0_20px_60px_-24px_rgba(56,189,248,0.7)] hover:bg-sky-300`}
                >
                  Xem bộ sưu tập
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/dai-ly"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-white/6 px-7 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  Tìm đại lý gần bạn
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.7rem] border border-white/10 bg-slate-950/45 p-5 backdrop-blur-md"
                  >
                    <div className="font-heading text-3xl font-semibold tracking-tight text-white">
                      {item.value}
                    </div>
                    <div className="mt-2 text-sm leading-6 text-slate-300">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative min-h-[420px] overflow-visible lg:min-h-[560px]">
                <div className="absolute inset-x-[8%] top-[12%] h-[58%] rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.35),rgba(37,99,235,0.18)_38%,transparent_72%)] blur-3xl" />
                <div className="absolute left-[12%] right-[10%] top-3 z-10 flex justify-end">
                  <div className="rounded-full border border-white/10 bg-white/7 px-3 py-1 text-[11px] font-medium tracking-[0.18em] text-white/80 uppercase backdrop-blur-md">
                    Aero Collection
                  </div>
                </div>
                <div className="absolute inset-x-0 top-[12%] z-10">
                  <Image
                    src="/brand/poseidon-hero-bike-cutout.png"
                    alt="Xe đạp road Poseidon"
                    width={2363}
                    height={1397}
                    priority
                    className="animate-float-bike h-auto w-full mix-blend-multiply brightness-[1.08] contrast-[1.06] saturate-[1.08] drop-shadow-[0_30px_80px_rgba(37,99,235,0.28)]"
                  />
                </div>
                <div className="absolute inset-x-[14%] bottom-[15%] h-px bg-gradient-to-r from-transparent via-sky-200/35 to-transparent" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.8rem] border border-white/10 bg-slate-950/58 p-5 backdrop-blur-md">
                  <div className="mb-3 text-xs font-semibold tracking-[0.22em] text-sky-200 uppercase">
                    Khung khí động học
                  </div>
                  <p className="text-sm leading-7 text-slate-300">
                    Tối ưu độ ổn định ở tốc độ cao, phù hợp cả những hành trình
                    luyện tập lẫn các chặng đường dài cuối tuần.
                  </p>
                </div>
                <div className="rounded-[1.8rem] border border-white/10 bg-slate-950/58 p-5 backdrop-blur-md">
                  <div className="mb-3 text-xs font-semibold tracking-[0.22em] text-sky-200 uppercase">
                    Bảo hành rõ ràng
                  </div>
                  <p className="text-sm leading-7 text-slate-300">
                    Chính sách hậu mãi minh bạch, hỗ trợ kỹ thuật nhanh và mạng
                    lưới đại lý sẵn sàng đồng hành sau khi bạn nhận xe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20">
        <div className="absolute inset-0 section-accent" />
        <div className="section-shell relative">
        <SectionHeading
          eyebrow="Dòng xe chủ lực"
          title="Chọn đúng dòng xe cho cách bạn chinh phục từng cung đường"
          description="Mỗi nhóm sản phẩm được thiết kế cho một nhu cầu rất rõ ràng: bứt tốc, leo dốc, đi xa hay di chuyển linh hoạt trong đô thị."
          align="center"
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <Card
              key={category.slug}
              className="panel relative overflow-hidden border-border/70 bg-card/90 py-0"
            >
              <CardHeader className="pb-0">
                <div className="eyebrow w-fit">{category.shortLabel}</div>
                <CardTitle className="font-heading text-2xl">{category.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 pb-6 pt-2">
                <p className="text-sm leading-7 text-muted-foreground">
                  {category.description}
                </p>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted/30">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <Link
                  href="/san-pham"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  Xem dòng xe
                  <ArrowRight className="size-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        </div>
      </section>

      <section className="section-shell pb-20">
        <div className="panel-dark relative overflow-hidden px-6 py-8 md:px-10">
          <div className="absolute inset-0 ocean-grid opacity-25" />
          <div className="relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionHeading
              eyebrow="Vì sao chọn Poseidon"
              title="Thiết kế mạnh mẽ, cấu hình thực dụng và trải nghiệm mua xe rõ ràng"
              description="Poseidon tập trung vào những yếu tố rider thật sự quan tâm: cảm giác lái, độ bền, khả năng bảo trì và hệ thống hỗ trợ sau bán."
            />

            <div className="grid gap-4 md:grid-cols-3">
              {homeHighlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.8rem] border border-white/10 bg-white/6 p-5"
                >
                  <item.icon className="mb-4 size-10 text-sky-300" />
                  <h3 className="font-heading text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pb-20 pt-4">
        <SectionHeading
          eyebrow="Sản phẩm nổi bật"
          title="Những mẫu xe được rider quan tâm nhiều nhất hiện nay"
          description="Từ mẫu road thiên tốc độ đến touring cân bằng và xe gấp đô thị, đây là những lựa chọn nổi bật cho nhiều phong cách đạp xe khác nhau."
          align="center"
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {products.slice(0, 6).map((product) => (
            <Card key={product.slug} className="panel py-0">
              <CardContent className="space-y-4 p-5">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted/30">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute left-3 top-3 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-sm">
                    {product.badge}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                    {product.categoryLabel}
                  </div>
                  <h3 className="font-heading text-xl font-semibold">{product.name}</h3>
                  <p className="text-sm leading-7 text-muted-foreground">
                    {product.tagline}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.specs.map((spec) => (
                    <span key={spec} className="rounded-full border border-border/60 bg-muted/50 px-3 py-1 text-xs text-muted-foreground">
                      {spec}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-4 pt-2">
                  <div className="text-sm font-medium text-muted-foreground">
                    {product.weight} &middot; {product.wheelSize}
                  </div>
                  <Link
                    href="/san-pham"
                    className={outlineLinkClass}
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] via-primary/[0.08] to-primary/[0.04]" />
        <div className="absolute inset-0 ocean-grid opacity-[0.08]" />
        <div className="section-shell relative">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
            <div className="space-y-6">
              <SectionHeading
                eyebrow="4 bước đơn giản"
                title="Hành trình chọn xe rõ ràng từ lúc xem mẫu đến khi nhận xe"
                description="Quy trình mua xe tại Poseidon được thiết kế đơn giản, minh bạch để bạn yên tâm từ bước đầu tiên."
              />
              <div className="space-y-4">
                {processSteps.map((step, index) => (
                  <div
                    key={step.title}
                    className="flex gap-4 rounded-[1.6rem] border border-border/60 bg-card/80 p-5 backdrop-blur-sm"
                  >
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold">{step.title}</h3>
                      <p className="mt-1 text-sm leading-7 text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <SectionHeading
                eyebrow="Tin tức & cẩm nang"
                title="Kiến thức dành cho rider mới và người đang nâng cấp xe"
                description="Tổng hợp bài viết hữu ích giúp bạn chọn xe, bảo dưỡng và tận hưởng hành trình đạp xe."
              />
              <div className="space-y-4">
                {newsItems.map((item) => (
                  <Link
                    key={item.title}
                    href="/ve-chung-toi"
                    className="block rounded-[1.6rem] border border-border/60 bg-card/80 p-5 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg"
                  >
                    <div className="mb-2 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                      {item.tag}
                    </div>
                    <div className="font-heading text-xl font-semibold">{item.title}</div>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-10">
        <div className="absolute inset-0 section-accent" />
        <div className="section-shell relative">
        <div className="panel relative overflow-hidden px-6 py-8 md:px-10 md:py-10">
          <div className="absolute inset-0 soft-spotlight" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_0.92fr]">
            <div className="space-y-5">
              <div className="eyebrow">
                <ShieldCheck className="size-3.5" />
                Sẵn sàng đồng hành
              </div>
              <h2 className="font-heading text-3xl leading-tight font-semibold tracking-tight md:text-5xl">
                Sẵn sàng chọn chiếc xe phù hợp cho hành trình tiếp theo của bạn?
              </h2>
              <p className="max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                Khám phá catalogue, so sánh cấu hình chi tiết hoặc ghé hệ thống
                đại lý để được tư vấn đúng nhu cầu và trải nghiệm xe trực tiếp.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.8rem] border border-border/70 bg-background/80 p-5">
                <CircleCheckBig className="mb-4 size-9 text-primary" />
                <div className="font-heading text-xl font-semibold">
                  Xem trọn bộ sưu tập
                </div>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  So sánh từng dòng xe, màu sắc và cấu hình để tìm đúng mẫu phù hợp.
                </p>
              </div>
              <div className="rounded-[1.8rem] border border-border/70 bg-background/80 p-5">
                <Store className="mb-4 size-9 text-primary" />
                <div className="font-heading text-xl font-semibold">
                  Đặt lịch tư vấn nhanh
                </div>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Tìm đại lý gần bạn để xem xe, test ride và nhận hỗ trợ hậu mãi.
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>
    </div>
  );
}
