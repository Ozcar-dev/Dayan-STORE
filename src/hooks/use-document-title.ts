import { useEffect } from 'react'
import { SITE } from '@/constants/site'

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = `${title} | ${SITE.name}`
  }, [title])
}