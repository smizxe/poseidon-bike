import { Waves } from "lucide-react";

import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { redirectIfAuthenticated } from "@/lib/admin-auth";

export default async function AdminLoginPage() {
  await redirectIfAuthenticated();

  return (
    <div className="relative min-h-screen overflow-hidden px-6 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(56,189,248,0.18),transparent_24%),radial-gradient(circle_at_80%_16%,rgba(37,99,235,0.12),transparent_24%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.12),transparent_24%),radial-gradient(circle_at_80%_18%,rgba(59,130,246,0.18),transparent_24%)]" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-[radial-gradient(circle_at_bottom,rgba(56,189,248,0.12),transparent_58%)] dark:bg-[radial-gradient(circle_at_bottom,rgba(56,189,248,0.16),transparent_58%)]" />

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center gap-10 lg:grid lg:grid-cols-[0.95fr_0.75fr]">
        <div className="hidden max-w-2xl space-y-6 lg:block">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-500/20 bg-white/70 px-4 py-2 text-xs font-medium tracking-[0.22em] text-sky-700 uppercase shadow-[0_10px_40px_-24px_rgba(14,116,144,0.35)] backdrop-blur-md dark:border-white/10 dark:bg-white/6 dark:text-sky-200">
            <Waves className="size-3.5" />
            Poseidon Admin
          </div>
          <h1 className="font-heading text-5xl leading-tight font-semibold tracking-tight text-slate-950 dark:text-white">
            Đăng nhập để quản lý catalogue xe đạp Poseidon.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Từ một màn hình duy nhất, admin có thể cập nhật card catalogue, ảnh theo màu,
            thông số kỹ thuật và trang chi tiết cho từng model.
          </p>
        </div>

        <AdminLoginForm />
      </div>
    </div>
  );
}
