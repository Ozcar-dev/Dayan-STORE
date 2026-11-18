import { useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
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
  const [open, setOpen] = useState(false)
  const activeName = CATEGORIES.find((item) => item.slug === category)?.name

  const choose = (value: CategorySlug | null) => {
    onCategoryChange(value)
    setOpen(false)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="relative min-w-0 flex-1 md:max-w-md">
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
            className="h-12 w-full rounded-full border border-border bg-card pl-11 pr-11 text-base outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"
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

        <button
          type="button"
          aria-expanded={open}
          aria-controls="shop-filter-panel"
          onClick={() => setOpen((value) => !value)}
          className={cn(
            'inline-flex h-12 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors',
            open || category
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border bg-card hover:bg-secondary',
          )}
        >
          <SlidersHorizontal size={18} />
          Filter
          {category && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-foreground px-1 text-xs font-bold text-primary">
              1
            </span>
          )}
        </button>
      </div>

      {open && (
        <div
          id="shop-filter-panel"
          className="flex flex-wrap gap-2 rounded-2xl border border-border bg-card p-3"
        >
          <button
            type="button"
            onClick={() => choose(null)}
            className={chipClass(category === null)}
          >
            All
          </button>
          {CATEGORIES.map((item) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => choose(item.slug)}
              className={chipClass(category === item.slug)}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}

      {activeName && !open && (
        <button
          type="button"
          onClick={() => onCategoryChange(null)}
          className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-sm font-semibold text-primary"
        >
          {activeName}
          <X size={14} />
          <span className="sr-only">Clear category filter</span>
        </button>
      )}
    </div>
  )
}