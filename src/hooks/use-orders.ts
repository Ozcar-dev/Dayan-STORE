import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteOrder, fetchOrders, setOrderStatus } from '@/lib/orders-api'
import type { OrderStatus } from '@/types'

export function useOrders() {
  return useQuery({
    queryKey: ['admin-orders'],
    queryFn: fetchOrders,
    refetchInterval: 30_000,
  })
}

export function useOrderMutations() {
  const queryClient = useQueryClient()

  const refresh = () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] }),
      queryClient.invalidateQueries({ queryKey: ['order'] }),
    ])

  const setStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) =>
      setOrderStatus(id, status),
    onSuccess: refresh,
  })

  const remove = useMutation({
    mutationFn: (id: string) => deleteOrder(id),
    onSuccess: refresh,
  })

  return { setStatus, remove }
}