import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '@/lib/products-api'
import type { Product } from '@/types'

const NONE: Product[] = []

export function useProducts() {
  const query = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })

  const products = query.data ?? NONE

  const getProductById = (id: string) =>
    products.find((product) => product.id === id)

  return {
    products,
    isLoading: query.isPending,
    isError: query.isError,
    refetch: query.refetch,
    getProductById,
  }
}