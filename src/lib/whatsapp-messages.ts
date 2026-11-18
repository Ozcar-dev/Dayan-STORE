import type { CartItem } from '@/lib/cart'
import { siteOrigin } from '@/lib/site-url'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types'

const MAX_PREVIEW = 10
const MAX_ENCODED = 1900

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

function orderLink(items: CartItem[]) {
  const totals = new Map<string, number>()

  for (const { line, product } of items) {
    totals.set(product.id, (totals.get(product.id) ?? 0) + line.quantity)
  }

  const unique = Array.from(totals.entries())

  if (unique.length === 1) return `${siteOrigin()}/p/${unique[0][0]}`

  const parts = unique
    .slice(0, MAX_PREVIEW)
    .map(([id, quantity]) => `${id.replace(/-/g, '')}x${Math.min(quantity, 99)}`)

  return `${siteOrigin()}/o/${parts.join('.')}`
}

function buildCart(
  all: CartItem[],
  shown: CartItem[],
  style: 'full' | 'compact',
  note: string,
) {
  const total = all.reduce(
    (sum, { line, product }) => sum + product.price * line.quantity,
    0,
  )

  const lines: string[] = ['Hello, I would like to order:', '']

  shown.forEach(({ line, product }, index) => {
    if (style === 'full') {
      const options = [
        line.size && `Size: ${line.size}`,
        line.colour && `Colour: ${line.colour}`,
        `Quantity: ${line.quantity}`,
      ]
        .filter(Boolean)
        .join(' | ')

      lines.push(
        `${index + 1}. *${product.name}*`,
        options,
        `Price: ${formatPrice(product.price * line.quantity)}`,
        '',
      )
    } else {
      const short = [line.size, line.colour].filter(Boolean).join(', ')

      lines.push(
        `${index + 1}. ${product.name}${short ? ` (${short})` : ''} x${line.quantity} - ${formatPrice(product.price * line.quantity)}`,
      )
    }
  })

  if (style === 'compact') lines.push('')
  if (note) lines.push(note, '')

  lines.push(
    `Items total: ${formatPrice(total)}`,
    'Please confirm availability and the delivery fee.',
    '',
    orderLink(all),
  )

  return lines.join('\n')
}

const fits = (message: string) => encodeURIComponent(message).length <= MAX_ENCODED

export function buildCartMessage(items: CartItem[]) {
  const full = buildCart(items, items, 'full', '')
  if (fits(full)) return full

  const compact = buildCart(items, items, 'compact', '')
  if (fits(compact)) return compact

  let message = compact

  for (let count = items.length - 1; count >= 1; count -= 1) {
    const rest = items.length - count
    message = buildCart(
      items,
      items.slice(0, count),
      'compact',
      `(Plus ${rest} more item(s). I will send the details next.)`,
    )
    if (fits(message)) return message
  }

  return message
}