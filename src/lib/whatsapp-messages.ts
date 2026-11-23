import type { CartItem } from '@/lib/cart'
import { siteOrigin } from '@/lib/site-url'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types'

const MAX_LISTED = 8

interface ItemOrder {
  product: Product
  size?: string
  colour?: string
  quantity?: number
}

export function buildItemMessage({
  product,
  size,
  colour,
  quantity = 1,
}: ItemOrder) {
  const lines = [
    'Hello, I would like to order this item:',
    `*${product.name}*`,
    `Price: ${formatPrice(product.price)}`,
  ]

  if (size) lines.push(`Size: ${size}`)
  if (colour) lines.push(`Colour: ${colour}`)
  if (quantity > 1) lines.push(`Quantity: ${quantity}`)

  lines.push('', 'Is it available?', '', `${siteOrigin()}/p/${product.id}`)

  return lines.join('\n')
}

export function buildOrderMessage(
  name: string,
  items: CartItem[],
  orderId: string,
) {
  const total = items.reduce(
    (sum, { line, product }) => sum + product.price * line.quantity,
    0,
  )
  const count = items.reduce((sum, { line }) => sum + line.quantity, 0)

  const lines = [
    'Hello, I have placed an order on your website.',
    '',
    `Name: ${name}`,
    `Items: ${count} | Total: ${formatPrice(total)}`,
    '',
  ]

  items.slice(0, MAX_LISTED).forEach(({ line, product }, index) => {
    const options = [line.size, line.colour].filter(Boolean).join(', ')
    lines.push(
      `${index + 1}. ${product.name}${options ? ` (${options})` : ''} x${line.quantity}`,
    )
  })

  if (items.length > MAX_LISTED) {
    lines.push(`...and ${items.length - MAX_LISTED} more`)
  }

  lines.push('', 'See the full order with photos:', `${siteOrigin()}/o/${orderId}`)

  return lines.join('\n')
}