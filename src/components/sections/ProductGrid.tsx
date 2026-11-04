import { ProductCard } from '@/components/ui/ProductCard'
import { Button } from '@/components/ui/button'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import type { Product } from '@/types'

interface ProductGridProps {
  products: Product[]
  query: string
  onClear: () => void
}

export function ProductGrid({ products, query, onClear }: ProductGridProps) {
  if (products.length === 0) {
    const message = query.trim()
      ? `Hello, do you have something like "${query.trim()}"?`
      : 'Hello, I would like to make an enquiry.'

    return (
      <div className="rounded-2xl border border-border bg-card px-4 py-12 text-center">
        <p className="font-heading text-xl font-semibold text-primary">
          Nothing matches that yet
        </p>
        <p className="mt-2 text-muted-foreground">
          Try a different word or category, or ask us directly.
        </p>
        <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button variant="outline" onClick={onClear}>
            Clear filters
          </Button>
          <WhatsAppButton message={message} label="Ask us on WhatsApp" />
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}