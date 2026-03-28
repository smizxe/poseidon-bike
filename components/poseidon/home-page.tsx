import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CircleCheckBig, ShieldCheck, Store } from "lucide-react";

import { CountUp } from "@/components/count-up";
import { CatalogProductCard } from "@/components/poseidon/catalog-product-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/poseidon/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WaveAnimation } from "@/components/ui/wave-animation-1";
import { primaryLinkClass } from "@/lib/button-styles";
import { CatalogProduct, ProductCategorySummary } from "@/lib/catalog-types";
import { homeHighlights, newsItems, processSteps, stats } from "@/lib/site-data";

interface HomePageProps {
  featuredProducts: CatalogProduct[];
  categorySummaries: ProductCategorySummary[];
  productCount: number;
}

function parseStatValue(value: string) {
  const match = value.match(/(\D*)(\d+)(.*)/);

  if (!match) {
    return {
      prefix: "",
      end: 0,
      suffix: value,
    };
  }

  return {
    prefix: match[1],
    end: Number(match[2]),
    suffix: match[3],
  };
}

export function HomePage({
  featuredProducts,
  categorySummaries,
  productCount,
}: HomePageProps) {
  const heroStats = stats.map((item, index) =>
    index === 0
      ? {
          ...item,
          value: String(productCount),
        }
      : item,
  );

  return (
    <div className="pb-20">
      <section className="relative min-h-screen overflow-hidden bg-slate-900 pt-18 text-white md:pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(56,189,248,0.25),transparent_32%),radial-gradient(circle_at_82%_20%,rgba(59,130,246,0.32),transparent_38%),radial-gradient(circle_at_50%_50%,rgba(148,163,184,0.06),transparent_50%)]" />
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

        <div className="section-shell relative flex min-h-[calc(100svh-5.35rem)] items-center py-8 md:py-10">
          <div className="grid w-full items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="relative isolate space-y-8">
              <div className="absolute -inset-y-12 -left-12 -right-8 -z-10 rounded-[3rem] bg-slate-950/50 blur-3xl lg:-left-20 lg:-right-16 lg:bg-slate-950/65" />
              <div className="space-y-6">
                <Reveal delay={80}>
                  <h1 className="font-heading text-5xl leading-[0.93] font-semibold tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.35rem]">
                    Bứt tốc
                    <br />
                    mọi cung
                    <br />
                    đường cùng
                    <br />
                    <span className="hero-poseidon-word">Poseidon.</span>
                  </h1>
                </Reveal>
                <Reveal delay={160}>
                  <p className="max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
                    Từ road khí động học, MTB chinh phục địa hình đến những mẫu touring
                    bền bỉ cho hành trình dài, Poseidon mang đến cảm giác lái mạnh mẽ,
                    ổn định và đầy hứng khởi cho từng rider.
                  </p>
                </Reveal>
              </div>

              <Reveal delay={240}>
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
              </Reveal>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {heroStats.map((item, index) => (
                  <Reveal key={item.label} variant="soft" delay={300 + index * 70}>
                    <div className="rounded-[1.7rem] border border-white/10 bg-slate-950/45 p-5 backdrop-blur-md">
                      <div className="font-heading text-3xl font-semibold tracking-tight text-white">
                        <CountUp {...parseStatValue(item.value)} />
                      </div>
                      <div className="mt-2 text-sm leading-6 text-slate-300">{item.label}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Reveal variant="zoom" delay={120}>
                <div className="relative min-h-[550px] overflow-visible lg:min-h-[850px]">
                  <div className="absolute inset-x-[5%] top-[10%] h-[62%] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.45),rgba(37,99,235,0.22)_40%,transparent_72%)] blur-3xl" />
                  <div className="absolute left-[12%] right-[10%] top-3 z-10 flex justify-end">
                    <div className="rounded-full border border-white/10 bg-white/7 px-3 py-1 text-[11px] font-medium tracking-[0.18em] text-white/80 uppercase backdrop-blur-md">
                      Aero Collection
                    </div>
                  </div>
                  <div className="absolute inset-x-0 top-[12%] z-10">
                    <Image
                      src="/brand/poseidon-hero-bike-v2.png"
                      alt="Xe đạp road Poseidon"
                      width={2560}
                      height={1708}
                      priority
                      className="animate-float-bike h-auto w-full scale-[1.1] brightness-[1.1] contrast-[1.05] saturate-[1.1] drop-shadow-[0_30px_80px_rgba(56,189,248,0.4)] lg:scale-[1.2] lg:translate-x-8"
                    />
                  </div>
                  <div className="absolute inset-x-[14%] bottom-[15%] h-px bg-gradient-to-r from-transparent via-sky-200/35 to-transparent" />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20">
        <div className="absolute inset-0 section-accent" />
        <div className="section-shell relative">
          <Reveal>
            <SectionHeading
              eyebrow="Dòng xe chủ lực"
              title="Chọn đúng dòng xe cho cách bạn chinh phục từng cung đường"
              description="Mỗi nhóm sản phẩm được thiết kế cho một nhu cầu rất rõ ràng: bứt tốc, leo dốc, đi xa hay di chuyển linh hoạt trong đô thị."
              align="center"
            />
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {categorySummaries.map((category, index) => (
              <Reveal key={category.slug} variant="soft" delay={index * 70}>
                <Card className="category-showcase-card group relative flex h-full overflow-visible py-0 backdrop-blur-xl">
                  <CardHeader className="space-y-4 px-4 pb-0 pt-8">
                    <div className="category-showcase-tag absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full px-4 py-1.5 text-[0.68rem] font-semibold tracking-[0.28em] uppercase">
                      {category.shortLabel}
                    </div>
                    <CardTitle className="font-heading text-[2rem] leading-[1.02] tracking-tight text-slate-900 dark:text-white">
                      {category.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col gap-5 px-4 pb-6 pt-3">
                    <p className="min-h-[96px] text-[0.96rem] leading-8 text-slate-600 dark:text-slate-300">
                      {category.description}
                    </p>
                    <div className="relative mt-auto aspect-[1.18/1] overflow-hidden rounded-[1.85rem] border border-white/70 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] dark:border-white/8 dark:bg-white">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                    </div>
                    <Link
                      href={`/san-pham?category=${category.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-sky-600 transition-colors hover:text-sky-500 dark:text-sky-300 dark:hover:text-sky-200"
                    >
                      Xem dòng xe
                      <ArrowRight className="size-4" />
                    </Link>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pb-20">
        <div className="panel-dark relative overflow-hidden px-6 py-8 md:px-10">
          <Image
            src="/brand/anh-phu-homepage.jpg"
            alt="Poseidon background"
            fill
            className="object-cover opacity-45 brightness-[0.8] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-slate-950/40" />
          <div className="absolute inset-0 ocean-grid opacity-20" />
          <div className="relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <SectionHeading
                eyebrow="Vì sao chọn Poseidon"
                title="Thiết kế mạnh mẽ, cấu hình thực dụng và trải nghiệm mua xe rõ ràng"
                description="Poseidon tập trung vào những yếu tố rider thật sự quan tâm: cảm giác lái, độ bền, khả năng bảo trì và hệ thống hỗ trợ sau bán."
              />
            </Reveal>

            <div className="grid gap-4 md:grid-cols-3">
              {homeHighlights.map((item, index) => (
                <Reveal key={item.title} variant="soft" delay={index * 80}>
                  <div className="rounded-[1.8rem] border border-white/10 bg-white/6 p-5">
                    <item.icon className="mb-4 size-10 text-sky-300" />
                    <h3 className="font-heading text-xl font-semibold">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pb-20 pt-4">
        <Reveal>
          <SectionHeading
            eyebrow="Sản phẩm nổi bật"
            title="Những mẫu xe được rider quan tâm nhiều nhất hiện nay"
            description="Từ mẫu road thiên tốc độ đến touring cân bằng và xe gấp đô thị, đây là những lựa chọn nổi bật cho nhiều phong cách đạp xe khác nhau."
            align="center"
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredProducts.map((product, index) => (
            <Reveal key={product.slug} variant="soft" delay={(index % 3) * 80}>
              <CatalogProductCard
                product={product}
                actionHref={`/san-pham/${product.slug}`}
                actionLabel="Xem chi tiết"
              />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] via-primary/[0.08] to-primary/[0.04]" />
        <div className="absolute inset-0 ocean-grid opacity-[0.08]" />
        <div className="section-shell relative">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
            <div className="space-y-6">
              <Reveal>
                <SectionHeading
                  eyebrow="4 bước đơn giản"
                  title="Hành trình chọn xe rõ ràng từ lúc xem mẫu đến khi nhận xe"
                  description="Quy trình mua xe tại Poseidon được thiết kế đơn giản, minh bạch để bạn yên tâm từ bước đầu tiên."
                />
              </Reveal>
              <div className="space-y-4">
                {processSteps.map((step, index) => (
                  <Reveal key={step.title} variant="soft" delay={index * 70}>
                    <div className="flex gap-4 rounded-[1.6rem] border border-border/60 bg-card/80 p-5 backdrop-blur-sm">
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
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Reveal>
                <SectionHeading
                  eyebrow="Tin tức & cảm nang"
                  title="Kiến thức dành cho rider mới và người đang nâng cấp xe"
                  description="Tổng hợp bài viết hữu ích giúp bạn chọn xe, bảo dưỡng và tận hưởng hành trình đạp xe."
                />
              </Reveal>
              <div className="space-y-4">
                {newsItems.map((item, index) => (
                  <Reveal key={item.title} variant="soft" delay={index * 70}>
                    <Link
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
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-10">
        <div className="absolute inset-0 section-accent" />
        <div className="section-shell relative">
          <Reveal>
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
                    Khám phá catalogue, so sánh cấu hình chi tiết hoặc ghé hệ thống đại lý
                    để được tư vấn đúng nhu cầu và trải nghiệm xe trực tiếp.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.8rem] border border-border/70 bg-background/80 p-5">
                    <CircleCheckBig className="mb-4 size-9 text-primary" />
                    <div className="font-heading text-xl font-semibold">Xem trọn bộ sưu tập</div>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      So sánh từng dòng xe, màu sắc và cấu hình để tìm đúng mẫu phù hợp.
                    </p>
                  </div>
                  <div className="rounded-[1.8rem] border border-border/70 bg-background/80 p-5">
                    <Store className="mb-4 size-9 text-primary" />
                    <div className="font-heading text-xl font-semibold">Đặt lịch tư vấn nhanh</div>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      Tìm đại lý gần bạn để xem xe, test ride và nhận hỗ trợ hậu mãi.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
