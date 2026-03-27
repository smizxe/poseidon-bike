insert into public.products (
  slug,
  name,
  category_slug,
  category_label,
  badge,
  card_description,
  detail_title,
  detail_description,
  feature_image_url,
  card_tags,
  card_highlights,
  weight,
  wheel_size,
  frame_summary,
  published,
  sort_order
)
values
  (
    'poseidon-ps250',
    'Poseidon PS250',
    'hybrid',
    'Hybrid',
    'Commuter',
    'Khung nhôm 6061, càng Magie đúc nguyên khối, Shimano 2x8 và phanh dầu MT200 cho nhu cầu đi phố lẫn touring nhẹ.',
    'Poseidon PS250',
    'Poseidon PS250 là mẫu xe flat-bar thiên đô thị và touring nhẹ, cân bằng giữa tư thế lái thoải mái, cấu hình ổn định và diện mạo hiện đại cho những hành trình mỗi ngày.',
    '/products/ps250.jpg',
    array['Nhôm 6061', 'Shimano 2x8', 'Phanh dầu MT200', '700x32c'],
    array['Khung nhôm 6061, càng Magie đúc nguyên khối', 'Tay đề Shimano M315 2x8, gạt líp Altus M310', 'Đùi nhôm Prowheel 30-46T, líp thả 11-32T', 'Vành nhôm 2 lớp 4cm, lốp Kenda 700x32c'],
    '14 kg',
    '700x32c (~28 inch)',
    'Nhôm 6061 + càng Magie · 700x32c',
    true,
    5
  ),
  (
    'poseidon-ps101',
    'Poseidon PS101',
    'fold',
    'Xe gấp',
    'Gấp gọn',
    'Xe gấp khung nhôm bền bỉ, Shimano 1x8, phanh đĩa cơ — gọn nhẹ cho đô thị.',
    'Poseidon PS101',
    'Xe gấp đô thị cho nhu cầu đi lại hàng ngày, gấp gọn nhanh và bền bỉ cho không gian sống hiện đại.',
    '/products/ps101.jpg',
    array['Khung nhôm', 'Shimano 1x8', 'Phanh đĩa cơ', 'Bánh 20 inch'],
    array['Tay đề Shimano M315 chính hãng', 'Gạt líp Shimano TY300 chính hãng', 'Bàn đạp nhôm bạc đạn siêu trơn'],
    '~14 kg',
    '20 inch',
    'Nhôm · 20 inch',
    true,
    10
  ),
  (
    'poseidon-ps103',
    'Poseidon PS103',
    'fold',
    'Xe gấp',
    'Nâng cấp',
    'Khung nhôm 6061, vành 2 lớp mạ inox, lốp CST Ironkid — nâng cấp cho dân phố.',
    'Poseidon PS103',
    'Phiên bản xe gấp nâng cấp cho nhu cầu đô thị với cấu hình thực dụng và hoàn thiện cao hơn.',
    '/products/ps103.jpg',
    array['Nhôm 6061', 'Shimano 8 tốc', 'Phanh đĩa cơ', 'Bánh 20 inch'],
    array['Tay đề Shimano SLM315 Indonesia', 'Đề sau Shimano Tourney Altus', 'Vành nhôm 2 lớp dày 4cm mạ inox', 'Lốp CST Ironkid 20x1.75'],
    '~14 kg',
    '20 inch',
    'Nhôm 6061 · 20 inch',
    true,
    20
  ),
  (
    'poseidon-ps300',
    'Poseidon PS300',
    'mtb',
    'MTB',
    'MTB',
    'MTB khung nhôm không mối hàn, phanh dầu Shimano MT200, phuộc dầu — chinh phục mọi địa hình.',
    'Poseidon PS300',
    'Mẫu MTB cân bằng giữa độ bền, khả năng kiểm soát và cấu hình dễ tiếp cận cho rider mới lẫn người nâng cấp.',
    '/products/ps300.jpg',
    array['Nhôm không mối hàn', 'Shimano 3x8', 'Phanh dầu MT200', '27.5 inch'],
    array['Phuộc dầu vai nhôm ống nhôm', 'Tay đề Shimano M315 3x8', 'Líp Shimano HG200 12-32T', 'Trục rỗng, đùi nhôm 24-34-42T'],
    '14 kg',
    '27.5 inch',
    'Nhôm không mối hàn · 27.5 inch',
    true,
    30
  ),
  (
    'poseidon-ps600',
    'Poseidon PS600',
    'hybrid',
    'Hybrid',
    'Best Seller',
    'Khung-càng Magie đúc nguyên khối, phanh dầu Shimano MT200 — nhẹ chỉ 13,6 kg.',
    'Poseidon PS600',
    'Mẫu hybrid thiên về di chuyển đường phố và luyện tập thể thao với cấu trúc khung-càng Magie đúc nguyên khối.',
    '/products/ps600.jpg',
    array['Magie đúc nguyên khối', 'Shimano 3x8', 'Phanh dầu MT200', '700x32c'],
    array['Khung-càng Magie đúc nguyên khối', 'Đùi nhôm Shimano TY301 28-38-48T', 'Líp Shimano HG200-8 12-32T', 'Yên da mềm có rãnh giữa'],
    '13,6 kg',
    '700x32c (~28 inch)',
    'Magie đúc nguyên khối · 700x32c',
    true,
    40
  ),
  (
    'poseidon-ps650',
    'Poseidon PS650',
    'road',
    'Road',
    'Road Entry',
    'Road entry-performance với khung Magie đúc nguyên khối, Sensah Reflex 2x8 và vóc dáng tốc độ dễ tiếp cận.',
    'Poseidon PS650',
    'Poseidon PS650 mang tinh thần road hiện đại với khung Magie đúc nguyên khối, tư thế lái drop-bar gọn gàng và cấu hình Sensah Reflex 2x8 phù hợp cho rider mới bắt đầu nghiêm túc với tốc độ.',
    '/products/ps650.jpg',
    array['Khung Magie', 'Sensah Reflex 2x8', '700x28c', '14,2 kg'],
    array['Khung Magie đúc nguyên khối', 'Tay lắc Sensah Reflex 2x8', 'Líp thả 11-32T, đùi nhôm Poseidon 34-50T', 'Vành nhôm 2 lớp 4cm, lốp 700x28c'],
    '14,2 kg',
    '700x28c (~28 inch)',
    'Magie đúc nguyên khối · 700x28c',
    true,
    45
  ),
  (
    'poseidon-ps700',
    'Poseidon PS700',
    'road',
    'Road',
    'Premium',
    'Khung-càng Magie, full Shimano Claris R2000, phanh dầu MT200 — chỉ 12,3 kg.',
    'Poseidon PS700',
    'Mẫu road premium cho rider ưu tiên tốc độ, cảm giác lái ổn định và ngôn ngữ thiết kế khí động học rõ nét.',
    '/products/ps700.jpg',
    array['Magie đúc nguyên khối', 'Shimano Claris 2x8', 'Phanh dầu MT200', '700x32c'],
    array['Khung + càng Magie đúc nguyên khối', 'Full groupset Shimano Claris R2000', 'Phanh đĩa dầu Shimano MT200', 'Pedal nhôm 4 bạc đạn'],
    '12,3 kg',
    '700x32c (~28 inch)',
    'Magie đúc nguyên khối · 700x32c',
    true,
    50
  ),
  (
    'poseidon-ps750',
    'Poseidon PS750',
    'road',
    'Road',
    'Giá tốt',
    'Khung Magie, càng nhôm không mối hàn, Shimano Claris R2000 — 12,8 kg road giá tốt.',
    'Poseidon PS750',
    'Mẫu road giá tốt cho rider muốn vào thế giới road với nền tảng khung Magie, Claris và hình thức khỏe khoắn.',
    '/products/ps750.jpg',
    array['Magie + Nhôm', 'Shimano Claris 2x8', 'Phanh đĩa cơ', '700x32c'],
    array['Khung Magie đúc nguyên khối', 'Càng nhôm không mối hàn', 'Full groupset Shimano Claris R2000', 'Yên da mềm có rãnh giữa'],
    '12,8 kg',
    '700x32c (~28 inch)',
    'Magie + Nhôm · 700x32c',
    true,
    60
)
on conflict (slug) do nothing;

