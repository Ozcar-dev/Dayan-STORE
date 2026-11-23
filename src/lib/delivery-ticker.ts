import { DELIVERY_NOTES } from '@/constants/delivery-notes'

const INTERVAL_MS = 5000
const COUNT = DELIVERY_NOTES.length

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}

function pickStep(count: number) {
  for (let step = Math.max(2, Math.floor(count * 0.37)); step < count; step += 1) {
    if (gcd(step, count) === 1) return step
  }
  return 1
}

const STEP = pickStep(COUNT)

let tick = Math.floor(Math.random() * COUNT)
let timer: number | undefined
const listeners = new Set<() => void>()

export function subscribeTicker(listener: () => void) {
  listeners.add(listener)

  if (listeners.size === 1) {
    timer = window.setInterval(() => {
      tick += 1
      listeners.forEach((notify) => notify())
    }, INTERVAL_MS)
  }

  return () => {
    listeners.delete(listener)

    if (listeners.size === 0 && timer !== undefined) {
      window.clearInterval(timer)
      timer = undefined
    }
  }
}

export function getTick() {
  return tick
}

export function noteIndex(slot: number, at: number) {
  return (((slot * STEP + at) % COUNT) + COUNT) % COUNT
}