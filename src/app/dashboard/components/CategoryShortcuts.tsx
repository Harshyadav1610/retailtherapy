'use client';

import React from 'react';
import Link from 'next/link';

const CATEGORIES = [
  { id: 'cat-electronics', label: 'Electronics', emoji: '💻', count: 6, color: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.2)' },
  { id: 'cat-fashion', label: 'Fashion', emoji: '👗', count: 6, color: 'rgba(232,168,124,0.1)', border: 'rgba(232,168,124,0.3)' },
  { id: 'cat-furniture', label: 'Furniture', emoji: '🛋️', count: 6, color: 'rgba(120,113,108,0.1)', border: 'rgba(120,113,108,0.2)' },
  { id: 'cat-beauty', label: 'Beauty', emoji: '✨', count: 6, color: 'rgba(236,72,153,0.08)', border: 'rgba(236,72,153,0.2)' },
  { id: 'cat-shoes', label: 'Shoes', emoji: '👟', count: 6, color: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.2)' },
  { id: 'cat-gaming', label: 'Gaming', emoji: '🎮', count: 6, color: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.2)' },
  { id: 'cat-kitchen', label: 'Kitchen', emoji: '🍳', count: 6, color: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)' },
  { id: 'cat-fitness', label: 'Fitness', emoji: '🏃', count: 6, color: 'rgba(20,184,166,0.08)', border: 'rgba(20,184,166,0.2)' },
  { id: 'cat-books', label: 'Books', emoji: '📚', count: 6, color: 'rgba(234,179,8,0.08)', border: 'rgba(234,179,8,0.2)' },
  { id: 'cat-decor', label: 'Home Decor', emoji: '🏡', count: 6, color: 'rgba(232,168,124,0.08)', border: 'rgba(232,168,124,0.2)' },
];

export default function CategoryShortcuts() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-base" style={{ color: 'var(--foreground)' }}>Shop by Category</h3>
        <Link href="/product-catalog" className="text-xs font-medium" style={{ color: 'var(--accent)' }}>
          Browse all →
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-10 gap-3">
        {CATEGORIES?.map((cat) => (
          <Link
            key={cat?.id}
            href={`/product-catalog?category=${encodeURIComponent(cat?.label)}`}
            className="card-hover flex flex-col items-center gap-2 p-4 rounded-2xl text-center transition-all duration-150"
            style={{
              background: cat?.color,
              border: `1px solid ${cat?.border}`,
            }}
          >
            <span className="text-2xl">{cat?.emoji}</span>
            <span className="text-xs font-semibold" style={{ color: 'var(--foreground)' }}>{cat?.label}</span>
            <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{cat?.count} items</span>
          </Link>
        ))}
      </div>
    </div>
  );
}