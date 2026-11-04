import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CATEGORIES } from '@/constants/categories'
import type { CategorySlug, Product } from '@/types'

export function useProductFilters(products: Product[]) {
  const [params, setParams] = useSearchParams()

  const query = params.get('q') ?? ''
  const categoryParam = params.get('category')
  const category: CategorySlug | null =
    CATEGORIES.find((item) => item.slug === categoryParam)?.slug ?? null

  const filtered = useMemo(() => {
    const text = query.trim().toLowerCase()

    return products.filter((product) => {
      if (category && product.category !== category) return false
      if (!text) return true

      const categoryName =
        CATEGORIES.find((item) => item.slug === product.category)?.name ?? ''

      const searchable = [
        product.name,
        product.description,
        categoryName,
        ...product.colours,
      ]
        .join(' ')
        .toLowerCase()

      return searchable.includes(text)
    })
  }, [products, query, category])

  const setQuery = (value: string) => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (value) next.set('q', value)
        else next.delete('q')
        return next
      },
      { replace: true },
    )
  }

  const setCategory = (value: CategorySlug | null) => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (value) next.set('category', value)
        else next.delete('category')
        return next
      },
      { replace: true },
    )
  }

  const clearFilters = () => setParams({}, { replace: true })

  return { query, category, filtered, setQuery, setCategory, clearFilters }
}