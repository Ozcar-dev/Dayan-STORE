import { makeRandom, shuffled } from '@/lib/seeded'
import { upperFirst } from '@/lib/text'
import { normalizeText } from '@/lib/unique'

interface CategoryConfig {
  noun: string
  det: 'this' | 'these'
  plural: boolean
  article: boolean
  verb: 'worn' | 'carried'
  qualities: string[]
  styling: string[]
}

const CONFIG: Record<string, CategoryConfig> = {
  dress: {
    noun: 'dress',
    det: 'this',
    plural: false,
    article: true,
    verb: 'worn',
    qualities: [
      'simple', 'flattering', 'easy to wear', 'elegant', 'graceful',
      'comfortable', 'stylish', 'chic', 'polished', 'eye-catching',
      'versatile', 'refined', 'charming', 'effortless', 'pretty',
      'classy', 'lovely', 'smart', 'bold', 'timeless',
    ],
    styling: [
      'Pair it with heels for an evening out or flats for the day.',
      'It works just as well for dinners as it does for church and weekend outings.',
      'Add simple jewellery and a clutch to complete the look.',
      'Dress it up for celebrations or keep it relaxed for everyday.',
      'A great choice for brunch, dates, parties and special days.',
      'Style it with a belt, a statement bag or your favourite shoes.',
      'Easy to dress up with accessories and easy to wear on its own.',
      'Wear it to events, dinners, outings and everything in between.',
      'It looks great with heels, sandals or neat sneakers.',
      'Layer it with a jacket when the weather calls for it.',
    ],
  },
  jeans: {
    noun: 'jeans',
    det: 'these',
    plural: true,
    article: false,
    verb: 'worn',
    qualities: [
      'comfortable', 'easy to wear', 'versatile', 'classic', 'stylish',
      'relaxed', 'trendy', 'neat', 'smart', 'casual',
      'flattering', 'simple', 'effortless', 'cool', 'dependable',
      'chic', 'modern', 'fresh', 'timeless', 'easy to style',
    ],
    styling: [
      'Pair them with a fitted top, a crop top or a neat blouse.',
      'Dress them up with heels or keep it casual with sneakers.',
      'They work for errands, brunch, shopping and relaxed evenings.',
      'Style them with a jacket or a tucked-in shirt for a sharper look.',
      'A simple base for countless outfits, from casual to smart casual.',
      'Wear them with a belt and a bold top to complete the look.',
      'Great with sandals in the day and heels at night.',
      'Team them with a tee, a bodysuit or a button-up shirt.',
      'Easy to mix with the tops and shoes you already own.',
      'Made for weekends, travel days and everything in between.',
    ],
  },
  'two-piece': {
    noun: 'two piece set',
    det: 'this',
    plural: false,
    article: true,
    verb: 'worn',
    qualities: [
      'coordinated', 'stylish', 'chic', 'put-together', 'elegant',
      'polished', 'effortless', 'easy to wear', 'flattering', 'charming',
      'versatile', 'bold', 'lovely', 'pretty', 'smart',
      'classy', 'fresh', 'refined', 'eye-catching', 'simple',
    ],
    styling: [
      'Wear the pieces together for a complete outfit, or mix them with other items.',
      'Add heels and a clutch for an evening out, or flats for the day.',
      'A smart pick for lunches, outings, celebrations and dinners.',
      'The pieces are coordinated, so you step out looking put together.',
      'Simple to accessorise with a bag and jewellery you already own.',
      'Style it with sandals for the day or heels for the night.',
      'Great for events, brunch, shopping and weekend plans.',
      'Wear it together for a polished look or split it up for more outfits.',
      'Finish with a neat bag and simple jewellery.',
      'An easy way to look dressed up with very little effort.',
    ],
  },
  bags: {
    noun: 'bag',
    det: 'this',
    plural: false,
    article: true,
    verb: 'carried',
    qualities: [
      'practical', 'stylish', 'handy', 'chic', 'neat',
      'polished', 'versatile', 'charming', 'classy', 'eye-catching',
      'smart', 'easy to carry', 'pretty', 'lovely', 'bold',
      'refined', 'elegant', 'simple', 'useful', 'fashionable',
    ],
    styling: [
      'It pairs well with casual outfits and dressier looks alike.',
      'A good match for work, shopping, outings and travel.',
      'Easy to match with the clothes you already own.',
      'Carry it to brunch, the market, the office or an evening out.',
      'A simple way to refresh an outfit without changing anything else.',
      'Use it every day or save it for special occasions.',
      'It adds a finishing touch to dresses, jeans and everything in between.',
      'Great for carrying your daily essentials in style.',
      'Style it with a neutral outfit to let it stand out.',
      'Perfect for everyday errands and weekend plans.',
    ],
  },
  tops: {
    noun: 'top',
    det: 'this',
    plural: false,
    article: true,
    verb: 'worn',
    qualities: [
      'versatile', 'easy to wear', 'stylish', 'chic', 'simple',
      'neat', 'comfortable', 'flattering', 'fresh', 'polished',
      'charming', 'effortless', 'casual', 'smart', 'pretty',
      'lovely', 'classy', 'easy to style', 'bold', 'timeless',
    ],
    styling: [
      'Pair it with jeans, a skirt or tailored trousers.',
      'Tuck it in for a neat look or wear it loose for comfort.',
      'Layer it under a jacket or wear it on its own.',
      'Great for work, lunch dates, shopping and weekends.',
      'A simple piece that goes with the bottoms you already own.',
      'Add a necklace or a belt to change the look completely.',
      'Easy to dress up with heels or down with sneakers.',
      'Wear it for brunch, errands, dates and casual days out.',
      'Style it with a skirt for an evening or jeans for the day.',
      'A versatile piece you will reach for again and again.',
    ],
  },
}

