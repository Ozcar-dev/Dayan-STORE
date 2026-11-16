import { formatPrice } from '@/lib/utils'
import type { BasketLine, Product } from '@/types'

export const MAX_LINES = 20
export const MAX_QUANTITY = 10

export interface BasketItem {
  key: string
  line: BasketLine
  product: Product
}

export function clampQuantity(value: number) {
  return Math.min(MAX_QUANTITY, Math.max(1, Math.round(value)))
}

export function lineKey(
  line: Pick<BasketLine, 'productId' | 'size' | 'colour'>,
) {
  return [line.productId, line.size, line.colour].join('|')
}

export function buildOrderMessage(items: BasketItem[], origin: string) {
  const withLinks = items.length <= 8

  const rows = items.map(({ line, product }, index) => {
    const details = [
      line.size && `size ${line.size}`,
      line.colour && `colour ${line.colour}`,
    ]
      .filter(Boolean)
      .join(', ')

    const text = `${index + 1}. ${product.name}${details ? ` (${details})` : ''} x${line.quantity} - ${formatPrice(product.price * line.quantity)}`

    return withLinks ? `${text}\n${origin}/shop/${product.id}` : text
  })

  const total = items.reduce(
    (sum, { line, product }) => sum + product.price * line.quantity,
    0,
  )

  return [
    'Hello, I would like to order:',
    '',
    ...rows,
    '',
    `Items total: ${formatPrice(total)}`,
    'Please confirm availability and the delivery fee.',
  ].join('\n')
}