import sharp from "sharp";

const SITE_NAME = "The Dayan Store";
const MAX_ITEMS = 10;
const BACKGROUND = "#fff4ec";
const PAIR = /^([0-9a-f]{32})x(\d{1,2})$/i;

interface Entry {
  id: string;
  qty: number;
}

interface ProductRow {
  id: string;
  name: string;
  price: number;
  images: string[];
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getOrigin(request: Request) {
  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") ?? "https";
  return host ? `${proto}://${host}` : new URL(request.url).origin;
}

function getRaw(request: Request) {
  const url = new URL(request.url);
  const fromQuery = url.searchParams.get("ids");
  if (fromQuery) return fromQuery;
  return url.pathname.match(/\/o\/([^/?#]+)/)?.[1] ?? null;
}

function parse(raw: string | null): Entry[] {
  if (!raw) return [];

  const entries: Entry[] = [];
  for (const part of raw.split(".")) {
    const match = part.match(PAIR);
    if (!match) continue;

    const hex = match[1].toLowerCase();
    entries.push({
      id: `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`,
      qty: Math.max(1, Number(match[2])),
    });

    if (entries.length === MAX_ITEMS) break;
  }

  return entries;
}

async function loadProducts(entries: Entry[]): Promise<ProductRow[]> {
  const base = process.env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const key =
    process.env.VITE_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY;

  if (!base || entries.length === 0 || !key) return [];

  try {
    const ids = entries.map((entry) => entry.id).join(",");
    const response = await fetch(
      `${base}/rest/v1/products?id=in.(${ids})&select=id,name,price,images`,
      { headers: { apikey: key } },
    );
    if (!response.ok) return [];

    return (await response.json()) as ProductRow[];
  } catch {
    return [];
  }
}

async function fetchBuffer(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    return Buffer.from(await response.arrayBuffer());
  } catch {
    return null;
  }
}

async function loadPhoto(main: string | undefined) {
  if (!main) return null;

  const small = main.replace(/\.(webp|jpg)$/, "-sm.$1");
  if (small !== main) {
    const buffer = await fetchBuffer(small);
    if (buffer) return buffer;
  }

  return fetchBuffer(main);
}

async function collage(photos: Buffer[]) {
  const width = 1200;
  const height = 630;
  const count = photos.length;
  const cols = Math.min(count, 5);
  const rows = Math.ceil(count / cols);
  const cellW = Math.floor(width / cols);
  const cellH = Math.floor(height / rows);
  const pad = 12;

  const tiles = await Promise.all(
    photos.map(async (photo, index) => {
      const row = Math.floor(index / cols);
      const inRow = Math.min(cols, count - row * cols);
      const startX = Math.floor((width - inRow * cellW) / 2);

      const input = await sharp(photo)
        .rotate()
        .resize(cellW - pad * 2, cellH - pad * 2, {
          fit: "contain",
          background: BACKGROUND,
        })
        .jpeg({ quality: 85 })
        .toBuffer();

      return {
        input,
        left: startX + (index % cols) * cellW + pad,
        top: row * cellH + pad,
      };
    }),
  );

  return sharp({
    create: { width, height, channels: 3, background: BACKGROUND },
  })
    .composite(tiles)
    .jpeg({ quality: 82 })
    .toBuffer();
}

export default {
  async fetch(request: Request) {
    const origin = getOrigin(request);
    const raw = getRaw(request);
    const entries = parse(raw);
    const rows = await loadProducts(entries);

    const products = entries
      .map((entry) => {
        const row = rows.find((item) => item.id === entry.id);
        return row ? { row, qty: entry.qty } : null;
      })
      .filter(
        (item): item is { row: ProductRow; qty: number } => item !== null,
      );

    if (!raw || products.length === 0) {
      return Response.redirect(`${origin}/shop`, 302);
    }

    const url = new URL(request.url);

    if (url.searchParams.get("image") === "1") {
      const loaded = await Promise.all(
        products.map(({ row }) => loadPhoto(row.images?.[0])),
      );
      const photos = loaded.filter(
        (item): item is NonNullable<typeof item> => item !== null,
      );

      if (photos.length === 0) {
        return new Response("No photos", { status: 404 });
      }

      const jpeg = await collage(photos);

      return new Response(new Uint8Array(jpeg), {
        headers: {
          "Content-Type": "image/jpeg",
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      });
    }

    const total = products.reduce(
      (sum, { row, qty }) => sum + row.price * qty,
      0,
    );
    const money = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(total);

    const title = `Order: ${products.length} items - ${money}`;
    const names = products
      .map(({ row }) => row.name.charAt(0).toUpperCase() + row.name.slice(1))
      .join(", ");
    const summary = names.slice(0, 150);

    const self = `${origin}/o/${raw}`;
    const image = `${origin}/api/order?ids=${encodeURIComponent(raw)}&image=1`;
    const target = `${origin}/shop`;

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
<meta property="og:image" content="${escapeHtml(image)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<noscript><meta http-equiv="refresh" content="0;url=${escapeHtml(target)}"></noscript>
</head>
<body>
<p><a href="${escapeHtml(target)}">Open the shop</a></p>
<script>location.replace(${JSON.stringify(target).replace(/</g, "\\u003c")})</script>
</body>
</html>`;

    return new Response(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
      },
    });
  },
};
