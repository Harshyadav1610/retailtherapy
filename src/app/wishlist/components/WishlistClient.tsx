'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import AppLayout from '@/components/AppLayout';
import Icon from '@/components/ui/AppIcon';
import ProductCard from '@/app/product-catalog/components/ProductCard';
import type { WishlistItem } from '@/lib/store';

type WishlistSort = 'date-desc' | 'date-asc' | 'price-asc' | 'price-desc' | 'brand';

export default function WishlistClient() {
  const wishlistItems = useStore((s) => s.wishlistItems);
  const wishlist = useStore((s) => s.wishlist);
  const removeFromWishlist = useStore((s) => s.removeFromWishlist);
  const moveToCart = useStore((s) => s.moveToCart);
  const cartCount = useStore((s) => s.getCartCount());

  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<WishlistSort>('date-desc');
  const [addedId, setAddedId] = useState<string | null>(null);
  const [movedId, setMovedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let items = [...wishlistItems];

    // Merge any wishlist products that don't have a wishlistItem entry (legacy data)
    const itemIds = new Set(items.map((wi) => wi.product.id));
    wishlist.forEach((p) => {
      if (!itemIds.has(p.id)) {
        items.push({ product: p, addedAt: new Date().toISOString() });
      }
    });

    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (wi) =>
          wi.product.title.toLowerCase().includes(q) ||
          wi.product.brand.toLowerCase().includes(q) ||
          wi.product.category.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case 'date-asc':
        items.sort((a, b) => new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime());
        break;
      case 'date-desc':
        items.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
        break;
      case 'price-asc':
        items.sort((a, b) => a.product.price - b.product.price);
        break;
      case 'price-desc':
        items.sort((a, b) => b.product.price - a.product.price);
        break;
      case 'brand':
        items.sort((a, b) => a.product.brand.localeCompare(b.product.brand));
        break;
    }

    return items;
  }, [wishlistItems, wishlist, search, sort]);

  const totalValue = useMemo(
    () => wishlist.reduce((sum, p) => sum + p.price, 0),
    [wishlist]
  );

  const handleMoveToCart = (wi: WishlistItem) => {
    moveToCart(wi.product);
    setMovedId(wi.product.id);
    setTimeout(() => setMovedId(null), 1500);
  };

  const isEmpty = wishlist.length === 0;

  return (
    <AppLayout cartCount={cartCount} wishlistCount={wishlist.length}>
      <div className="p-5 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
              My Wishlist
            </h1>
            {!isEmpty && (
              <p className="text-sm mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
                {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} · Total value{' '}
                <span className="font-semibold" style={{ color: 'var(--foreground)' }}>
                  ${totalValue.toLocaleString()}
                </span>
              </p>
            )}
          </div>
          {!isEmpty && (
            <Link
              href="/product-catalog"
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-150 active:scale-95"
              style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
            >
              <Icon name="ShoppingBagIcon" size={16} />
              Continue Shopping
            </Link>
          )}
        </div>

        {/* Empty state */}
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
            <div
              className="w-28 h-28 rounded-3xl flex items-center justify-center"
              style={{ background: 'var(--muted)' }}
            >
              <svg
                width="56"
                height="56"
                viewBox="0 0 56 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M28 48S8 34 8 20a12 12 0 0 1 20-9 12 12 0 0 1 20 9c0 14-20 28-20 28z"
                  fill="rgba(232,93,117,0.12)"
                  stroke="#e85d75"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 26l4 4 8-8"
                  stroke="rgba(232,93,117,0.5)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
                Your wishlist is empty
              </h2>
              <p className="text-sm max-w-xs mx-auto mb-6" style={{ color: 'var(--muted-foreground)' }}>
                Browse our catalog and tap the heart icon on any product to save it here for later.
              </p>
              <Link
                href="/product-catalog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-150 active:scale-95"
                style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
              >
                <Icon name="ShoppingBagIcon" size={16} />
                Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Toolbar */}
            <div
              className="flex items-center gap-3 flex-wrap mb-6 p-4 rounded-2xl border"
              style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
            >
              {/* Search */}
              <div className="relative flex-1 min-w-[200px]">
                <Icon
                  name="MagnifyingGlassIcon"
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="text"
                  placeholder="Search wishlist..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input-field pl-9 py-2 text-sm w-full"
                  style={{ background: 'var(--muted)' }}
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <Icon name="XMarkIcon" size={14} className="text-muted-foreground" />
                  </button>
                )}
              </div>

              {/* Sort */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as WishlistSort)}
                className="input-field py-2 text-sm w-auto min-w-[180px]"
                style={{ background: 'var(--muted)' }}
              >
                <option value="date-desc">Date Added: Newest</option>
                <option value="date-asc">Date Added: Oldest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="brand">Brand: A–Z</option>
              </select>

              {search && (
                <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                  {filtered.length} result{filtered.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>

            {/* No search results */}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: 'var(--muted)' }}
                >
                  <Icon name="MagnifyingGlassIcon" size={28} className="text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1" style={{ color: 'var(--foreground)' }}>
                    No matches found
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                    Try a different search term.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filtered.map((wi) => (
                  <div key={wi.product.id} className="flex flex-col gap-2">
                    <ProductCard
                      product={wi.product}
                      justAdded={addedId === wi.product.id}
                      onAdded={(id) => {
                        setAddedId(id);
                        setTimeout(() => setAddedId(null), 1500);
                      }}
                    />
                    {/* Wishlist actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleMoveToCart(wi)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all duration-150 active:scale-95"
                        style={{
                          background: movedId === wi.product.id ? 'var(--success)' : 'var(--primary)',
                          color: 'var(--primary-foreground)',
                        }}
                      >
                        {movedId === wi.product.id ? (
                          <>
                            <Icon name="CheckIcon" size={13} />
                            Moved to Cart
                          </>
                        ) : (
                          <>
                            <Icon name="ShoppingCartIcon" size={13} />
                            Move to Cart
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => removeFromWishlist(wi.product.id)}
                        className="flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-150 hover:bg-red-50 active:scale-95"
                        style={{ border: '1px solid var(--border)' }}
                        title="Remove from wishlist"
                      >
                        <Icon name="TrashIcon" size={14} style={{ color: 'var(--danger)' } as React.CSSProperties} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </AppLayout>
  );
}
