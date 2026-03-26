import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PhoneCall, Store } from "lucide-react";

import {
  darkOutlineLinkClass,
  lightOnDarkLinkClass,
} from "@/lib/button-styles";
import { contactHighlights, dealerRegions, navLinks } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-slate-950 text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/60 to-transparent" />
      <div className="absolute inset-0 ocean-mesh opacity-65" />

      <div className="section-shell relative py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.9fr]">
          <div className="space-y-5">
            <div className="space-y-3">
              <Image
                src="/brand/poseidon-logo-white.png"
                alt="Poseidon"
                width={1055}
                height={408}
                className="h-11 w-auto"
              />
              <div>
                <div className="text-sm text-slate-300">
                  Thương hiệu xe đạp cảm hứng đại dương.
                </div>
              </div>
            </div>

            <p className="max-w-xl text-sm leading-7 text-slate-300">
              Bộ web app mẫu này được thiết kế để trình bày rõ sản phẩm, câu chuyện
              thương hiệu và mạng lưới đại lý, đồng thời giữ cảm giác premium, hiện
              đại và dễ mở rộng.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {contactHighlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.4rem] border border-white/10 bg-white/6 p-4"
                >
                  <div className="mb-1 text-xs tracking-[0.24em] text-slate-400 uppercase">
                    {item.label}
                  </div>
                  <div className="font-medium text-white">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
            <div>
              <div className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                Điều hướng
              </div>
              <div className="space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm text-slate-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                Hành động nhanh
              </div>
              <div className="space-y-3">
                <Link
                  href="/san-pham"
                  className={`${darkOutlineLinkClass} w-full`}
                >
                  <Store className="size-4" />
                  Xem mẫu sản phẩm
                </Link>
                <Link
                  href="/dai-ly"
                  className={`${lightOnDarkLinkClass} w-full bg-sky-400 hover:bg-sky-300`}
                >
                  <PhoneCall className="size-4" />
                  Tìm đại lý gần bạn
                </Link>
              </div>
            </div>
          </div>

          <div className="panel-dark relative p-6">
            <div className="glass-pill mb-4 w-fit">Mạng lưới mẫu</div>
            <div className="space-y-4">
              {dealerRegions.map((region) => (
                <div
                  key={region.name}
                  className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4"
                >
                  <div className="mb-1 flex items-center justify-between gap-3">
                    <div className="font-medium">{region.name}</div>
                    <div className="text-xs text-sky-200">{region.count} điểm</div>
                  </div>
                  <div className="text-sm leading-6 text-slate-300">
                    {region.cities.join(" • ")}
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/ve-chung-toi"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-sky-200 transition-colors hover:text-white"
            >
              Xem thêm về thương hiệu
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-slate-400">
          © 2026 Poseidon Bikes. Demo Next.js với light theme, dark theme và
          catalogue xe đạp cảm hứng đại dương.
        </div>
      </div>
    </footer>
  );
}
