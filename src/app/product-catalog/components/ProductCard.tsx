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
  'New Arrival': { bg: 'rgba(0,0,0,0.06)', color: 'var(--foreground)' },
  Sale: { bg: 'rgba(192,57,43,0.1)', color: 'var(--danger)' },
  Bestseller: { bg: 'rgba(0,0,0,0.06)', color: 'var(--foreground)' },
  Limited: { bg: 'rgba(0,0,0,0.06)', color: 'var(--foreground)' },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => {
        const filled = s <= Math.floor(rating);
        return (
          <div
            key={`star-${s}`}
            className="w-1.5 h-1.5"
            style={{ background: filled ? 'var(--foreground)' : 'var(--border)' }}
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
      className="product-card group cursor-pointer"
      style={{ background: 'var(--background)' }}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden mb-4"
        style={{ aspectRatio: '3/4', background: 'var(--muted)' }}
      >
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
              className="px-2 py-0.5 tracking-editorial"
              style={{
                background: BADGE_STYLES[product.badge].bg,
                color: BADGE_STYLES[product.badge].color,
                fontSize: '0.55rem',
              }}
            >
              {product.badge}
            </span>
          )}
          {discount && (
            <span
              className="px-2 py-0.5 tracking-editorial"
              style={{ background: 'rgba(192,57,43,0.1)', color: 'var(--danger)', fontSize: '0.55rem' }}
            >
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center transition-all duration-200 ${
            wishlistAnimating ? 'scale-125' : 'scale-100'
          }`}
          style={{
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(8px)',
          }}
          title={isWishlisted ? 'Remove from wishlist' : 'Save for later'}
        >
          <Icon
            name="HeartIcon"
            size={14}
            variant={isWishlisted ? 'solid' : 'outline'}
            style={{ color: isWishlisted ? '#c0392b' : 'var(--muted-foreground)', transition: 'color 0.2s' } as React.CSSProperties}
          />
        </button>

        {/* Add to cart overlay */}
        <div className="product-actions absolute bottom-0 left-0 right-0 p-3">
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 py-3 font-medium transition-all duration-200 active:scale-95 tracking-widest uppercase"
            style={{
              background: justAdded ? 'var(--success)' : 'var(--foreground)',
              color: 'var(--background)',
              fontSize: '0.6rem',
              letterSpacing: '0.1em',
            }}
          >
            {justAdded ? (
              <>
                <Icon name="CheckIcon" size={12} />
                Added
              </>
            ) : (
              <>
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="px-0">
        <p className="tracking-editorial mb-1" style={{ color: 'var(--muted-foreground)', fontSize: '0.6rem' }}>
          {product.brand}
        </p>
        <h3 className="text-sm font-light mb-2 line-clamp-1" style={{ color: 'var(--foreground)' }}>
          {product.title}
        </h3>

        <div className="flex items-center gap-2 mb-2">
          <StarRating rating={product.rating} />
          <span className="font-mono-nums" style={{ color: 'var(--muted-foreground)', fontSize: '0.6rem' }}>
            ({product.reviewCount})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-medium price-tag" style={{ color: 'var(--foreground)' }}>
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs price-tag line-through" style={{ color: 'var(--muted-foreground)' }}>
                ${product.originalPrice}
              </span>
            )}
          </div>
          {!product.inStock && (
            <span className="tracking-editorial" style={{ color: 'var(--muted-foreground)', fontSize: '0.55rem' }}>
              Sold Out
            </span>
          )}
        </div>
      </div>
    </div>
  );
}