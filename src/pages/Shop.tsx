import { ProductGrid } from '@/components/sections/ProductGrid'
import { ProductsError } from '@/components/sections/ProductsError'
import { ShopFilters } from '@/components/sections/ShopFilters'
import { ShopSkeleton } from '@/components/sections/ShopSkeleton'
import { useProductFilters } from '@/hooks/use-product-filters'
import { useProducts } from '@/hooks/use-products'

export default function Shop() {
  const { products, isLoading, isError, refetch } = useProducts()
  const { query, category, filtered, setQuery, setCategory, clearFilters } =
    useProductFilters(products)

  if (isLoading) return <ShopSkeleton />

  if (isError) {
    return (
      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <h1 className="text-4xl font-semibold text-primary">Shop</h1>
        <div className="mt-8">
          <ProductsError onRetry={() => void refetch()} />
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-4xl font-semibold text-primary">Shop</h1>
      <p className="mt-1 text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
      </p>

      <div className="mt-6">
        <ShopFilters
          query={query}
          category={category}
          onQueryChange={setQuery}
          onCategoryChange={setCategory}
        />
      </div>

      <div className="mt-8">
        <ProductGrid
          products={filtered}
          query={query}
          onClear={clearFilters}
        />
      </div>
    </section>
  )
}