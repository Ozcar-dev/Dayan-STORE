import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Heart, Menu, Package, ShoppingCart } from 'lucide-react'
import { MobileSidebar } from '@/components/layout/MobileSidebar'
import { useCart } from '@/hooks/use-cart'
import { useWishlist } from '@/hooks/use-wishlist'
import { cn, getWhatsAppLink } from '@/lib/utils'
import { SITE } from '@/constants/site'
import { NAV_LINKS } from '@/constants/navigation'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'rounded-full px-3 py-2 text-sm font-semibold transition-colors hover:bg-secondary',
    isActive && 'bg-secondary text-primary',
  )

const badgeClass =
  'absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-bold text-primary-foreground'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { ids } = useWishlist()
  const { count } = useCart()

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-1">
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="-ml-2 rounded-full p-2 hover:bg-secondary lg:hidden"
            >
              <Menu size={24} />
            </button>
            <Link
              to="/"
              className="min-w-0 truncate font-heading text-xl font-semibold text-primary"
            >
              {SITE.name}
            </Link>
          </div>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClass}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-0.5 sm:gap-2">
            <Link
              to="/wishlist"
              aria-label={`Wishlist, ${ids.length} saved`}
              className="relative rounded-full p-2 hover:bg-secondary"
            >
              <Heart size={24} />
              {ids.length > 0 && (
                <span className={badgeClass}>{ids.length}</span>
              )}
            </Link>

            <Link
              to="/cart"
              aria-label={`Cart, ${count} items`}
              className="relative rounded-full p-2 hover:bg-secondary"
            >
              <ShoppingCart size={24} />
              {count > 0 && <span className={badgeClass}>{count}</span>}
            </Link>

            <Link
              to="/orders"
              aria-label="My orders"
              className="rounded-full p-2 hover:bg-secondary"
            >
              <Package size={24} />
            </Link>

            <a
              href={getWhatsAppLink('Hello, I would like to make an enquiry.')}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full bg-whatsapp px-4 py-2 text-sm font-semibold text-whatsapp-foreground sm:inline-block"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </header>

      <MobileSidebar open={open} onClose={() => setOpen(false)} />
    </>
  )
}