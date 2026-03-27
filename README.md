# Poseidon Bikes Next.js

Web marketing site cho Poseidon kèm admin CRUD sản phẩm, dùng `Next.js + Tailwind + shadcn/ui + Supabase`.

## Chạy local

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

## Biến môi trường

Tạo file `.env.local` từ `.env.example`:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=product-media
```

Ý nghĩa:

- `NEXT_PUBLIC_SUPABASE_URL`: URL project Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: key public để đọc dữ liệu ở frontend/server public
- `SUPABASE_SERVICE_ROLE_KEY`: key admin để CRUD sản phẩm và upload ảnh từ route admin
- `NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET`: bucket chứa ảnh sản phẩm, mặc định là `product-media`

## Setup Supabase

Chạy SQL theo thứ tự:

1. [supabase/01_schema.sql](D:/Project%20Code%20Kiem%20Tien/xe%20dap%20poseidon/poseidon-next/supabase/01_schema.sql)
2. [supabase/02_seed.sql](D:/Project%20Code%20Kiem%20Tien/xe%20dap%20poseidon/poseidon-next/supabase/02_seed.sql)

Schema hiện có:

- `products`
- `product_specifications`
- `product_colors`
- `product_color_images`
- bucket storage `product-media`

## Route chính

- `/`: trang chủ
- `/san-pham`: catalogue sản phẩm
- `/san-pham/[slug]`: trang chi tiết sản phẩm
- `/ve-chung-toi`: trang giới thiệu
- `/dai-ly`: trang đại lý
- `/admin/products`: admin quản lý sản phẩm

## Admin sản phẩm

Trang admin hiện hỗ trợ:

- tạo, sửa, xóa sản phẩm
- chỉnh nội dung card catalogue
- preview card realtime ở cột phải
- chỉnh trang chi tiết sản phẩm
- quản lý thông số kỹ thuật
- dòng nào không nhập sẽ tự ẩn ở trang chi tiết
- quản lý màu sắc chung cho từng sản phẩm
- upload nhiều ảnh cho từng màu
- ảnh upload lên Supabase Storage

## Lưu ý

- Nếu chưa cấu hình Supabase, site public vẫn chạy bằng dữ liệu fallback để demo UI.
- CRUD và upload trong admin chỉ hoạt động khi đã có đủ env Supabase.
- Hiện tại admin chưa có lớp đăng nhập/phân quyền; nếu deploy public nên bổ sung auth trước khi mở route admin.

## Kiểm tra

```bash
npm run lint
npm run build
```
