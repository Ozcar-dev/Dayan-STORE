import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'

const files = import.meta.glob<string>(
  '/src/assets/reviews/*.{png,jpg,jpeg,webp}',
  { eager: true, import: 'default' },
)

const SCREENSHOTS = Object.entries(files)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, src]) => src)

export function ReviewList() {
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    if (active === null) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active])

  return (
    <div className="mx-auto w-full max-w-6xl space-y-10 px-4 py-10 sm:px-6">
      {SCREENSHOTS.length === 0 ? (
        <p className="text-muted-foreground">Reviews are coming soon.</p>
      ) : (
        <ul className="columns-2 gap-3 sm:columns-3 lg:columns-4">
          {SCREENSHOTS.map((src, index) => (
            <li key={src} className="mb-3 break-inside-avoid">
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Open customer review ${index + 1}`}
                className="block w-full overflow-hidden rounded-2xl border border-border bg-card"
              >
                <img
                  src={src}
                  alt={`Customer review ${index + 1}`}
                  loading="lazy"
                  className="h-auto w-full"
                />
              </button>
            </li>
          ))}
        </ul>
      )}

      {active !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Customer review"
          onClick={() => setActive(null)}
          className="fixed inset-0 z-70 flex items-center justify-center bg-foreground/70 p-4"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setActive(null)}
            className="absolute right-4 top-4 rounded-full bg-background p-2"
          >
            <X size={22} />
          </button>
          <img
            src={SCREENSHOTS[active]}
            alt={`Customer review ${active + 1}`}
            onClick={(event) => event.stopPropagation()}
            className="max-h-full max-w-full rounded-2xl object-contain"
          />
        </div>
      )}

      <section className="rounded-2xl bg-secondary p-6 text-center">
        <p className="font-heading text-xl font-semibold">
          Shopped with us before?
        </p>
        <p className="mt-1 text-muted-foreground">
          We would love to hear how it went.
        </p>
        <WhatsAppButton
          message="Hello, I would like to leave a review."
          label="Send us your review"
          className="mt-4"
        />
      </section>
    </div>
  )
}