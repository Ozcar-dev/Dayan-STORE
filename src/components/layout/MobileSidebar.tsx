import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { X } from 'lucide-react'
import { SocialLinks } from '@/components/ui/SocialLinks'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { NAV_LINKS } from '@/constants/navigation'
import { SITE } from '@/constants/site'
import { cn } from '@/lib/utils'

interface MobileSidebarProps {
  open: boolean
  onClose: () => void
}

const LINKS = [
  ...NAV_LINKS,
  { label: 'Custom Order', to: '/custom-order' },
  { label: 'Wishlist', to: '/wishlist' },
  { label: 'Cart', to: '/cart' },
]

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'block rounded-xl px-4 py-3 text-base font-semibold transition-colors hover:bg-secondary',
    isActive && 'bg-secondary text-primary',
  )

export function MobileSidebar({ open, onClose }: MobileSidebarProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-65 bg-foreground/40 transition-opacity duration-300 lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      <aside
        aria-label="Menu"
        className={cn(
          'fixed inset-y-0 left-0 z-70 flex w-72 max-w-[85vw] flex-col bg-background shadow-xl transition-[transform,visibility] duration-300 lg:hidden',
          open ? 'visible translate-x-0' : 'invisible -translate-x-full',
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4">
          <p className="truncate font-heading text-lg font-semibold text-primary">
            {SITE.name}
          </p>
          <button
            ref={closeRef}
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="rounded-full p-2 hover:bg-secondary"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="space-y-1">
            {LINKS.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} onClick={onClose} className={linkClass}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="shrink-0 space-y-4 border-t border-border p-4">
          <WhatsAppButton
            message="Hello, I would like to make an enquiry."
            label="Chat on WhatsApp"
            className="w-full"
          />
          <SocialLinks />
          <p className="text-sm text-muted-foreground">{SITE.hours}</p>
        </div>
      </aside>
    </>
  )
}