import { shareUrl, thumbUrl } from '@/lib/image-url'
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
  const { full, thumb, share, ext } = await prepareImage(file)
  const id = crypto.randomUUID()
  const storage = supabase.storage.from(BUCKET)
  const cacheControl = '31536000'
  const done: string[] = []

  const send = async (path: string, blob: Blob) => {
    const { error } = await storage.upload(path, blob, {
      cacheControl,
      contentType: blob.type,
    })

    if (error) {
      if (done.length > 0) await storage.remove(done)
      throw error
    }

    done.push(path)
  }

  const fullPath = `${id}.${ext}`
  await send(fullPath, full)
  await send(`${id}-sm.${ext}`, thumb)
  await send(`${id}-share.jpg`, share)

  return storage.getPublicUrl(fullPath).data.publicUrl
}

export async function deleteProductPhotos(urls: string[]) {
  const paths = urls
    .flatMap((url) => [url, thumbUrl(url), shareUrl(url)])
    .map((item) => (item ? pathFromUrl(item) : null))
    .filter((path): path is string => path !== null)

  if (paths.length === 0) return

  try {
    await supabase.storage.from(BUCKET).remove(paths)
  } catch {
    // Cleanup is best effort. The product itself is already saved.
  }
}