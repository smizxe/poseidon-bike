import Link from "next/link";
import { Box, LogOut, PanelTop, Store, Waves } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireAdminSession } from "@/lib/admin-auth";

export default async function AdminDashboardPage() {
  const session = await requireAdminSession();

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="overflow-hidden rounded-[2rem] border border-sky-100/70 bg-white/82 px-6 py-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.25)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80 dark:shadow-[0_30px_80px_-40px_rgba(2,6,23,0.7)] md:px-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-3">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-500/20 bg-sky-50 px-4 py-2 text-xs font-medium tracking-[0.22em] text-sky-700 uppercase dark:border-white/10 dark:bg-white/6 dark:text-sky-200">
                Admin Dashboard
              </div>
              <h1 className="font-heading text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">
                Xin chào, {session.fullName}
              </h1>
              <p className="max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300 md:text-base">
                Bạn đã đăng nhập với tài khoản {session.email}. Từ đây có thể đi nhanh đến
                quản lý sản phẩm hoặc các khu vực admin khác khi mình mở rộng tiếp.
              </p>
            </div>

            <form action="/api/admin/auth/logout" method="post">
              <Button
                type="submit"
                variant="outline"
                className="rounded-full border-slate-200 bg-white text-slate-900 hover:bg-slate-50 dark:border-white/15 dark:bg-white/6 dark:text-white dark:hover:bg-white/10"
              >
                <LogOut className="size-4" />
                Đăng xuất
              </Button>
            </form>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <Card className="border border-sky-100/70 bg-white/88 py-0 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.22)] dark:border-white/10 dark:bg-slate-900/82">
            <CardHeader>
              <PanelTop className="mb-3 size-10 text-sky-500 dark:text-sky-300" />
              <CardTitle className="font-heading text-2xl font-semibold text-slate-950 dark:text-white">
                Quản lý sản phẩm
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pb-6">
              <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                Chỉnh card catalogue, ảnh feature, màu sắc, thông số kỹ thuật và preview
                trang chi tiết sản phẩm.
              </p>
              <Link
                href="/admin/products"
                className="inline-flex h-11 items-center justify-center rounded-full bg-sky-500 px-5 text-sm font-medium text-white transition-colors hover:bg-sky-600 dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300"
              >
                Vào quản lý sản phẩm
              </Link>
            </CardContent>
          </Card>

          <Card className="border border-sky-100/70 bg-white/80 py-0 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.2)] dark:border-white/10 dark:bg-slate-900/76">
            <CardHeader>
              <Store className="mb-3 size-10 text-slate-500 dark:text-slate-300" />
              <CardTitle className="font-heading text-2xl font-semibold text-slate-950 dark:text-white">
                Quản lý đại lý
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-6 text-sm leading-7 text-slate-600 dark:text-slate-300">
              Khu vực này mình sẽ mở tiếp sau. Hiện tại dashboard giữ chỗ để sau này nối
              CRUD đại lý và hệ thống khu vực.
            </CardContent>
          </Card>

          <Card className="border border-sky-100/70 bg-white/80 py-0 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.2)] dark:border-white/10 dark:bg-slate-900/76">
            <CardHeader>
              <Box className="mb-3 size-10 text-slate-500 dark:text-slate-300" />
              <CardTitle className="font-heading text-2xl font-semibold text-slate-950 dark:text-white">
                Nội dung thương hiệu
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-6 text-sm leading-7 text-slate-600 dark:text-slate-300">
              Dành chỗ cho những phần như hero, trang về chúng tôi, footer content và cấu
              hình CTA toàn site nếu bạn muốn mở rộng admin sau.
            </CardContent>
          </Card>
        </div>

        <div className="rounded-[1.8rem] border border-sky-100/70 bg-white/80 px-6 py-5 text-sm leading-7 text-slate-600 shadow-[0_20px_50px_-38px_rgba(15,23,42,0.2)] backdrop-blur dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-300">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-950 dark:text-white">
            <Waves className="size-4 text-sky-500 dark:text-sky-300" />
            Luồng admin hiện tại
          </div>
          Vào <span className="font-medium text-slate-950 dark:text-white">/admin</span> sẽ tự kiểm tra session.
          Nếu đã đăng nhập, web chuyển sang <span className="font-medium text-slate-950 dark:text-white">/admin/dashboard</span>.
          Nếu chưa có session, web chuyển sang <span className="font-medium text-slate-950 dark:text-white">/admin/login</span>.
        </div>
      </div>
    </div>
  );
}
