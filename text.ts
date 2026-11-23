// import { encodeBase64 } from 'jsr:@std/encoding@1/base64'

// const MODEL = Deno.env.get('GEMINI_MODEL') || 'gemini-3.5-flash'
// const API_KEY = Deno.env.get('GEMINI_API_KEY')
// const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? ''
// const PHOTO_PREFIX = `${SUPABASE_URL}/storage/v1/object/public/product-images/`
// const MAX_IMAGES = 3
// const MAX_BYTES = 4 * 1024 * 1024

// const corsHeaders = {
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Headers':
//     'authorization, x-client-info, apikey, content-type',
// }

// function reply(body: unknown, status = 200) {
//   return new Response(JSON.stringify(body), {
//     status,
//     headers: { ...corsHeaders, 'Content-Type': 'application/json' },
//   })
// }

// function strings(value: unknown, limit = 12): string[] {
//   if (!Array.isArray(value)) return []
//   return value
//     .filter((item): item is string => typeof item === 'string')
//     .map((item) => item.trim().slice(0, 40))
//     .filter(Boolean)
//     .slice(0, limit)
// }

// async function loadImage(url: string) {
//   try {
//     const response = await fetch(url, { signal: AbortSignal.timeout(15000) })
//     if (!response.ok) return null

//     const buffer = new Uint8Array(await response.arrayBuffer())
//     if (buffer.byteLength > MAX_BYTES) return null

//     const mime = response.headers.get('content-type')?.split(';')[0] ?? ''
//     if (!['image/jpeg', 'image/png', 'image/webp'].includes(mime)) return null

//     return { mime, data: encodeBase64(buffer) }
//   } catch {
//     return null
//   }
// }

// function parseListing(text: string) {
//   const start = text.indexOf('{')
//   const end = text.lastIndexOf('}')
//   if (start === -1 || end <= start) return null

//   try {
//     const value = JSON.parse(text.slice(start, end + 1))
//     const name =
//       typeof value.name === 'string'
//         ? value.name.trim().replace(/^["']|["']$/g, '').slice(0, 60)
//         : ''
//     const description =
//       typeof value.description === 'string'
//         ? value.description.trim().slice(0, 500)
//         : ''

//     return name && description ? { name, description } : null
//   } catch {
//     return null
//   }
// }

// Deno.serve(async (request) => {
//   if (request.method === 'OPTIONS') {
//     return new Response('ok', { headers: corsHeaders })
//   }

//   if (request.method !== 'POST') {
//     return reply({ error: 'Use POST.' }, 405)
//   }

//   if (!API_KEY) {
//     return reply({ error: 'The AI helper is not set up yet. Add GEMINI_API_KEY.' }, 500)
//   }

//   let body: Record<string, unknown>
//   try {
//     body = await request.json()
//   } catch {
//     return reply({ error: 'Bad request.' }, 400)
//   }

//   const urls = Array.isArray(body.imageUrls)
//     ? body.imageUrls
//         .filter(
//           (item): item is string =>
//             typeof item === 'string' && item.startsWith(PHOTO_PREFIX),
//         )
//         .slice(0, MAX_IMAGES)
//     : []

//   if (urls.length === 0) {
//     return reply({ error: 'Add a photo first.' }, 400)
//   }

//   const loaded = await Promise.all(urls.map(loadImage))
//   const images = loaded.filter((item) => item !== null)

//   if (images.length === 0) {
//     return reply({ error: 'Could not read the photo. Try another one.' }, 422)
//   }

//   const category = typeof body.category === 'string' ? body.category : ''
//   const colours = strings(body.colours)
//   const sizes = strings(body.sizes)

//   const prompt = [
//     'You write product listings for The Dayan Store, an online fashion store in Lagos, Nigeria.',
//     'Look at the photo(s) of ONE item and write:',
//     '1. "name": a short product name of 2 to 5 words that describes the item, for example "Floral wrap midi dress". No brand names, no prices, no emojis.',
//     '2. "description": 2 to 3 sentences in warm, simple English. Describe the style, colour, pattern, how the fabric looks, and the neckline, sleeves or length if you can see them. Say when it could be worn.',
//     'Only mention what you can actually see. Do not invent materials, sizes, prices or care instructions.',
//     category ? `Category: ${category}.` : '',
//     colours.length ? `Colours the seller listed: ${colours.join(', ')}.` : '',
//     sizes.length ? `Sizes the seller listed: ${sizes.join(', ')}.` : '',
//     'Reply with JSON only, in this exact shape: {"name": "...", "description": "..."}',
//   ]
//     .filter(Boolean)
//     .join('\n')

//   let response: Response
//   try {
//     response = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
//       {
//         method: 'POST',
//         headers: {
//           'x-goog-api-key': API_KEY,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           contents: [
//             {
//               parts: [
//                 { text: prompt },
//                 ...images.map((image) => ({
//                   inline_data: { mime_type: image.mime, data: image.data },
//                 })),
//               ],
//             },
//           ],
//           generationConfig: {
//             responseMimeType: 'application/json',
//             temperature: 0.6,
//             maxOutputTokens: 600,
//           },
//         }),
//         signal: AbortSignal.timeout(30000),
//       },
//     )
//   } catch {
//     return reply({ error: 'The AI helper took too long. Try again.' }, 504)
//   }

//   if (response.status === 429) {
//     return reply(
//       { error: 'The AI helper is busy or over its free limit. Try again in a minute, or write it yourself.' },
//       429,
//     )
//   }

//   if (response.status === 404) {
//     return reply(
//       { error: 'The AI model name is not available. Change the GEMINI_MODEL secret.' },
//       502,
//     )
//   }

//   if (response.status === 400 || response.status === 403) {
//     return reply(
//       { error: 'The AI key is missing, wrong or not allowed. Check GEMINI_API_KEY.' },
//       502,
//     )
//   }

//   if (!response.ok) {
//     return reply({ error: 'The AI helper had a problem. Try again.' }, 502)
//   }

//   const data = await response.json()
//   const text: string =
//     data?.candidates?.[0]?.content?.parts
//       ?.map((part: { text?: string }) => part.text ?? '')
//       .join('') ?? ''

//   const listing = parseListing(text)

//   if (!listing) {
//     return reply(
//       { error: 'The AI could not describe this photo. Try another photo.' },
//       422,
//     )
//   }

//   return reply(listing)
// })