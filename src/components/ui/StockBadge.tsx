import { Badge } from '@/components/ui/badge'
import type { StockStatus } from '@/types'

export function StockBadge({ stock }: { stock: StockStatus }) {
  if (stock === 'limited') return <Badge variant="limited">Limited stock</Badge>
  if (stock === 'sold-out') return <Badge variant="sold-out">Sold out</Badge>
  return null
}