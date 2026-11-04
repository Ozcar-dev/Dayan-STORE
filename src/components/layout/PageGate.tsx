import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { PAGE_LOADER_MS } from '@/constants/loader'
import { useLoadingDelay } from '@/hooks/use-loading-delay'

interface PageGateProps {
  fallback: ReactNode
  children: ReactNode
}

export function PageGate({ fallback, children }: PageGateProps) {
  const { pathname } = useLocation()
  const waiting = useLoadingDelay(pathname, PAGE_LOADER_MS)

  return <>{waiting ? fallback : children}</>
}