import { Link } from "react-router-dom";
import { DeliveryNote } from "@/components/ui/DeliveryNote";
import { PriceTag } from "@/components/ui/PriceTag";
import { ProductImage } from "@/components/ui/ProductImage";
import { Rating } from "@/components/ui/Rating";
import { StockBadge } from "@/components/ui/StockBadge";
import { SHOW_RATINGS } from "@/constants/site";
import { thumbUrl } from "@/lib/image-url";
import { ratingFor } from "@/lib/rating";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  noteSlot?: number;
}

export function ProductCard({ product, noteSlot = 0 }: ProductCardProps) {
  const soldOut = product.stock === "sold-out";

  return (
    <Link
      to={`/shop/${product.id}`}
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground transition-shadow hover:shadow-md"
    >
      <div className="relative">
        <div className="relative aspect-square w-full overflow-hidden bg-muted">
          <ProductImage
            src={thumbUrl(product.images[0])}
            alt={product.name}
            className="h-full w-full object-cover group-hover:scale-105"
          />
          <div className="absolute left-3 top-3">
            <StockBadge stock={product.stock} />
          </div>
        </div>

        <PriceTag
          price={product.price}
          muted={soldOut}
          className="absolute -bottom-9 right-3 z-10"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3.5">
        <h3 className="line-clamp-2 pr-24 font-heading font-semibold group-hover:text-primary">
          {product.name}
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {product.description}
        </p>

        {SHOW_RATINGS && <Rating value={ratingFor(product.id)} />}

        <DeliveryNote slot={noteSlot} className="mt-auto" />
      </div>
    </Link>
  );
}
