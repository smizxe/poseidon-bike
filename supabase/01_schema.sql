create extension if not exists pgcrypto;

create or replace function public.set_current_timestamp_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category_slug text not null,
  category_label text not null,
  badge text not null default '',
  card_description text not null default '',
  detail_title text not null default '',
  detail_description text not null default '',
  feature_image_url text not null default '',
  card_tags text[] not null default '{}',
  card_highlights text[] not null default '{}',
  weight text not null default '',
  wheel_size text not null default '',
  frame_summary text not null default '',
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_specifications (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  label text not null,
  value text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.product_colors (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  name text not null,
  slug text not null,
  swatch_hex text not null default '#0f172a',
  is_default boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  unique (product_id, slug)
);

create table if not exists public.product_color_images (
  id uuid primary key default gen_random_uuid(),
  product_color_id uuid not null references public.product_colors(id) on delete cascade,
  image_url text not null,
  alt_text text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  full_name text not null,
  password_hash text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at
before update on public.products
for each row
execute function public.set_current_timestamp_updated_at();

drop trigger if exists set_admin_users_updated_at on public.admin_users;
create trigger set_admin_users_updated_at
before update on public.admin_users
for each row
execute function public.set_current_timestamp_updated_at();

alter table public.products enable row level security;
alter table public.product_specifications enable row level security;
alter table public.product_colors enable row level security;
alter table public.product_color_images enable row level security;
alter table public.admin_users enable row level security;

drop policy if exists "Public can read published products" on public.products;
create policy "Public can read published products"
on public.products
for select
using (published = true);

drop policy if exists "Public can read product specifications" on public.product_specifications;
create policy "Public can read product specifications"
on public.product_specifications
for select
using (
  exists (
    select 1
    from public.products
    where products.id = product_specifications.product_id
      and products.published = true
  )
);

drop policy if exists "Public can read product colors" on public.product_colors;
create policy "Public can read product colors"
on public.product_colors
for select
using (
  exists (
    select 1
    from public.products
    where products.id = product_colors.product_id
      and products.published = true
  )
);

drop policy if exists "Public can read product color images" on public.product_color_images;
create policy "Public can read product color images"
on public.product_color_images
for select
using (
  exists (
    select 1
    from public.product_colors
    join public.products on products.id = product_colors.product_id
    where product_colors.id = product_color_images.product_color_id
      and products.published = true
  )
);

insert into storage.buckets (id, name, public)
values ('product-media', 'product-media', true)
on conflict (id) do nothing;
