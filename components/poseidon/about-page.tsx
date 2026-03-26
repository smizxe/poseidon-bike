import Link from "next/link";
import { Award, Compass, Gem, ShieldCheck, Waves } from "lucide-react";

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
                Về Poseidon
              </div>
              <h1 className="font-heading text-4xl leading-tight font-semibold tracking-tight md:text-6xl">
                Xe đạp chất lượng quốc tế, thiết kế cho người Việt
              </h1>
              <p className="max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                Poseidon mang đến những chiếc xe đạp kết hợp giữa công nghệ
                khung Magie tiên tiến, linh kiện Shimano chính hãng và mức giá
                hợp lý — để mỗi hành trình đều đáng giá.
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
                  Tìm đại lý gần bạn
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
            eyebrow="Câu chuyện thương hiệu"
            title="Từ niềm đam mê xe đạp đến thương hiệu được hàng nghìn rider tin chọn"
            description="Poseidon không chỉ bán xe — chúng tôi xây dựng một hệ sinh thái hoàn chỉnh từ sản phẩm, dịch vụ đến cộng đồng, giúp mỗi người tìm được chiếc xe phù hợp nhất."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="panel p-6">
              <Compass className="mb-4 size-10 text-primary" />
              <h3 className="font-heading text-2xl font-semibold">Sứ mệnh rõ ràng</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Đưa xe đạp chất lượng cao đến gần hơn với người Việt, phục vụ cả
                nhu cầu đi lại hàng ngày lẫn đam mê thể thao.
              </p>
            </div>
            <div className="panel p-6">
              <Gem className="mb-4 size-10 text-primary" />
              <h3 className="font-heading text-2xl font-semibold">Chất lượng vượt tầm giá</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Khung Magie đúc nguyên khối, groupset Shimano chính hãng, phanh
                dầu — tất cả ở mức giá mà rider Việt dễ dàng tiếp cận.
              </p>
            </div>
            <div className="panel p-6">
              <ShieldCheck className="mb-4 size-10 text-primary" />
              <h3 className="font-heading text-2xl font-semibold">Bảo hành minh bạch</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Cam kết bảo hành khung xe 5 năm, linh kiện 12 tháng và hỗ trợ kỹ
                thuật 24/7 qua hệ thống 120+ đại lý toàn quốc.
              </p>
            </div>
            <div className="panel p-6">
              <Award className="mb-4 size-10 text-primary" />
              <h3 className="font-heading text-2xl font-semibold">Cộng đồng mạnh mẽ</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Hàng nghìn rider đã đồng hành cùng Poseidon trên mọi cung đường,
                từ phố thị đến những cung đèo thử thách nhất.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pb-20">
        <div className="panel-dark overflow-hidden px-6 py-8 md:px-10">
          <SectionHeading
            eyebrow="Giá trị cốt lõi"
            title="3 trụ cột tạo nên sự khác biệt của Poseidon"
            description="Chất lượng linh kiện, công nghệ khung tiên tiến và cam kết hậu mãi dài hạn — đó là lý do hàng nghìn khách hàng đặt niềm tin ở Poseidon."
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
          eyebrow="Hành trình phát triển"
          title="Từ ý tưởng đến thương hiệu xe đạp được yêu thích"
          description="Mỗi cột mốc đánh dấu một bước tiến quan trọng trong hành trình mang xe đạp chất lượng đến tay người Việt."
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
