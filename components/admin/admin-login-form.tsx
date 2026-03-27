"use client";

import * as React from "react";
import { LoaderCircle, LockKeyhole, LogIn, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = React.useState("admin@poseidonbike.vn");
  const [password, setPassword] = React.useState("Poseidon@123");
  const [error, setError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "Không thể đăng nhập.");
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Không thể đăng nhập.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-[460px] border border-sky-100/70 bg-white/88 py-0 text-slate-950 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.28)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/82 dark:text-white dark:shadow-[0_40px_120px_-40px_rgba(2,6,23,0.75)]">
      <CardHeader className="space-y-4 px-6 pb-0 pt-6 md:px-8 md:pt-8">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-500/20 bg-sky-50 px-4 py-2 text-xs font-medium tracking-[0.22em] text-sky-700 uppercase dark:border-white/10 dark:bg-white/6 dark:text-sky-200">
          Admin Login
        </div>
        <CardTitle className="font-heading text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
          Đăng nhập quản trị Poseidon
        </CardTitle>
        <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
          Đăng nhập để vào dashboard quản lý sản phẩm, ảnh, màu sắc và thông số kỹ thuật.
        </p>
      </CardHeader>

      <CardContent className="space-y-5 px-6 pb-6 pt-5 md:px-8 md:pb-8">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Email admin
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-12 rounded-2xl border-slate-200 bg-white pl-11 text-slate-950 placeholder:text-slate-400 dark:border-white/10 dark:bg-white/6 dark:text-white dark:placeholder:text-slate-400"
                placeholder="admin@poseidonbike.vn"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Mật khẩu
            </label>
            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-12 rounded-2xl border-slate-200 bg-white pl-11 text-slate-950 placeholder:text-slate-400 dark:border-white/10 dark:bg-white/6 dark:text-white dark:placeholder:text-slate-400"
                placeholder="Nhập mật khẩu"
              />
            </div>
          </div>

          {error ? (
            <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-700 dark:text-rose-100">
              {error}
            </div>
          ) : null}

          <Button
            type="submit"
            className="h-12 w-full rounded-2xl bg-sky-500 text-white hover:bg-sky-600 dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <LogIn className="size-4" />
            )}
            Vào dashboard
          </Button>
        </form>

        <div className="rounded-2xl border border-slate-200 bg-slate-50/90 px-4 py-4 text-sm leading-7 text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
          Tài khoản mẫu đã seed:
          <br />
          Email: <span className="font-medium text-slate-950 dark:text-white">admin@poseidonbike.vn</span>
          <br />
          Mật khẩu: <span className="font-medium text-slate-950 dark:text-white">Poseidon@123</span>
        </div>
      </CardContent>
    </Card>
  );
}
