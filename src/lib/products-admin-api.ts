import { supabase } from '@/lib/supabase'
import type { StockStatus } from '@/types'

export interface ProductInput {
  name: string
  category: string
  price: number
  description: string
  sizes: string[]
  colours: string[]
  images: string[]
  stock: StockStatus
}

const NOT_SAVED = 'Nothing was saved. Please sign out and sign in again.'

export async function createProduct(input: ProductInput) {
  const { error } = await supabase.from('products').insert(input)
  if (error) throw error
}

export async function updateProduct(id: string, input: Partial<ProductInput>) {
  const { data, error } = await supabase
    .from('products')
    .update(input)
    .eq('id', id)
    .select('id')

  if (error) throw error
  if (!data || data.length === 0) throw new Error(NOT_SAVED)
}

export async function deleteProduct(id: string) {
  const { data, error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)
    .select('id')

  if (error) throw error
  if (!data || data.length === 0) throw new Error(NOT_SAVED)
}