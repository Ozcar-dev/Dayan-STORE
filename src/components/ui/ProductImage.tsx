import { useState } from 'react'
import { ImageIcon } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

interface ProductImageProps {
  src?: string
  alt: string
  className?: string
  iconSize?: number
  loading?: 'lazy' | 'eager'
}

export function ProductImage({
  src,
  alt,
  className,
  iconSize = 40,
  loading = 'lazy',
}: ProductImageProps) {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null)
  const [failedSrc, setFailedSrc] = useState<string | null>(null)

  if (!src || failedSrc === src) {
    return (
      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
        <ImageIcon size={iconSize} />
      </div>
    )
  }

  const loaded = loadedSrc === src

  return (
    <>
      {!loaded && (
        <Skeleton className="absolute inset-0 rounded-none bg-border/60" />
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        onLoad={() => setLoadedSrc(src)}
        onError={() => setFailedSrc(src)}
        className={className}
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 300ms ease, transform 300ms ease',
        }}
      />
    </>
  )
}