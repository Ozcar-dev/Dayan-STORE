import { Link } from 'react-router-dom'
import { Skeleton } from '@/components/ui/skeleton'
import { CATEGORIES } from '@/constants/categories'
import type { Product } from '@/types'

interface CategoryTilesProps {
  products: Product[]
  loading: boolean
}

export function CategoryTiles({ products, loading }: CategoryTilesProps) {
  return (
    <section
      id="categories"
      className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6"
    >
      <h2 className="text-3xl font-semibold text-primary">Shop by category</h2>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
        {CATEGORIES.map((category) => {
          const count = products.filter(
            (product) => product.category === category.slug,
          ).length

          return (
            <Link
              key={category.slug}
              to={`/shop?category=${category.slug}`}
              className="group min-w-0 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary hover:bg-secondary"
            >
              <p className="font-heading text-lg font-semibold group-hover:text-primary">
                {category.name}
              </p>
              {loading ? (
                <Skeleton className="mt-2 h-4 w-16" />
              ) : (
                <p className="mt-1 text-sm text-muted-foreground">
                  {count} {count === 1 ? 'item' : 'items'}
                </p>
              )}
            </Link>
          )
        })}
      </div>
    </section>
  )
}