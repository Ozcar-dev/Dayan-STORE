import type { StockStatus } from '@/types'

export const STOCK_OPTIONS: { value: StockStatus; label: string }[] = [
  { value: 'in-stock', label: 'In stock' },
  { value: 'limited', label: 'Limited stock' },
  { value: 'sold-out', label: 'Sold out' },
]