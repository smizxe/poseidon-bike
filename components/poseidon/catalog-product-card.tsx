import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bike } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { outlineLinkClass, primaryLinkClass } from "@/lib/button-styles";
import { CatalogProduct } from "@/lib/catalog-types";
import { cn } from "@/lib/utils";

interface CatalogProductCardProps {
  product: CatalogProduct;
  showAction?: boolean;
  actionHref?: string;
  actionLabel?: string;
  className?: string;
}

export function CatalogProductCard({
  product,
  showAction = true,
  actionHref,
  actionLabel = "Tu van",
  className,
}: CatalogProductCardProps) {
  return (
    <Card className={cn("panel group relative h-full overflow-hidden py-0", className)}>
      <CardContent className="flex h-full flex-col gap-4 p-5">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted/30">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {product.badge ? (
            <div className="absolute left-3 top-3 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-sm">
              {product.badge}
            </div>
          ) : null}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <div className="text-xs tracking-[0.18em] text-primary uppercase">
              {product.categoryLabel}
            </div>
            <div className="text-xs text-muted-foreground">{product.weight}</div>
          </div>

          <h3 className="min-h-[4.5rem] font-heading text-2xl font-semibold">
            {product.name}
          </h3>
          <p className="min-h-[8.5rem] text-sm leading-7 text-muted-foreground">
            {product.tagline}
          </p>
        </div>

        <div className="flex min-h-[4.5rem] flex-wrap content-start gap-1.5">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border/60 bg-muted/50 px-3 py-1 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="min-h-[11.5rem] space-y-2 rounded-[1.5rem] border border-border/60 bg-background/70 p-4">
          {product.highlights.slice(0, 4).map((item) => (
            <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Bike className="mt-0.5 size-4 shrink-0 text-primary" />
              {item}
            </div>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
          {showAction ? (
            <>
              <Link href="/dai-ly" className={cn(outlineLinkClass, "px-4")}>
                Tu van
              </Link>
              <Link
                href={actionHref || `/san-pham/${product.slug}`}
                className={cn(primaryLinkClass, "px-4")}
              >
                {actionLabel === "Tu van" ? "Xem chi tiet" : actionLabel}
                <ArrowRight className="size-4" />
              </Link>
            </>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
