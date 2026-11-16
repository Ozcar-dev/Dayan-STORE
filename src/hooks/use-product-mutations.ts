import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from '@/lib/products-admin-api'
import type { ProductInput } from '@/lib/products-admin-api'

export function useProductMutations() {
  const queryClient = useQueryClient()

  const refresh = () =>
    queryClient.invalidateQueries({ queryKey: ['products'] })

  const create = useMutation({
    mutationFn: (input: ProductInput) => createProduct(input),
    onSuccess: refresh,
  })

  const update = useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<ProductInput> }) =>
      updateProduct(id, input),
    onSuccess: refresh,
  })

  const remove = useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: refresh,
  })

  return { create, update, remove }
}