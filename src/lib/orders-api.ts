import { supabase } from '@/lib/supabase'
import type { CartLine, Order, OrderStatus } from '@/types'

const NOT_SAVED = 'Nothing was saved. Please sign out and sign in again.'

export async function placeOrder(
  name: string,
  lines: CartLine[],
): Promise<string> {
  const cart = lines.map((line) => ({
    product_id: line.productId,
    size: line.size,
    colour: line.colour,
    quantity: line.quantity,
  }))

  const { data, error } = await supabase.rpc('place_order', {
    p_name: name,
    p_cart: cart,
  })

  if (error) throw error
  return data as string
}

export async function fetchOrder(id: string): Promise<Order | null> {
  const { data, error } = await supabase
    .rpc('get_order', { p_id: id })
    .maybeSingle()

  if (error) throw error
  return (data as Order | null) ?? null
}

export async function fetchOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(200)

  if (error) throw error
  return (data ?? []) as Order[]
}

export async function setOrderStatus(id: string, status: OrderStatus) {
  const { data, error } = await supabase
    .from('orders')
    .update({
      status,
      received_at: status === 'received' ? new Date().toISOString() : null,
    })
    .eq('id', id)
    .select('id')

  if (error) throw error
  if (!data || data.length === 0) throw new Error(NOT_SAVED)
}

export async function deleteOrder(id: string) {
  const { data, error } = await supabase
    .from('orders')
    .delete()
    .eq('id', id)
    .select('id')

  if (error) throw error
  if (!data || data.length === 0) throw new Error(NOT_SAVED)
}

export async function fetchMyOrders(ids: string[]): Promise<Order[]> {
  if (ids.length === 0) return []

  const { data, error } = await supabase.rpc('get_orders', { p_ids: ids })

  if (error) throw error
  return (data ?? []) as Order[]
}