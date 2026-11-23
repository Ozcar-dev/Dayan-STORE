import { NavLink } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { OWNER_PATH } from '@/constants/site'
import { useAuth } from '@/hooks/use-auth'
import { useOrders } from '@/hooks/use-orders'
import { cn } from '@/lib/utils'

const pill = ({ isActive }: { isActive: boolean }) =>
  cn(
    'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
    isActive
      ? 'border-primary bg-primary text-primary-foreground'
      : 'border-border bg-card hover:bg-secondary',
  )

export function AdminNav() {
  const { signOut } = useAuth()
  const { data } = useOrders()
  const waiting = data?.filter((order) => order.status === 'pending').length ?? 0

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <nav className="flex gap-2" aria-label="Admin">
        <NavLink to={OWNER_PATH} end className={pill}>
          Products
        </NavLink>
        <NavLink to={`${OWNER_PATH}/orders`} className={pill}>
          Orders
          {waiting > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-bold text-accent-foreground">
              {waiting}
            </span>
          )}
        </NavLink>
      </nav>

      <Button variant="outline" onClick={() => void signOut()}>
        Sign out
      </Button>
    </div>
  )
}