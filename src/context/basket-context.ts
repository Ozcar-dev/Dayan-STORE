import { createContext } from 'react'
import type { BasketLine } from '@/types'

export interface BasketContextValue {
  lines: BasketLine[]
  count: number
  add: (
    line: Pick<BasketLine, 'productId' | 'size' | 'colour'>,
    quantity: number,
  ) => boolean
  setQuantity: (key: string, quantity: number) => void
  remove: (key: string) => void
  clear: () => void
}

export const BasketContext = createContext<BasketContextValue | null>(null)