insert into public.admin_users (
  email,
  full_name,
  password_hash,
  is_active
)
values (
  'admin@poseidonbike.vn',
  'Poseidon Admin',
  'scrypt$ce1052cc86449a6629e6818981e127d5$356cc6233961b6d3f4d2faf37da22ef86db8a0fdb9f12eda30de6883dfc6e9354825d3900ac5c992683b2d33161b02775e157ec648d4c1aef7c4d93b03561e30',
  true
)
on conflict (email) do update
set
  full_name = excluded.full_name,
  password_hash = excluded.password_hash,
  is_active = excluded.is_active;

with seeded_products as (
  select id, slug
  from public.products
  where slug in (
    'poseidon-ps250',
    'poseidon-ps101',
    'poseidon-ps103',
    'poseidon-ps300',
    'poseidon-ps600',
    'poseidon-ps650',
    'poseidon-ps700',
    'poseidon-ps750'
  )
)
delete from public.product_specifications
where product_id in (select id from seeded_products);

with seeded_products as (
  select id, slug
  from public.products
  where slug in (
    'poseidon-ps250',
    'poseidon-ps101',
    'poseidon-ps103',
    'poseidon-ps300',
    'poseidon-ps600',
    'poseidon-ps650',
    'poseidon-ps700',
    'poseidon-ps750'
  )
)
delete from public.product_colors
where product_id in (select id from seeded_products);

