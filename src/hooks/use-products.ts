import { PRODUCTS } from '@/constants/products'
import type { Product } from '@/types'

export function useProducts() {
  const products: Product[] = PRODUCTS

  const getProductById = (id: string) =>
    products.find((product) => product.id === id)

  return { products, isLoading: false, getProductById }
}