import { createContext } from 'react'

export interface WishlistContextValue {
  ids: string[]
  has: (id: string) => boolean
  toggle: (id: string) => void
  clear: () => void
}

export const WishlistContext = createContext<WishlistContextValue | null>(null)