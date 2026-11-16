import { thumbUrl } from '@/lib/image-url'
import { prepareImage } from '@/lib/resize-image'
import { supabase } from '@/lib/supabase'

const BUCKET = 'product-images'

export const MAX_PHOTOS = 6

function pathFromUrl(url: string): string | null {
  const marker = `/${BUCKET}/`
  const index = url.indexOf(marker)
  return index === -1 ? null : url.slice(index + marker.length)
}

export async function uploadProductPhoto(file: File): Promise<string> {
  const { full, thumb, ext } = await prepareImage(file)
  const id = crypto.randomUUID()
  const fullPath = `${id}.${ext}`
  const thumbPath = `${id}-sm.${ext}`
  const storage = supabase.storage.from(BUCKET)
  const cacheControl = '31536000'

  const fullResult = await storage.upload(fullPath, full, {
    cacheControl,
    contentType: full.type,
  })
  if (fullResult.error) throw fullResult.error

  const thumbResult = await storage.upload(thumbPath, thumb, {
    cacheControl,
    contentType: thumb.type,
  })
  if (thumbResult.error) {
    await storage.remove([fullPath])
    throw thumbResult.error
  }

  return storage.getPublicUrl(fullPath).data.publicUrl
}

export async function deleteProductPhotos(urls: string[]) {
  const paths = urls
    .flatMap((url) => [url, thumbUrl(url)])
    .map((item) => (item ? pathFromUrl(item) : null))
    .filter((path): path is string => path !== null)

  if (paths.length === 0) return

  try {
    await supabase.storage.from(BUCKET).remove(paths)
  } catch {
    // Cleanup is best effort. The product itself is already saved.
  }
}