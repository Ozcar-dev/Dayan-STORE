const KEY = 'dayan-my-orders'
const MAX = 50

export function readMyOrders(): string[] {
  try {
    const raw = localStorage.getItem(KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []

    return Array.isArray(parsed)
      ? parsed
          .filter((item): item is string => typeof item === 'string')
          .slice(0, MAX)
      : []
  } catch {
    return []
  }
}

export function recordOrder(id: string) {
  try {
    const next = [id, ...readMyOrders().filter((item) => item !== id)].slice(
      0,
      MAX,
    )
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    // Storage can be blocked. The order is saved on the server either way.
  }
}