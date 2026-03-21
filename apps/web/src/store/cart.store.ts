import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '@jewelry/shared'

interface CartStore {
  items: CartItem[]

  /** Add a product to the cart. If it already exists, increments quantity. */
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void

  /** Remove a product from the cart entirely. */
  removeItem: (productId: string) => void

  /** Set an exact quantity. Removes the item if quantity ≤ 0. */
  updateQuantity: (productId: string, quantity: number) => void

  /** Empty the cart (e.g. after successful order). */
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find((cartItem) => cartItem.productId === item.productId)
          if (existingItem) {
            return {
              items: state.items.map((cartItem) =>
                cartItem.productId === item.productId
                  ? { ...cartItem, quantity: cartItem.quantity + quantity }
                  : cartItem,
              ),
            }
          }
          return { items: [...state.items, { ...item, quantity }] }
        })
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((cartItem) => cartItem.productId !== productId),
        }))
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        set((state) => ({
          items: state.items.map((cartItem) =>
            cartItem.productId === productId ? { ...cartItem, quantity } : cartItem,
          ),
        }))
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'jewelry-cart',
      // skipHydration prevents SSR/client mismatch.
      // Call useCartStore.persist.rehydrate() once on the client (StoreHydration).
      skipHydration: true,
    },
  ),
)

// ── Selector hooks ────────────────────────────────────────────────────────────
// Fine-grained selectors prevent unnecessary re-renders — components subscribe
// only to the slice of state they actually need.

export const useCartItems = () => useCartStore((state) => state.items)

export const useCartTotalItems = () =>
  useCartStore((state) => state.items.reduce((sum, cartItem) => sum + cartItem.quantity, 0))

export const useCartTotalPrice = () =>
  useCartStore((state) =>
    state.items.reduce((sum, cartItem) => sum + cartItem.price * cartItem.quantity, 0),
  )
