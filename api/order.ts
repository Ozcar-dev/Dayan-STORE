import sharp from "sharp";

const SITE_NAME = "The Dayan Store";
const MAX_PHOTOS = 10;
const BACKGROUND = "#fff4ec";
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const BOTS =
  /(whatsapp|facebookexternalhit|facebot|twitterbot|telegrambot|slackbot|discordbot|linkedinbot|pinterest|skypeuripreview|embedly|vkshare|googlebot|bingbot|crawler|spider|preview)/i;
const IMAGE_CACHE = "public, s-maxage=3600, stale-while-revalidate=86400";

interface OrderItem {
  name: string;
  image: string;
}

interface OrderRow {
  customer_name: string;
  items: OrderItem[];
  item_count: number;
  total: number;
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

function getId(request: Request) {
  const url = new URL(request.url);
  const fromQuery = url.searchParams.get("id");
  if (fromQuery) return fromQuery;
  return url.pathname.match(/\/o\/([^/?#]+)/)?.[1] ?? null;
}

function go(url: string) {
  return new Response(null, {
    status: 302,
    headers: { Location: url, "Cache-Control": "no-store" },
  });
}

async function loadOrder(id: string): Promise<OrderRow | null> {
  const base = process.env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const key =
    process.env.VITE_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY;

  if (!base || !key) return null;

  try {
    const response = await fetch(`${base}/rest/v1/rpc/get_order`, {
      method: "POST",
      headers: { apikey: key, "Content-Type": "application/json" },
      body: JSON.stringify({ p_id: id }),
    });
    if (!response.ok) return null;

    const rows = (await response.json()) as OrderRow[];
    return rows[0] ?? null;
  } catch {
    return null;
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

async function loadPhoto(main: string) {
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

function jpegResponse(data: Uint8Array) {
  return new Response(data, {
    headers: { "Content-Type": "image/jpeg", "Cache-Control": IMAGE_CACHE },
  });
}

export default {
  async fetch(request: Request) {
    const origin = getOrigin(request);
    const id = getId(request);

    if (!id || !UUID.test(id)) return go(`${origin}/shop`);

    const url = new URL(request.url);
    const wantsImage = url.searchParams.get("image") === "1";
    const agent = request.headers.get("user-agent") ?? "";

    if (!wantsImage && !BOTS.test(agent)) {
      return go(`${origin}/order/${id}`);
    }

    const order = await loadOrder(id);

    if (!order) {
      return wantsImage
        ? new Response("Not found", { status: 404 })
        : go(`${origin}/shop`);
    }

    if (wantsImage) {
      const sources = Array.from(
        new Set(order.items.map((item) => item.image).filter(Boolean)),
      ).slice(0, MAX_PHOTOS);

      if (sources.length === 1) {
        const share = sources[0].replace(/\.(webp|jpg)$/, "-share.jpg");
        const single = share !== sources[0] ? await fetchBuffer(share) : null;
        if (single) return jpegResponse(new Uint8Array(single));
      }

      const loaded = await Promise.all(sources.map(loadPhoto));
      const photos = loaded.filter(
        (item): item is NonNullable<typeof item> => item !== null,
      );

      if (photos.length === 0) {
        return new Response("No photos", { status: 404 });
      }

      return jpegResponse(new Uint8Array(await collage(photos)));
    }

    const money = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(order.total);

    const title = `Order from ${order.customer_name} - ${order.item_count} item(s) - ${money}`;
    const summary = order.items
      .map((item) => item.name.charAt(0).toUpperCase() + item.name.slice(1))
      .join(", ")
      .slice(0, 150);

    const self = `${origin}/o/${id}`;
    const image = `${origin}/api/order?id=${id}&image=1`;
    const target = `${origin}/order/${id}`;

    const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)} | ${SITE_NAME}</title>
<meta name="description" content="${escapeHtml(summary)}">
<meta name="robots" content="noindex">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${SITE_NAME}">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(summary)}">
<meta property="og:url" content="${escapeHtml(self)}">
<meta property="og:image" content="${escapeHtml(image)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
</head>
<body>
<p><a href="${escapeHtml(target)}">Open the order</a></p>
</body>
</html>`;

    return new Response(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  },
};

// if (url.searchParams.get('image') === '1') {
//   const sources = Array.from(
//     new Set(order.items.map((item) => item.image).filter(Boolean)),
//   ).slice(0, MAX_PHOTOS)

//   const loaded = await Promise.all(sources.map(loadPhoto))
// const photos = loaded.filter(
//   (item): item is NonNullable<typeof item> => item !== null,
// );

//   if (photos.length === 0) {
//     return new Response('No photos', { status: 404 })
//   }

//   const jpeg = await collage(photos)

//   return new Response(new Uint8Array(jpeg), {
//     headers: {
//       'Content-Type': 'image/jpeg',
//       'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
//     },
//   })
// }
