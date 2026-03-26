"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/lib/site-data";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div className="section-shell rounded-full border border-border/60 bg-background/78 px-4 py-3 shadow-[0_24px_50px_-36px_rgba(15,23,42,0.45)] backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="flex shrink-0 items-center rounded-full px-2 py-1 transition-opacity hover:opacity-90"
          >
            <Image
              src="/brand/poseidon-logo-black.png"
              alt="Poseidon"
              width={1055}
              height={408}
              priority
              className="-translate-y-0.5 h-9 w-auto dark:hidden md:h-10"
            />
            <Image
              src="/brand/poseidon-logo-white.png"
              alt="Poseidon"
              width={1055}
              height={408}
              priority
              className="hidden -translate-y-0.5 h-9 w-auto dark:block md:h-10"
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm transition-colors duration-200",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle />
            <Link
              href="/san-pham"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full px-5 shadow-lg shadow-primary/20",
              )}
            >
              Xem bộ sưu tập
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger
                className={cn(
                  buttonVariants({ variant: "outline", size: "icon-lg" }),
                  "rounded-full bg-background/80",
                )}
              >
                <Menu className="size-4" />
                <span className="sr-only">Mở menu</span>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[320px] border-l border-white/10 bg-slate-950/95 text-white"
              >
                <SheetHeader className="pb-0">
                  <SheetTitle className="text-white">Điều hướng Poseidon</SheetTitle>
                  <SheetDescription className="text-slate-300">
                    Chọn trang bạn muốn xem hoặc mở ngay catalogue sản phẩm.
                  </SheetDescription>
                </SheetHeader>

                <div className="flex flex-1 flex-col gap-3 px-4 pb-6">
                  {navLinks.map((link) => {
                    const active = isActive(pathname, link.href);

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "rounded-2xl border px-4 py-3 text-sm transition-all",
                          active
                            ? "border-sky-300/30 bg-sky-400/12 text-white"
                            : "border-white/10 bg-white/4 text-slate-300 hover:border-sky-300/25 hover:bg-white/8",
                        )}
                      >
                        {link.label}
                      </Link>
                    );
                  })}

                  <Link
                    href="/san-pham"
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "mt-4 rounded-full bg-white text-slate-950 hover:bg-white/90",
                    )}
                  >
                    Mở catalogue
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
