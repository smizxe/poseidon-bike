import { NextResponse } from "next/server";

import { deleteAdminProduct, saveAdminProduct } from "@/lib/products";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const payload = await request.json();
    const product = await saveAdminProduct(payload, id);
    return NextResponse.json({ product });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Không thể cập nhật sản phẩm." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    await deleteAdminProduct(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Không thể xóa sản phẩm." },
      { status: 500 },
    );
  }
}
