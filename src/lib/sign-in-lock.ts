const KEY = 'owner-lock'
const MAX_TRIES = 5
const LOCK_MS = 5 * 60 * 1000

interface LockState {
  tries: number
  until: number
}

function read(): LockState {
  try {
    const raw = localStorage.getItem(KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : null
    if (
      parsed &&
      typeof parsed === 'object' &&
      'tries' in parsed &&
      'until' in parsed &&
      typeof parsed.tries === 'number' &&
      typeof parsed.until === 'number'
    ) {
      return { tries: parsed.tries, until: parsed.until }
    }
  } catch {
    // Storage can be blocked. Fall through to the default.
  }
  return { tries: 0, until: 0 }
}

function write(state: LockState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    // Storage can be blocked. The lock then only lasts for this visit.
  }
}

export function lockRemainingMs() {
  return Math.max(0, read().until - Date.now())
}

export function recordFailure() {
  const tries = read().tries + 1

  if (tries >= MAX_TRIES) {
    write({ tries: 0, until: Date.now() + LOCK_MS })
  } else {
    write({ tries, until: 0 })
  }
}

export function resetLock() {
  write({ tries: 0, until: 0 })
}