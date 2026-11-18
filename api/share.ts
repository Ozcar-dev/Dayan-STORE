const SITE_NAME = 'The Dayan Store'
const UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

interface ProductRow {
  name: string
  price: number
  description: string
  images: string[]
  stock: string
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function getOrigin(request: Request) {
  const host =
    request.headers.get('x-forwarded-host') ?? request.headers.get('host')
  const proto = request.headers.get('x-forwarded-proto') ?? 'https'
  return host ? `${proto}://${host}` : new URL(request.url).origin
}

function getId(request: Request) {
  const url = new URL(request.url)
  const fromQuery = url.searchParams.get('id')
  if (fromQuery) return fromQuery
  return url.pathname.match(/\/p\/([^/?#]+)/)?.[1] ?? null
}

async function exists(url: string) {
  try {
    const response = await fetch(url, { method: 'HEAD' })
    return response.ok
  } catch {
    return false
  }
}

async function loadProduct(id: string): Promise<ProductRow | null> {
  const base = process.env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL
  const key =
    process.env.VITE_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY

  if (!base || !key) return null

  try {
    const response = await fetch(
      `${base}/rest/v1/products?id=eq.${id}&select=name,price,description,images,stock&limit=1`,
      { headers: { apikey: key } },
    )
    if (!response.ok) return null

    const rows = (await response.json()) as ProductRow[]
    return rows[0] ?? null
  } catch {
    return null
  }
}

export default {
  async fetch(request: Request) {
    const origin = getOrigin(request)
    const id = getId(request)

    if (!id || !UUID.test(id)) {
      return Response.redirect(`${origin}/shop`, 302)
    }

    const product = await loadProduct(id)
    if (!product) {
      return Response.redirect(`${origin}/shop`, 302)
    }

    const name = product.name.charAt(0).toUpperCase() + product.name.slice(1)
    const price = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(product.price)

    const summary = (product.description || 'Order easily on WhatsApp.')
      .replace(/\s+/g, ' ')
      .slice(0, 150)

    const main = product.images?.[0]
    let image: string | null = null

    if (main) {
      const share = main.replace(/\.(webp|jpg)$/, '-share.jpg')
      image = share !== main && (await exists(share)) ? share : main
    }

    const target = `${origin}/shop/${id}`
    const self = `${origin}/p/${id}`
    const title = `${name} - ${price}`

    const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)} | ${SITE_NAME}</title>
<meta name="description" content="${escapeHtml(summary)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${SITE_NAME}">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(summary)}">
<meta property="og:url" content="${escapeHtml(self)}">
${image ? `<meta property="og:image" content="${escapeHtml(image)}">\n<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n<meta name="twitter:card" content="summary_large_image">` : ''}
<noscript><meta http-equiv="refresh" content="0;url=${escapeHtml(target)}"></noscript>
</head>
<body>
<p><a href="${escapeHtml(target)}">Open ${escapeHtml(name)}</a></p>
<script>location.replace(${JSON.stringify(target).replace(/</g, '\\u003c')})</script>
</body>
</html>`

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
      },
    })
  },
}