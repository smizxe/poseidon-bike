import { NextResponse } from "next/server";

import { authenticateAdmin, createAdminSessionCookie } from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const email = String(payload.email || "");
    const password = String(payload.password || "");

    if (!email || !password) {
      return NextResponse.json(
        { error: "Vui lòng nhập email và mật khẩu." },
        { status: 400 },
      );
    }

    const session = await authenticateAdmin(email, password);
    await createAdminSessionCookie(session);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Không thể đăng nhập." },
      { status: 401 },
    );
  }
}
