const FULL_SIDE = 1200
const THUMB_SIDE = 480
const SHARE_WIDTH = 1200
const SHARE_HEIGHT = 630
const SHARE_BACKGROUND = '#fff4ec'
const MAX_INPUT_BYTES = 25 * 1024 * 1024

export interface PreparedImage {
  full: Blob
  thumb: Blob
  share: Blob
  ext: 'webp' | 'jpg'
}

function toBlob(canvas: HTMLCanvasElement, type: string, quality: number) {
  return new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, type, quality),
  )
}

async function render(
  bitmap: ImageBitmap,
  side: number,
  type: string,
  quality: number,
) {
  const scale = Math.min(1, side / Math.max(bitmap.width, bitmap.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(bitmap.width * scale))
  canvas.height = Math.max(1, Math.round(bitmap.height * scale))

  const context = canvas.getContext('2d')
  if (!context) return null

  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  return toBlob(canvas, type, quality)
}

async function renderShare(bitmap: ImageBitmap) {
  const canvas = document.createElement('canvas')
  canvas.width = SHARE_WIDTH
  canvas.height = SHARE_HEIGHT

  const context = canvas.getContext('2d')
  if (!context) return null

  context.fillStyle = SHARE_BACKGROUND
  context.fillRect(0, 0, SHARE_WIDTH, SHARE_HEIGHT)

  const scale = Math.min(
    (SHARE_WIDTH - 80) / bitmap.width,
    (SHARE_HEIGHT - 40) / bitmap.height,
  )
  const width = bitmap.width * scale
  const height = bitmap.height * scale

  context.drawImage(
    bitmap,
    (SHARE_WIDTH - width) / 2,
    (SHARE_HEIGHT - height) / 2,
    width,
    height,
  )

  return toBlob(canvas, 'image/jpeg', 0.85)
}

export async function prepareImage(file: File): Promise<PreparedImage> {
  if (!file.type.startsWith('image/')) {
    throw new Error('Please choose an image file.')
  }

  if (file.size > MAX_INPUT_BYTES) {
    throw new Error('That photo is too large. Choose one under 25 MB.')
  }

  let bitmap: ImageBitmap
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })
  } catch {
    throw new Error('This photo could not be read. Try a JPG or PNG.')
  }

  try {
    const share = await renderShare(bitmap)
    if (!share) throw new Error('Could not shrink this photo.')

    const fullWebp = await render(bitmap, FULL_SIDE, 'image/webp', 0.82)

    if (fullWebp && fullWebp.type === 'image/webp') {
      const thumbWebp = await render(bitmap, THUMB_SIDE, 'image/webp', 0.78)
      if (thumbWebp) {
        return { full: fullWebp, thumb: thumbWebp, share, ext: 'webp' }
      }
    }

    const fullJpg = await render(bitmap, FULL_SIDE, 'image/jpeg', 0.85)
    const thumbJpg = await render(bitmap, THUMB_SIDE, 'image/jpeg', 0.8)

    if (fullJpg && thumbJpg) {
      return { full: fullJpg, thumb: thumbJpg, share, ext: 'jpg' }
    }

    throw new Error('Could not shrink this photo.')
  } finally {
    bitmap.close()
  }
}