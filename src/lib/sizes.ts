import { parseList } from '@/lib/parse-list'

export const SIZE_TAGS = [
  'S',
  'M',
  'L',
  'XL',
  'XXL',
  'XXXL',
  '6',
  '8',
  '10',
  '12',
  '14',
  '16',
  '18',
  'One size',
]

export function formatSizes(text: string) {
  return text.toUpperCase().replace(/ONE\s+SIZE/g, 'One size')
}

export function hasSize(text: string, size: string) {
  return parseList(formatSizes(text)).some(
    (item) => item.toLowerCase() === size.toLowerCase(),
  )
}

export function toggleSize(text: string, size: string) {
  const items = parseList(formatSizes(text))
  const exists = items.some((item) => item.toLowerCase() === size.toLowerCase())

  const next = exists
    ? items.filter((item) => item.toLowerCase() !== size.toLowerCase())
    : [...items, size]

  return next.join(', ')
}