insert into public.product_specifications (product_id, label, value, sort_order)
select
  products.id,
  seeded.label,
  seeded.value,
  seeded.sort_order
from (
  values
    ('poseidon-ps250', 'Khung', 'Nhôm 6061', 10),
    ('poseidon-ps250', 'Càng', 'Magie đúc nguyên khối', 20),
    ('poseidon-ps250', 'Phanh', 'Phanh dầu Shimano MT200', 30),
    ('poseidon-ps250', 'Tay đề', 'Shimano M315 2x8', 40),
    ('poseidon-ps250', 'Gạt líp', 'Shimano Altus M310 8s', 50),
    ('poseidon-ps250', 'Đùi đĩa', 'Prowheel 30-46T', 60),
    ('poseidon-ps250', 'Líp', '11-32T', 70),
    ('poseidon-ps250', 'Bánh xe', '700x32c (~28 inch)', 80),
    ('poseidon-ps250', 'Khối lượng', '14 kg', 90),
    ('poseidon-ps101', 'Khung', 'Hợp kim nhôm gấp gọn', 10),
    ('poseidon-ps101', 'Càng', 'Thép chịu lực đô thị', 20),
    ('poseidon-ps101', 'Tay đề', 'Shimano M315 1x8', 30),
    ('poseidon-ps101', 'Phanh', 'Phanh đĩa cơ', 40),
    ('poseidon-ps101', 'Lốp', '20 x 1.75', 50),
    ('poseidon-ps101', 'Trọng lượng', '~14 kg', 60),
    ('poseidon-ps103', 'Khung', 'Nhôm 6061 gấp gọn', 10),
    ('poseidon-ps103', 'Vành', 'Nhôm 2 lớp mạ inox', 20),
    ('poseidon-ps103', 'Tay đề', 'Shimano SL-M315', 30),
    ('poseidon-ps103', 'Đề sau', 'Shimano Tourney Altus', 40),
    ('poseidon-ps103', 'Lốp', 'CST Ironkid 20x1.75', 50),
    ('poseidon-ps103', 'Trọng lượng', '~14 kg', 60),
    ('poseidon-ps300', 'Khung', 'Nhôm không mối hàn, dây âm khung', 10),
    ('poseidon-ps300', 'Phuộc', 'Phuộc dầu vai nhôm ống nhôm', 20),
    ('poseidon-ps300', 'Tay đề', 'Shimano M315 3x8', 30),
    ('poseidon-ps300', 'Líp', 'Shimano HG200 12-32T', 40),
    ('poseidon-ps300', 'Đùi đĩa', 'Nhôm 24-34-42T', 50),
    ('poseidon-ps300', 'Bánh xe', '27.5 inch', 60),
    ('poseidon-ps600', 'Khung/càng', 'Magie đúc nguyên khối', 10),
    ('poseidon-ps600', 'Phanh', 'Shimano MT200 dầu', 20),
    ('poseidon-ps600', 'Đùi đĩa', 'Shimano TY301 28-38-48T', 30),
    ('poseidon-ps600', 'Líp', 'Shimano HG200-8 12-32T', 40),
    ('poseidon-ps600', 'Lốp', 'Kenda 700x32c', 50),
    ('poseidon-ps600', 'Trọng lượng', '13,6 kg', 60),
    ('poseidon-ps650', 'Khung', 'Magie đúc nguyên khối', 10),
    ('poseidon-ps650', 'Tay lắc', 'Sensah Reflex 2x8', 20),
    ('poseidon-ps650', 'Gạt đĩa', 'Sensah Reflex 2s', 30),
    ('poseidon-ps650', 'Củ đề', 'Sensah Reflex 8s', 40),
    ('poseidon-ps650', 'Líp', '11-32T', 50),
    ('poseidon-ps650', 'Đùi đĩa', 'Poseidon 34-50T', 60),
    ('poseidon-ps650', 'Bánh xe', '700x28c (~28 inch)', 70),
    ('poseidon-ps650', 'Khối lượng', '14,2 kg', 80),
    ('poseidon-ps700', 'Khung/càng', 'Magie đúc nguyên khối', 10),
    ('poseidon-ps700', 'Groupset', 'Shimano Claris R2000 2x8', 20),
    ('poseidon-ps700', 'Phanh', 'Shimano MT200 + UR300', 30),
    ('poseidon-ps700', 'Líp', 'Shimano HG41 11-32T', 40),
    ('poseidon-ps700', 'Lốp', '700x32c', 50),
    ('poseidon-ps700', 'Trọng lượng', '12,3 kg', 60),
    ('poseidon-ps750', 'Khung', 'Magie đúc nguyên khối', 10),
    ('poseidon-ps750', 'Càng', 'Nhôm không mối hàn', 20),
    ('poseidon-ps750', 'Groupset', 'Shimano Claris R2000 2x8', 30),
    ('poseidon-ps750', 'Phanh', 'Phanh đĩa cơ Poseidon', 40),
    ('poseidon-ps750', 'Lốp', '700x32c', 50),
    ('poseidon-ps750', 'Trọng lượng', '12,8 kg', 60)
) as seeded(slug, label, value, sort_order)
join public.products on products.slug = seeded.slug;

