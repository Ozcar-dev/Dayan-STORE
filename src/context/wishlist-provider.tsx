import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { WishlistContext } from '@/context/wishlist-context'

const STORAGE_KEY = 'dayan-wishlist'

function readSaved(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === 'string')
      : []
  } catch {
    return []
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(readSaved)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    } catch {
      // Storage can be blocked (private mode). The list still works for this visit.
    }
  }, [ids])

  const has = useCallback((id: string) => ids.includes(id), [ids])

  const toggle = useCallback((id: string) => {
    setIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    )
  }, [])

  const clear = useCallback(() => setIds([]), [])

  const value = useMemo(
    () => ({ ids, has, toggle, clear }),
    [ids, has, toggle, clear],
  )

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  )
}