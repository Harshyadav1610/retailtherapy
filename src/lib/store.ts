'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from './products';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface FakeOrder {
  id: string;
  items: CartItem[];
  total: number;
  savings: number;
  placedAt: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  trackingId: string;
  estimatedDelivery: string;
}

interface StoreState {
  cart: CartItem[];
  wishlist: Product[];
  wishlistItems: WishlistItem[];
  orders: FakeOrder[];
  totalSaved: number;
  streak: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  moveToCart: (product: Product) => void;
  placeOrder: (items: CartItem[]) => FakeOrder;
  getCartTotal: () => number;
  getCartCount: () => number;
}

// Backend integration point: replace zustand persist with Supabase user data
export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      wishlistItems: [],
      orders: [],
      totalSaved: 2847.50,
      streak: 14,

      addToCart: (product) => {
        set((state) => {
          const existing = state.cart.find((i) => i.product.id === product.id);
          if (existing) {
            return {
              cart: state.cart.map((i) =>
                i.product.id === product.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return { cart: [...state.cart, { product, quantity: 1 }] };
        });
      },

      removeFromCart: (productId) => {
        set((state) => ({
          cart: state.cart.filter((i) => i.product.id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity < 1) {
          get().removeFromCart(productId);
          return;
        }
        set((state) => ({
          cart: state.cart.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ cart: [] }),

      toggleWishlist: (product) => {
        set((state) => {
          const exists = state.wishlist.find((p) => p.id === product.id);
          if (exists) {
            return {
              wishlist: state.wishlist.filter((p) => p.id !== product.id),
              wishlistItems: state.wishlistItems.filter((wi) => wi.product.id !== product.id),
            };
          }
          return {
            wishlist: [...state.wishlist, product],
            wishlistItems: [
              ...state.wishlistItems,
              { product, addedAt: new Date().toISOString() },
            ],
          };
        });
      },

      removeFromWishlist: (productId) => {
        set((state) => ({
          wishlist: state.wishlist.filter((p) => p.id !== productId),
          wishlistItems: state.wishlistItems.filter((wi) => wi.product.id !== productId),
        }));
      },

      moveToCart: (product) => {
        get().removeFromWishlist(product.id);
        get().addToCart(product);
      },

      placeOrder: (items) => {
        const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
        const trackingId = `RT-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
        const order: FakeOrder = {
          id: `order-${Date.now()}`,
          items,
          total,
          savings: total,
          placedAt: new Date().toISOString(),
          status: 'Processing',
          trackingId,
          estimatedDelivery: '2-4 Business Days',
        };
        set((state) => ({
          orders: [order, ...state.orders],
          totalSaved: state.totalSaved + total,
          cart: [],
          streak: state.streak + 1,
        }));
        return order;
      },

      getCartTotal: () => {
        return get().cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
      },

      getCartCount: () => {
        return get().cart.reduce((sum, i) => sum + i.quantity, 0);
      },
    }),
    {
      name: 'retail-therapy-store',
    }
  )
);