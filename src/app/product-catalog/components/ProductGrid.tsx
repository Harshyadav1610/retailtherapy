'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { Product } from '@/lib/products';
import ProductCard from './ProductCard';
import Icon from '@/components/ui/AppIcon';

interface ProductGridProps {
  products: Product[];
  onCartOpen: () => void;
}

export default function ProductGrid({ products, onCartOpen }: ProductGridProps) {
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAdded = (id: string) => {
    setAddedId(id);
    setTimeout(() => setAddedId(null), 1500);
    onCartOpen();
  };

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-5">
        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center"
          style={{ background: 'var(--muted)' }}
        >
          <Icon name="MagnifyingGlassIcon" size={36} className="text-muted-foreground" />
        </div>
        <div className="text-center">
          <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--foreground)' }}>
            No products found
          </h3>
          <p className="text-sm max-w-xs" style={{ color: 'var(--muted-foreground)' }}>
            Try adjusting your search or filters to find what you&apos;re looking for.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <p className="text-xs mb-4 font-medium" style={{ color: 'var(--muted-foreground)' }}>
        Showing {products.length} product{products.length !== 1 ? 's' : ''}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
        {products.map((product) => (
          <Link key={product.id} href={`/product-catalog/${product.id}`} className="block">
            <ProductCard
              product={product}
              justAdded={addedId === product.id}
              onAdded={handleAdded}
            />
          </Link>
        ))}
      </div>
    </>
  );
}