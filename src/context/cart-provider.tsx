import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { CartContext } from '@/context/cart-context'
import { MAX_LINES, clampQuantity, lineKey } from '@/lib/cart'
import type { CartLine } from '@/types'

const STORAGE_KEY = 'dayan-cart'

function isLine(value: unknown): value is CartLine {
  if (!value || typeof value !== 'object') return false
  const item = value as Record<string, unknown>

  return (
    typeof item.productId === 'string' &&
    typeof item.size === 'string' &&
    typeof item.colour === 'string' &&
    typeof item.quantity === 'number' &&
    item.quantity >= 1
  )
}

function readSaved(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    if (!Array.isArray(parsed)) return []

    return parsed
      .filter(isLine)
      .slice(0, MAX_LINES)
      .map((line) => ({ ...line, quantity: clampQuantity(line.quantity) }))
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(readSaved)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {
      // Storage can be blocked (private mode). The cart still works for this visit.
    }
  }, [lines])

  const add = useCallback(
    (
      line: Pick<CartLine, 'productId' | 'size' | 'colour'>,
      quantity: number,
    ) => {
      const key = lineKey(line)
      const exists = lines.some((item) => lineKey(item) === key)

      if (!exists && lines.length >= MAX_LINES) return false

      setLines((current) => {
        if (current.some((item) => lineKey(item) === key)) {
          return current.map((item) =>
            lineKey(item) === key
              ? { ...item, quantity: clampQuantity(item.quantity + quantity) }
              : item,
          )
        }
        return [...current, { ...line, quantity: clampQuantity(quantity) }]
      })

      return true
    },
    [lines],
  )

  const setQuantity = useCallback((key: string, quantity: number) => {
    setLines((current) =>
      current.map((item) =>
        lineKey(item) === key
          ? { ...item, quantity: clampQuantity(quantity) }
          : item,
      ),
    )
  }, [])

  const remove = useCallback((key: string) => {
    setLines((current) => current.filter((item) => lineKey(item) !== key))
  }, [])

  const clear = useCallback(() => setLines([]), [])

  const count = useMemo(
    () => lines.reduce((sum, item) => sum + item.quantity, 0),
    [lines],
  )

  const value = useMemo(
    () => ({ lines, count, add, setQuantity, remove, clear }),
    [lines, count, add, setQuantity, remove, clear],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}