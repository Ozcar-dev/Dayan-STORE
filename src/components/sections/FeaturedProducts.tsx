import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ProductGridSkeleton } from "@/components/sections/ProductGridSkeleton";
import { ProductCard } from "@/components/ui/ProductCard";
import type { Product } from "@/types";

interface FeaturedProductsProps {
  products: Product[];
  loading: boolean;
}

export function FeaturedProducts({ products, loading }: FeaturedProductsProps) {
  const items = products
    .filter((product) => product.stock !== "sold-out")
    .slice(0, 4);

  if (!loading && items.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-3xl font-semibold text-primary">
          Shop the collection
        </h2>
        <Link
          to="/shop"
          className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          View all
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="mt-6">
        {loading ? (
          <ProductGridSkeleton count={4} className="lg:grid-cols-4" />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                noteSlot={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