insert into public.product_colors (product_id, name, slug, swatch_hex, is_default, sort_order)
select
  products.id,
  seeded.name,
  seeded.slug,
  seeded.swatch_hex,
  seeded.is_default,
  seeded.sort_order
from (
  values
    ('poseidon-ps250', 'Trắng ngọc', 'trang-ngoc', '#f5f5f4', true, 10),
    ('poseidon-ps250', 'Đen graphite', 'den-graphite', '#1f2937', false, 20),
    ('poseidon-ps101', 'Bạc đô thị', 'bac-do-thi', '#d5d8de', true, 10),
    ('poseidon-ps101', 'Xám graphite', 'xam-graphite', '#4b5563', false, 20),
    ('poseidon-ps103', 'Xanh navy', 'xanh-navy', '#1e3a8a', true, 10),
    ('poseidon-ps103', 'Bạc sáng', 'bac-sang', '#d7dde5', false, 20),
    ('poseidon-ps300', 'Đen stealth', 'den-stealth', '#111827', true, 10),
    ('poseidon-ps300', 'Xanh rêu đậm', 'xanh-reu-dam', '#334155', false, 20),
    ('poseidon-ps600', 'Đen phố', 'den-pho', '#16181d', true, 10),
    ('poseidon-ps600', 'Xám titan', 'xam-titan', '#9ca3af', false, 20),
    ('poseidon-ps650', 'Titan matte', 'titan-matte', '#7c7f85', true, 10),
    ('poseidon-ps650', 'Đen stealth', 'den-stealth', '#111827', false, 20),
    ('poseidon-ps700', 'Carbon blue', 'carbon-blue', '#243b78', true, 10),
    ('poseidon-ps700', 'Titan silver', 'titan-silver', '#d1d5db', false, 20),
    ('poseidon-ps750', 'Graphite black', 'graphite-black', '#1f2937', true, 10),
    ('poseidon-ps750', 'Ocean bronze', 'ocean-bronze', '#b45309', false, 20)
) as seeded(product_slug, name, slug, swatch_hex, is_default, sort_order)
join public.products on products.slug = seeded.product_slug
on conflict (product_id, slug) do update
set
  name = excluded.name,
  swatch_hex = excluded.swatch_hex,
  is_default = excluded.is_default,
  sort_order = excluded.sort_order;

insert into public.product_color_images (product_color_id, image_url, alt_text, sort_order)
select
  colors.id,
  seeded.image_url,
  seeded.alt_text,
  seeded.sort_order
