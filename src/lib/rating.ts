import { hashString } from '@/lib/seeded'

export function ratingFor(id: string) {
  const a = hashString(`${id}:a`) % 11
  const b = hashString(`${id}:b`) % 11
  return 4 + Math.round((a + b) / 2) / 10
}