import { useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import { ImagePlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductImage } from '@/components/ui/ProductImage'
import { getErrorMessage } from '@/lib/errors'
import { thumbUrl } from '@/lib/image-url'
import { MAX_PHOTOS, uploadProductPhoto } from '@/lib/image-storage'

interface PhotoManagerProps {
  images: string[]
  onChange: (images: string[]) => void
  onUploaded: (url: string) => void
  onBusyChange: (busy: boolean) => void
}

const linkButton =
  'text-left text-xs font-semibold text-primary underline underline-offset-2 disabled:opacity-50'

export function PhotoManager({
  images,
  onChange,
  onUploaded,
  onBusyChange,
}: PhotoManagerProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')

  const handleFiles = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? [])
    event.target.value = ''
    if (files.length === 0) return

    const room = MAX_PHOTOS - images.length
    if (room <= 0) {
      setError(`You can add up to ${MAX_PHOTOS} photos.`)
      return
    }

    const batch = files.slice(0, room)
    setError(
      files.length > room
        ? `Only ${room} more photo(s) fit, so the rest were skipped.`
        : '',
    )
    setUploading(true)
    onBusyChange(true)

    let next = images
    let failure = ''

    for (let index = 0; index < batch.length; index += 1) {
      setStatus(`Uploading ${index + 1} of ${batch.length}...`)
      try {
        const url = await uploadProductPhoto(batch[index])
        onUploaded(url)
        next = [...next, url]
        onChange(next)
      } catch (caught) {
        failure = getErrorMessage(caught)
      }
    }

    setStatus('')
    if (failure) setError(failure)
    setUploading(false)
    onBusyChange(false)
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold">
          Photos ({images.length}/{MAX_PHOTOS})
        </p>
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={uploading || images.length >= MAX_PHOTOS}
          onClick={() => inputRef.current?.click()}
        >
          <ImagePlus size={16} />
          Add photos
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFiles}
        />
      </div>

      <p className="text-sm text-muted-foreground">
        The first photo is the main one. Photos shrink automatically. Use clear
        pictures on a plain background.
      </p>

      {status && (
        <p role="status" className="text-sm font-semibold text-primary">
          {status}
        </p>
      )}

      {error && (
        <p role="alert" className="text-sm font-semibold text-primary">
          {error}
        </p>
      )}

      {images.length > 0 && (
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {images.map((url, index) => (
            <li key={url} className="min-w-0 space-y-1.5">
              <div className="relative aspect-3/4 overflow-hidden rounded-xl border border-border bg-muted">
                <ProductImage
                  src={thumbUrl(url)}
                  alt={`Photo ${index + 1}`}
                  iconSize={24}
                  className="h-full w-full object-cover"
                />
                {index === 0 && (
                  <span className="absolute left-1.5 top-1.5 rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
                    Main
                  </span>
                )}
              </div>

              <div className="flex flex-col items-start gap-1">
                {index > 0 && (
                  <button
                    type="button"
                    disabled={uploading}
                    onClick={() =>
                      onChange([url, ...images.filter((item) => item !== url)])
                    }
                    className={linkButton}
                  >
                    Make main
                  </button>
                )}
                <button
                  type="button"
                  disabled={uploading}
                  onClick={() =>
                    onChange(images.filter((item) => item !== url))
                  }
                  className={linkButton}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}