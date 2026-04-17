'use client'
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { Cart, createCart, addToCart, removeFromCart, updateCartLine, getCart } from '@/lib/shopify'

interface CartContextValue {
  cart: Cart | null
  cartOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (variantId: string, quantity?: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
  updateItem: (lineId: string, quantity: number) => Promise<void>
  itemCount: number
  loading: boolean
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('shopify_cart_id')
    if (saved) {
      getCart(saved).then(c => {
        if (c) setCart(c)
        else localStorage.removeItem('shopify_cart_id')
      })
    }
  }, [])

  const ensureCart = useCallback(async (): Promise<string> => {
    if (cart) return cart.id
    const newCart = await createCart()
    setCart(newCart)
    localStorage.setItem('shopify_cart_id', newCart.id)
    return newCart.id
  }, [cart])

  const addItem = useCallback(async (variantId: string, quantity = 1) => {
    setLoading(true)
    try {
      const cartId = await ensureCart()
      const updated = await addToCart(cartId, variantId, quantity)
      setCart(updated)
      localStorage.setItem('shopify_cart_id', updated.id)
      setCartOpen(true)
    } finally {
      setLoading(false)
    }
  }, [ensureCart])

  const removeItem = useCallback(async (lineId: string) => {
    if (!cart) return
    setLoading(true)
    try {
      const updated = await removeFromCart(cart.id, lineId)
      setCart(updated)
    } finally {
      setLoading(false)
    }
  }, [cart])

  const updateItem = useCallback(async (lineId: string, quantity: number) => {
    if (!cart) return
    setLoading(true)
    try {
      const updated = await updateCartLine(cart.id, lineId, quantity)
      setCart(updated)
    } finally {
      setLoading(false)
    }
  }, [cart])

  const itemCount = cart?.lines.nodes.reduce((sum, l) => sum + l.quantity, 0) ?? 0

  return (
    <CartContext.Provider value={{
      cart, cartOpen,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      addItem, removeItem, updateItem,
      itemCount, loading,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
