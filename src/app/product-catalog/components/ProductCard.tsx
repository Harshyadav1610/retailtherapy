'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import type { Product } from '@/lib/products';
import { useStore } from '@/lib/store';

interface ProductCardProps {
  product: Product;
  justAdded: boolean;
  onAdded: (id: string) => void;
}

const BADGE_STYLES: Record<string, { bg: string; color: string }> = {
  'New Arrival': { bg: 'rgba(59,130,246,0.15)', color: '#3b82f6' },
  Sale: { bg: 'rgba(239,68,68,0.15)', color: 'var(--danger)' },
  Bestseller: { bg: 'rgba(232,168,124,0.2)', color: 'var(--accent)' },
  Limited: { bg: 'rgba(139,92,246,0.15)', color: '#8b5cf6' },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => {
        const filled = s <= Math.floor(rating);
        const half = !filled && s - 0.5 <= rating;
        return (
          <Icon
            key={`star-${s}`}
            name="StarIcon"
            size={11}
            className={filled || half ? 'star-filled' : 'star-empty'}
          />
        );
      })}
    </div>
  );
}

export default function ProductCard({ product, justAdded, onAdded }: ProductCardProps) {
  const addToCart = useStore((s) => s.addToCart);
  const toggleWishlist = useStore((s) => s.toggleWishlist);
  const wishlist = useStore((s) => s.wishlist);
  const isWishlisted = wishlist.some((p) => p.id === product.id);
  const [wishlistAnimating, setWishlistAnimating] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    onAdded(product.id);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product);
    setWishlistAnimating(true);
    setTimeout(() => setWishlistAnimating(false), 400);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div
      className="product-card group rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-card-hover cursor-pointer"
      style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden" style={{ background: 'var(--muted)' }}>
        <AppImage
          src={product.image}
          alt={`${product.title} by ${product.brand} — product image`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="product-card-img object-cover"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && BADGE_STYLES[product.badge] && (
            <span
              className="px-2 py-0.5 rounded-full text-xs font-semibold"
              style={{
                background: BADGE_STYLES[product.badge].bg,
                color: BADGE_STYLES[product.badge].color,
              }}
            >
              {product.badge}
            </span>
          )}
          {discount && (
            <span
              className="px-2 py-0.5 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(239,68,68,0.15)', color: 'var(--danger)' }}
            >
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            wishlistAnimating ? 'scale-150' : 'scale-100'
          }`}
          style={{
            background: isWishlisted ? 'rgba(232,93,117,0.2)' : 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(8px)',
            boxShadow: isWishlisted ? '0 0 0 2px rgba(232,93,117,0.3)' : 'none',
          }}
          title={isWishlisted ? 'Remove from wishlist' : 'Save for later'}
        >
          <Icon
            name="HeartIcon"
            size={15}
            variant={isWishlisted ? 'solid' : 'outline'}
            style={{ color: isWishlisted ? '#e85d75' : 'var(--muted-foreground)', transition: 'color 0.2s' } as React.CSSProperties}
          />
        </button>

        {/* Add to cart overlay */}
        <div className="product-actions absolute bottom-0 left-0 right-0 p-3">
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all duration-150 active:scale-95"
            style={{
              background: justAdded ? 'var(--success)' : 'var(--primary)',
              color: 'var(--primary-foreground)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {justAdded ? (
              <>
                <Icon name="CheckIcon" size={15} />
                Added to Cart
              </>
            ) : (
              <>
                <Icon name="ShoppingCartIcon" size={15} />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs font-medium mb-0.5 tracking-wide uppercase" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.06em' }}>
          {product.brand}
        </p>
        <h3 className="font-semibold text-sm mb-2 line-clamp-2 leading-snug" style={{ color: 'var(--foreground)' }}>
          {product.title}
        </h3>

        <div className="flex items-center gap-1.5 mb-3">
          <StarRating rating={product.rating} />
          <span className="text-xs font-semibold" style={{ color: 'var(--foreground)' }}>{product.rating}</span>
          <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-extrabold price-tag" style={{ color: 'var(--foreground)' }}>
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs price-tag line-through" style={{ color: 'var(--muted-foreground)' }}>
                ${product.originalPrice}
              </span>
            )}
          </div>
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{
              background: product.inStock ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
              color: product.inStock ? 'var(--success)' : 'var(--danger)',
            }}
          >
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>
    </div>
  );
}