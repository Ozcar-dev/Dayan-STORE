import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Heart, Menu, X } from 'lucide-react'
import { useWishlist } from '@/hooks/use-wishlist'
import { cn, getWhatsAppLink } from '@/lib/utils'
import { SITE } from '@/constants/site'
import { NAV_LINKS } from '@/constants/navigation'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'rounded-full px-3 py-2 text-sm font-semibold transition-colors hover:bg-secondary',
    isActive && 'bg-secondary text-primary',
  )

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { ids } = useWishlist()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="min-w-0 truncate font-heading text-xl font-semibold text-primary"
        >
          {SITE.name}
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/wishlist"
            aria-label={`Wishlist, ${ids.length} saved`}
            onClick={() => setOpen(false)}
            className="relative rounded-full p-2 hover:bg-secondary"
          >
            <Heart size={24} />
            {ids.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-bold text-primary-foreground">
                {ids.length}
              </span>
            )}
          </Link>

          <a
            href={getWhatsAppLink('Hello, I would like to make an enquiry.')}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-whatsapp px-4 py-2 text-sm font-semibold text-whatsapp-foreground sm:inline-block"
          >
            Chat on WhatsApp
          </a>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="rounded-full p-2 hover:bg-secondary lg:hidden"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={linkClass}
              >
                {link.label}
              </NavLink>
            ))}
            <a
              href={getWhatsAppLink('Hello, I would like to make an enquiry.')}
              target="_blank"
              rel="noreferrer"
              className="mt-2 rounded-full bg-whatsapp px-4 py-2 text-center text-sm font-semibold text-whatsapp-foreground sm:hidden"
            >
              Chat on WhatsApp
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}