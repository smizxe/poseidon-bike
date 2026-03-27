import { NextResponse } from "next/server";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getSupabaseStorageBucket, isSupabaseAdminConfigured } from "@/lib/supabase/config";

function sanitizeFilename(filename: string) {
  return filename
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function POST(request: Request) {
  try {
    if (!isSupabaseAdminConfigured()) {
      return NextResponse.json(
        { error: "Supabase chưa được cấu hình để upload ảnh." },
        { status: 503 },
      );
    }

    const formData = await request.formData();
    const folder = String(formData.get("folder") || "products").trim();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Thiếu file upload." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = new Uint8Array(bytes);
    const filename = sanitizeFilename(file.name || "image.png");
    const path = `${folder}/${Date.now()}-${crypto.randomUUID()}-${filename}`;

    const supabase = createSupabaseAdminClient();
    if (!supabase) {
      return NextResponse.json({ error: "Không thể kết nối Supabase." }, { status: 500 });
    }

    const bucket = getSupabaseStorageBucket();
    const { error: uploadError } = await supabase.storage.from(bucket).upload(path, buffer, {
      cacheControl: "3600",
      contentType: file.type || "image/png",
      upsert: false,
    });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);

    return NextResponse.json({
      path,
      publicUrl: data.publicUrl,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload thất bại." },
      { status: 500 },
    );
  }
}
