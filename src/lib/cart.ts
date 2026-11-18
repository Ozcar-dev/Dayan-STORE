import type { CartLine, Product } from '@/types'

export const MAX_LINES = 20
export const MAX_QUANTITY = 10

export interface CartItem {
  key: string
  line: CartLine
  product: Product
}

export function clampQuantity(value: number) {
  return Math.min(MAX_QUANTITY, Math.max(1, Math.round(value)))
}

export function lineKey(
  line: Pick<CartLine, 'productId' | 'size' | 'colour'>,
) {
  return [line.productId, line.size, line.colour].join('|')
}