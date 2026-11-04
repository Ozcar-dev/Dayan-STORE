import { Search, X } from 'lucide-react'
import { CATEGORIES } from '@/constants/categories'
import { cn } from '@/lib/utils'
import type { CategorySlug } from '@/types'

interface ShopFiltersProps {
  query: string
  category: CategorySlug | null
  onQueryChange: (value: string) => void
  onCategoryChange: (value: CategorySlug | null) => void
}

const chipClass = (active: boolean) =>
  cn(
    'rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors',
    active
      ? 'border-primary bg-primary text-primary-foreground'
      : 'border-border bg-card hover:bg-secondary',
  )

export function ShopFilters({
  query,
  category,
  onQueryChange,
  onCategoryChange,
}: ShopFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search dresses, bags, colours..."
          aria-label="Search products"
          className="w-full rounded-full border border-border bg-card py-3 pl-11 pr-11 text-base outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => onQueryChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-secondary"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onCategoryChange(null)}
          className={chipClass(category === null)}
        >
          All
        </button>
        {CATEGORIES.map((item) => (
          <button
            key={item.slug}
            type="button"
            onClick={() => onCategoryChange(item.slug)}
            className={chipClass(category === item.slug)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  )
}