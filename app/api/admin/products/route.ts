import { NextResponse } from "next/server";

import { listAdminProducts, saveAdminProduct } from "@/lib/products";

export async function GET() {
  try {
    const products = await listAdminProducts();
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Không thể tải sản phẩm." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const product = await saveAdminProduct(payload);
    return NextResponse.json({ product });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Không thể tạo sản phẩm." },
      { status: 500 },
    );
  }
}
