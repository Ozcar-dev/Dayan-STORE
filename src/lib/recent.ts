const KEY = 'dayan-recent'
const MAX = 12

export function readRecent(): string[] {
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

export function recordRecent(id: string) {
  try {
    const next = [id, ...readRecent().filter((item) => item !== id)].slice(0, MAX)
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    // Storage can be blocked. Recently viewed then only works for this visit.
  }
}