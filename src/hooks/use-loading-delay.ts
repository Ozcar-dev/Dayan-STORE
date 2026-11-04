import { useEffect, useState } from 'react'

export function useLoadingDelay(key: string, ms: number) {
  const [doneKey, setDoneKey] = useState<string | null>(null)

  useEffect(() => {
    if (ms <= 0) return
    const id = window.setTimeout(() => setDoneKey(key), ms)
    return () => window.clearTimeout(id)
  }, [key, ms])

  return ms > 0 && doneKey !== key
}