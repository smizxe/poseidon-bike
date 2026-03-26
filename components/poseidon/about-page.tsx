import Link from "next/link";
import { Compass, Gem, ShieldCheck, Sparkles, Waves } from "lucide-react";

import { SectionHeading } from "@/components/poseidon/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  outlineLinkClass,
  primaryLinkClass,
} from "@/lib/button-styles";
import { aboutTimeline, brandPillars, stats } from "@/lib/site-data";

export function AboutPage() {
  return (
    <div className="pb-20 pt-28 md:pt-32">
      <section className="section-shell">
        <div className="panel relative overflow-hidden px-6 py-8 md:px-10 md:py-12">
          <div className="absolute inset-0 soft-spotlight" />
          <div className="relative grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-5">
              <div className="eyebrow">
                <Waves className="size-3.5" />
                Về chúng tôi
              </div>
              <h1 className="font-heading text-4xl leading-tight font-semibold tracking-tight md:text-6xl">
                Một trang mẫu kể câu chuyện thương hiệu theo hướng tinh gọn và
                đáng tin hơn.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                Thay vì chỉ liệt kê thông tin, trang này gom brand story, giá trị,
                timeline phát triển và chuẩn chất lượng vào các block rõ ràng để dễ
                cập nhật sau này.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/san-pham"
                  className={`${primaryLinkClass} px-6`}
                >
                  Xem bộ sưu tập
                </Link>
                <Link
                  href="/dai-ly"
                  className={`${outlineLinkClass} px-6`}
                >
                  Xem hệ thống đại lý
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.8rem] border border-border/70 bg-background/75 p-5"
                >
                  <div className="font-heading text-4xl font-semibold tracking-tight">
                    {item.value}
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <SectionHeading
            eyebrow="Câu chuyện"
            title="Poseidon được định hình như một thương hiệu xe đạp cân bằng giữa hiệu năng và thẩm mỹ"
            description="Ngôn ngữ thiết kế xoay quanh đường nét gọn, màu sắc cảm hứng mặt nước và trải nghiệm chọn xe dễ hiểu với người dùng Việt Nam."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="panel p-6">
              <Compass className="mb-4 size-10 text-primary" />
              <h3 className="font-heading text-2xl font-semibold">Định vị rõ ràng</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Tập trung vào các dòng xe dễ bán, dễ kể câu chuyện và dễ phân nhóm
                theo nhu cầu sử dụng thực tế.
              </p>
            </div>
            <div className="panel p-6">
              <Gem className="mb-4 size-10 text-primary" />
              <h3 className="font-heading text-2xl font-semibold">Premium vừa đủ</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Màu sắc, card, typography và tương phản được nâng cấp để nhìn sang
                hơn nhưng vẫn phù hợp bán hàng.
              </p>
            </div>
            <div className="panel p-6">
              <ShieldCheck className="mb-4 size-10 text-primary" />
              <h3 className="font-heading text-2xl font-semibold">Đáng tin cậy</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Thông tin bảo hành, vật liệu, network đại lý và process đều có nơi
                trình bày riêng, tránh bị loãng.
              </p>
            </div>
            <div className="panel p-6">
              <Sparkles className="mb-4 size-10 text-primary" />
              <h3 className="font-heading text-2xl font-semibold">Sẵn sàng mở rộng</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Dễ cắm thêm block video, showroom, review, form đại lý hoặc CMS mà
                không phải đập lại layout.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pb-20">
        <div className="panel-dark overflow-hidden px-6 py-8 md:px-10">
          <SectionHeading
            eyebrow="Pillars"
            title="3 trụ cột đang định hình toàn bộ giao diện thương hiệu"
            description="Mỗi trụ cột dưới đây có thể trở thành một block landing, một nhóm USP hoặc một module trong brochure điện tử."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {brandPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6"
              >
                <div className="mb-4 text-xs tracking-[0.2em] text-sky-200 uppercase">
                  {pillar.eyebrow}
                </div>
                <h3 className="font-heading text-2xl font-semibold">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pb-20">
        <SectionHeading
          eyebrow="Timeline"
          title="Trang mẫu có luôn một timeline để kể hành trình thương hiệu"
          description="Block này hợp với website doanh nghiệp vì giúp phần Về chúng tôi có chiều sâu hơn và dễ tạo niềm tin hơn phần text đơn thuần."
          align="center"
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-4">
          {aboutTimeline.map((item) => (
            <Card key={item.year} className="panel py-0">
              <CardHeader>
                <div className="text-sm tracking-[0.22em] text-primary uppercase">
                  {item.year}
                </div>
                <CardTitle className="font-heading text-2xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <p className="text-sm leading-7 text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
