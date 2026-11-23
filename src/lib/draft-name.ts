import { DRESS_STEMS, JEANS_STEMS } from '@/constants/name-stems'
import { makeRandom } from '@/lib/seeded'
import { normalizeText } from '@/lib/unique'

const STEMS: Record<string, string[]> = {
  dress: DRESS_STEMS,
  jeans: JEANS_STEMS,
  'two-piece': DRESS_STEMS,
  bags: DRESS_STEMS,
  tops: DRESS_STEMS,
}

const NOUNS: Record<string, string> = {
  dress: 'Dress',
  jeans: 'Jeans',
  'two-piece': 'Set',
  bags: 'Bag',
  tops: 'Top',
}

export function nameOptions(
  category: string,
  taken: Set<string>,
  current = '',
): string[] {
  const stems = STEMS[category] ?? DRESS_STEMS
  const noun = NOUNS[category] ?? 'Piece'
  const options: string[] = []

  for (let round = 1; round <= 8 && options.length < 40; round += 1) {
    for (const stem of stems) {
      const name =
        round === 1 ? `${stem} ${noun}` : `${stem} ${noun} ${round}`

      if (name === current || !taken.has(normalizeText(name))) {
        options.push(name)
      }
    }
  }

  if (current && !options.includes(current)) options.unshift(current)

  return options
}

export function pickName(category: string, taken: Set<string>, seed: number) {
  const options = nameOptions(category, taken)
  if (options.length === 0) return ''

  const random = makeRandom(seed)
  return options[Math.floor(random() * options.length)]
}