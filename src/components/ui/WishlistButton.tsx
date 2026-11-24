import { Heart } from 'lucide-react'
import { useWishlist } from '@/hooks/use-wishlist'
import { cn } from '@/lib/utils'

interface WishlistButtonProps {
  productId: string
  className?: string
}

export function WishlistButton({ productId, className }: WishlistButtonProps) {
  const { has, toggle } = useWishlist()
  const saved = has(productId)

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
      onClick={() => toggle(productId)}
      className={cn(
        'flex h-10 w-10 items-center justify-center rounded-full bg-background/90 text-primary shadow-sm transition-transform hover:scale-110 active:scale-90',
        className,
      )}
    >
      <Heart
        key={saved ? 'saved' : 'empty'}
        size={20}
        fill={saved ? 'currentColor' : 'none'}
        className={saved ? 'animate-pop' : undefined}
      />
    </button>
  )
}