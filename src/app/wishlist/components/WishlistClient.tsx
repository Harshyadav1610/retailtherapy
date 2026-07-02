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
      <div className="p-6 lg:p-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="tracking-editorial mb-2" style={{ color: 'var(--muted-foreground)', fontSize: '0.65rem' }}>
              My Account
            </p>
            <h1
              className="font-display"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 300, color: 'var(--foreground)', fontStyle: 'italic' }}
            >
              Saved Pieces
            </h1>
            {!isEmpty && (
              <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)', fontWeight: 300 }}>
                {wishlist.length} {wishlist.length !== 1 ? 'items' : 'item'} · Total value{' '}
                <span className="font-medium price-tag" style={{ color: 'var(--foreground)' }}>
                  ${totalValue.toLocaleString()}
                </span>
              </p>
            )}
          </div>
          {!isEmpty && (
            <Link
              href="/product-catalog"
              className="btn-outline text-xs"
            >
              Continue Shopping
            </Link>
          )}
        </div>

        {/* Empty state */}
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-32 gap-8 text-center">
            <div
              className="w-20 h-20 flex items-center justify-center"
              style={{ background: 'var(--muted)' }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M16 28S4 20 4 12a8 8 0 0 1 12-6.9A8 8 0 0 1 28 12c0 8-12 16-12 16z"
                  fill="none"
                  stroke="var(--muted-foreground)"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h2
                className="font-display mb-3"
                style={{ fontSize: '1.75rem', fontWeight: 300, color: 'var(--foreground)', fontStyle: 'italic' }}
              >
                Nothing saved yet
              </h2>
              <p className="text-sm mb-8" style={{ color: 'var(--muted-foreground)', fontWeight: 300, maxWidth: '280px', margin: '0 auto 2rem' }}>
                Browse our collection and tap the heart icon to save pieces you love.
              </p>
              <Link href="/product-catalog" className="btn-primary">
                Explore Collection
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Toolbar */}
            <div
              className="flex items-center gap-3 flex-wrap mb-8 border-b pb-6"
              style={{ borderColor: 'var(--border)' }}
            >
              {/* Search */}
              <div className="relative flex-1 min-w-[200px]">
                <Icon
                  name="MagnifyingGlassIcon"
                  size={14}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="text"
                  placeholder="Search saved pieces..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input-field pl-10 py-3 text-xs w-full"
                  style={{ borderRadius: '0' }}
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-60"
                  >
                    <Icon name="XMarkIcon" size={12} className="text-muted-foreground" />
                  </button>
                )}
              </div>

              {/* Sort */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as WishlistSort)}
                className="input-field py-3 text-xs w-auto min-w-[180px]"
                style={{ borderRadius: '0' }}
              >
                <option value="date-desc">Date Added: Newest</option>
                <option value="date-asc">Date Added: Oldest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="brand">Brand: A–Z</option>
              </select>

              {search && (
                <span className="tracking-editorial" style={{ color: 'var(--muted-foreground)', fontSize: '0.6rem' }}>
                  {filtered.length} result{filtered.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>

            {/* No search results */}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 gap-5 text-center">
                <div
                  className="w-14 h-14 flex items-center justify-center"
                  style={{ background: 'var(--muted)' }}
                >
                  <Icon name="MagnifyingGlassIcon" size={20} className="text-muted-foreground" />
                </div>
                <div>
                  <h3
                    className="font-display mb-1"
                    style={{ fontSize: '1.25rem', fontWeight: 300, color: 'var(--foreground)', fontStyle: 'italic' }}
                  >
                    No matches found
                  </h3>
                  <p className="text-xs" style={{ color: 'var(--muted-foreground)', fontWeight: 300 }}>
                    Try a different search term.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((wi) => (
                  <div key={wi.product.id} className="flex flex-col gap-3">
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
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 tracking-editorial transition-all duration-150 active:scale-95"
                        style={{
                          background: movedId === wi.product.id ? 'var(--success)' : 'var(--foreground)',
                          color: 'var(--background)',
                          fontSize: '0.6rem',
                        }}
                      >
                        {movedId === wi.product.id ? (
                          <>
                            <Icon name="CheckIcon" size={11} />
                            Moved to Bag
                          </>
                        ) : (
                          <>
                            Move to Bag
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => removeFromWishlist(wi.product.id)}
                        className="flex items-center justify-center w-9 transition-all duration-150 hover:opacity-60 active:scale-95"
                        style={{ border: '1px solid var(--border)' }}
                        title="Remove from wishlist"
                      >
                        <Icon name="TrashIcon" size={12} className="text-muted-foreground" />
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
