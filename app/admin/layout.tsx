export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#eef7ff_0%,#e3f0fb_38%,#d9e9f8_100%)] text-slate-950 dark:bg-slate-950 dark:text-white">
      {children}
    </main>
  );
}