from (
  values
    ('poseidon-ps250', 'trang-ngoc', '/products/ps250.jpg', 'Poseidon PS250 trắng ngọc - ảnh 1', 10),
    ('poseidon-ps250', 'trang-ngoc', '/products/ps250-2.jpg', 'Poseidon PS250 trắng ngọc - ảnh 2', 20),
    ('poseidon-ps250', 'trang-ngoc', '/products/ps250-3.jpg', 'Poseidon PS250 trắng ngọc - ảnh 3', 30),
    ('poseidon-ps250', 'den-graphite', '/products/ps250.jpg', 'Poseidon PS250 đen graphite - ảnh 1', 10),
    ('poseidon-ps101', 'bac-do-thi', '/products/ps101.jpg', 'Poseidon PS101 bạc đô thị - ảnh 1', 10),
    ('poseidon-ps101', 'bac-do-thi', '/products/ps101-2.jpg', 'Poseidon PS101 bạc đô thị - ảnh 2', 20),
    ('poseidon-ps101', 'bac-do-thi', '/products/ps101-3.jpg', 'Poseidon PS101 bạc đô thị - ảnh 3', 30),
    ('poseidon-ps101', 'xam-graphite', '/products/ps101.jpg', 'Poseidon PS101 xám graphite - ảnh 1', 10),
    ('poseidon-ps101', 'xam-graphite', '/products/ps101-2.jpg', 'Poseidon PS101 xám graphite - ảnh 2', 20),
    ('poseidon-ps103', 'xanh-navy', '/products/ps103.jpg', 'Poseidon PS103 xanh navy - ảnh 1', 10),
    ('poseidon-ps103', 'xanh-navy', '/products/ps103-2.jpg', 'Poseidon PS103 xanh navy - ảnh 2', 20),
    ('poseidon-ps103', 'xanh-navy', '/products/ps103-3.jpg', 'Poseidon PS103 xanh navy - ảnh 3', 30),
    ('poseidon-ps103', 'bac-sang', '/products/ps103.jpg', 'Poseidon PS103 bạc sáng - ảnh 1', 10),
    ('poseidon-ps103', 'bac-sang', '/products/ps103-2.jpg', 'Poseidon PS103 bạc sáng - ảnh 2', 20),
    ('poseidon-ps300', 'den-stealth', '/products/ps300.jpg', 'Poseidon PS300 đen stealth - ảnh 1', 10),
    ('poseidon-ps300', 'den-stealth', '/products/ps300-2.jpg', 'Poseidon PS300 đen stealth - ảnh 2', 20),
    ('poseidon-ps300', 'den-stealth', '/products/ps300-3.jpg', 'Poseidon PS300 đen stealth - ảnh 3', 30),
    ('poseidon-ps300', 'xanh-reu-dam', '/products/ps300.jpg', 'Poseidon PS300 xanh rêu đậm - ảnh 1', 10),
    ('poseidon-ps600', 'den-pho', '/products/ps600.jpg', 'Poseidon PS600 đen phố - ảnh 1', 10),
    ('poseidon-ps600', 'den-pho', '/products/ps600-2.jpg', 'Poseidon PS600 đen phố - ảnh 2', 20),
    ('poseidon-ps600', 'den-pho', '/products/ps600-3.jpg', 'Poseidon PS600 đen phố - ảnh 3', 30),
    ('poseidon-ps600', 'xam-titan', '/products/ps600.jpg', 'Poseidon PS600 xám titan - ảnh 1', 10),
    ('poseidon-ps650', 'titan-matte', '/products/ps650.jpg', 'Poseidon PS650 titan matte - ảnh 1', 10),
    ('poseidon-ps650', 'titan-matte', '/products/ps650-2.jpg', 'Poseidon PS650 titan matte - ảnh 2', 20),
    ('poseidon-ps650', 'titan-matte', '/products/ps650-3.jpg', 'Poseidon PS650 titan matte - ảnh 3', 30),
    ('poseidon-ps650', 'den-stealth', '/products/ps650.jpg', 'Poseidon PS650 đen stealth - ảnh 1', 10),
    ('poseidon-ps700', 'carbon-blue', '/products/ps700.jpg', 'Poseidon PS700 carbon blue - ảnh 1', 10),
    ('poseidon-ps700', 'carbon-blue', '/products/ps700-2.jpg', 'Poseidon PS700 carbon blue - ảnh 2', 20),
    ('poseidon-ps700', 'carbon-blue', '/products/ps700-3.jpg', 'Poseidon PS700 carbon blue - ảnh 3', 30),
    ('poseidon-ps700', 'titan-silver', '/products/ps700.jpg', 'Poseidon PS700 titan silver - ảnh 1', 10),
    ('poseidon-ps750', 'graphite-black', '/products/ps750.jpg', 'Poseidon PS750 graphite black - ảnh 1', 10),
    ('poseidon-ps750', 'graphite-black', '/products/ps750-2.jpg', 'Poseidon PS750 graphite black - ảnh 2', 20),
    ('poseidon-ps750', 'graphite-black', '/products/ps750-3.jpg', 'Poseidon PS750 graphite black - ảnh 3', 30),
    ('poseidon-ps750', 'ocean-bronze', '/products/ps750.jpg', 'Poseidon PS750 ocean bronze - ảnh 1', 10)
) as seeded(product_slug, color_slug, image_url, alt_text, sort_order)
join public.products on products.slug = seeded.product_slug
join public.product_colors colors
  on colors.product_id = products.id
 and colors.slug = seeded.color_slug;
