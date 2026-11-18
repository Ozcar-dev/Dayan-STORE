const BLURBS: Record<string, string> = {
  'party-event': 'A stylish piece made for parties and special events.',
  casual: 'Easy, comfortable and perfect for everyday wear.',
  jeans: 'Well-fitted jeans that go with everything in your wardrobe.',
  tops: 'A versatile top you can style in many different ways.',
  'two-piece-jumpsuit': 'A complete look in one easy outfit.',
  bags: 'A carefully chosen bag that completes your outfit.',
}

const FALLBACK = 'A lovely piece from our collection.'

function joinWords(items: string[]) {
  if (items.length <= 1) return items.join('')
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`
}

interface DescribeInput {
  category: string
  colours: string[]
  sizes: string[]
}

export function describeProduct({ category, colours, sizes }: DescribeInput) {
  const parts = [BLURBS[category] ?? FALLBACK]

  if (colours.length > 0) {
    parts.push(`Available in ${joinWords(colours)}.`)
  }

  if (sizes.length === 1) {
    parts.push(
      /^one size$/i.test(sizes[0]) ? 'Comes in one size.' : `Size: ${sizes[0]}.`,
    )
  } else if (sizes.length > 1) {
    parts.push(`Sizes: ${joinWords(sizes)}.`)
  }

  return parts.join(' ')
}