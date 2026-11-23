export type CategorySlug = 'dress' | 'jeans' | 'two-piece' | 'bags' | 'tops'

export type StockStatus = 'in-stock' | 'limited' | 'sold-out'

export interface Category {
  slug: CategorySlug
  name: string
}

export interface Product {
  id: string
  name: string
  category: CategorySlug
  price: number
  description: string
  sizes: string[]
  colours: string[]
  images: string[]
  stock: StockStatus
}

export interface Review {
  id: string
  name: string
  text: string
}

export interface OrderStep {
  title: string
  text: string
}

export interface SizeRow {
  size: string
  bust: string
  waist: string
  hips: string
}

export interface Review {
  id: string
  name: string
  text: string
}

export interface CartLine {
  productId: string
  size: string
  colour: string
  quantity: number
}

export type OrderStatus = 'pending' | 'received'

export interface OrderItem {
  product_id: string
  name: string
  price: number
  quantity: number
  size: string
  colour: string
  image: string
}

export interface Order {
  id: string
  customer_name: string
  items: OrderItem[]
  item_count: number
  total: number
  status: OrderStatus
  created_at: string
  received_at: string | null
}