const FALLBACK: CategoryConfig = {
  noun: 'piece',
  det: 'this',
  plural: false,
  article: true,
  verb: 'worn',
  qualities: [
    'stylish', 'simple', 'versatile', 'chic', 'neat', 'polished',
    'charming', 'easy to wear', 'lovely', 'smart',
  ],
  styling: [
    'It is easy to style with the pieces you already own.',
    'Great for everyday wear and special days too.',
    'Pair it with your favourite accessories to make it yours.',
    'Simple to dress up or keep relaxed.',
  ],
}

const CLOSERS = [
  'A neat addition to your closet that you will reach for again and again.',
  'Easy to love and easy to style.',
  'A piece that fits right into your everyday wardrobe.',
  'Made for the days you want to look good without trying too hard.',
  'Simple to style and easy to enjoy.',
  'A wardrobe addition you will be glad you made.',
  'A stylish choice for anyone who likes to look put together.',
  'Made for those who enjoy looking good every day.',
]

function joinList(items: string[]) {
  if (items.length <= 1) return items.join('')
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`
}

function withArticle(phrase: string, needsArticle: boolean) {
  if (!needsArticle) return phrase
  return `${/^[aeiou]/i.test(phrase) ? 'an' : 'a'} ${phrase}`
}

function leadSentences(
  config: CategoryConfig,
  colour: string | null,
  [q1, q2, q3]: string[],
) {
  const be = config.plural ? 'are' : 'is'
  const item = `${colour ? `${colour} ` : ''}${config.noun}`
  const demo = `${config.det} ${config.noun}`
  const demoItem = `${config.det} ${item}`
  const list3 = joinList([q1, q2, q3])

  return [
    `${upperFirst(withArticle(item, config.article))} that ${be} ${list3}.`,
    `${upperFirst(joinList([...(colour ? [colour] : []), q1, q2, q3]))}: ${demo} ${be} made to be ${config.verb} and loved.`,
    `Meet your new favourite ${item}: ${list3}.`,
    `${upperFirst(demo)} ${be} ${list3}${colour ? `, in a lovely shade of ${colour}` : ''}.`,
    `For a look that feels ${q1} and ${q2}, choose ${demoItem}.`,
    `${upperFirst(demoItem)} ${be} ${q1}, ${q2} and ${q3}.`,
  ]
}

interface DescribeOptions {
  category: string
  colours: string[]
  taken?: Set<string>
  seed: number
}

export function generateDescription({
  category,
  colours,
  taken = new Set<string>(),
  seed,
}: DescribeOptions) {
  const config = CONFIG[category] ?? FALLBACK
  const names = colours.map((item) => item.trim().toLowerCase()).filter(Boolean)
  const colour = names.length === 1 ? names[0] : null
  const random = makeRandom(seed)

  const pick = <T>(items: T[]) => items[Math.floor(random() * items.length)]

  let text = ''

  for (let attempt = 0; attempt < 400; attempt += 1) {
    const qualities = shuffled(config.qualities, random).slice(0, 3)
    const lead = pick(leadSentences(config, colour, qualities))

    text = [lead, pick(config.styling), pick(CLOSERS)].join(' ')

    if (!taken.has(normalizeText(text))) return text
  }

  return text
}