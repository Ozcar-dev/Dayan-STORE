const FULL_SIDE = 1200
const THUMB_SIDE = 480
const MAX_INPUT_BYTES = 25 * 1024 * 1024

export interface PreparedImage {
  full: Blob
  thumb: Blob
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
    const fullWebp = await render(bitmap, FULL_SIDE, 'image/webp', 0.82)

    if (fullWebp && fullWebp.type === 'image/webp') {
      const thumbWebp = await render(bitmap, THUMB_SIDE, 'image/webp', 0.78)
      if (thumbWebp) return { full: fullWebp, thumb: thumbWebp, ext: 'webp' }
    }

    const fullJpg = await render(bitmap, FULL_SIDE, 'image/jpeg', 0.85)
    const thumbJpg = await render(bitmap, THUMB_SIDE, 'image/jpeg', 0.8)

    if (fullJpg && thumbJpg) return { full: fullJpg, thumb: thumbJpg, ext: 'jpg' }

    throw new Error('Could not shrink this photo.')
  } finally {
    bitmap.close()
  }
}