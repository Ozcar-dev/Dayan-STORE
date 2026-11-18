import { createContext } from 'react'
import type { CartLine } from '@/types'

export interface CartContextValue {
  lines: CartLine[]
  count: number
  add: (
    line: Pick<CartLine, 'productId' | 'size' | 'colour'>,
    quantity: number,
  ) => boolean
  setQuantity: (key: string, quantity: number) => void
  remove: (key: string) => void
  clear: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)