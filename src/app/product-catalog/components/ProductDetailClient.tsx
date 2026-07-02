'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import type { Product } from '@/lib/products';
import { useStore } from '@/lib/store';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface ProductDetailClientProps {
  product: Product;
  related: Product[];
  recommended: Product[];
}

// ─── Mock extra images (use product image + tinted variants) ─────────────────
function getGalleryImages(product: Product) {
  return [
    { src: product.image, alt: `${product.title} — front view` },
    { src: product.image, alt: `${product.title} — side view` },
    { src: product.image, alt: `${product.title} — detail view` },
    { src: product.image, alt: `${product.title} — back view` },
  ];
}

// ─── Size Guide Modal ────────────────────────────────────────────────────────
function SizeGuideModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto slide-up"
        style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
      >
        <div className="flex items-center justify-between px-8 py-6 border-b" style={{ borderColor: 'var(--border)' }}>
          <div>
            <p className="tracking-editorial mb-1" style={{ color: 'var(--muted-foreground)', fontSize: '0.6rem' }}>ÉLAN</p>
            <h2 className="font-display text-2xl font-light" style={{ color: 'var(--foreground)' }}>Size Guide</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:opacity-60 transition-opacity">
            <Icon name="XMarkIcon" size={18} style={{ color: 'var(--muted-foreground)' } as React.CSSProperties} />
          </button>
        </div>

        <div className="px-8 py-6">
          <p className="text-xs font-light mb-6" style={{ color: 'var(--muted-foreground)', lineHeight: 1.7 }}>
            All measurements are in centimetres. We recommend measuring yourself and comparing to the size chart below for the best fit.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Size', 'Bust', 'Waist', 'Hips', 'Length'].map((h) => (
                    <th key={h} className="py-3 pr-6 text-left tracking-editorial font-normal" style={{ color: 'var(--muted-foreground)', fontSize: '0.6rem' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['XS', '80–83', '62–65', '88–91', '95'],
                  ['S', '84–87', '66–69', '92–95', '96'],
                  ['M', '88–92', '70–74', '96–100', '97'],
                  ['L', '93–97', '75–80', '101–106', '98'],
                  ['XL', '98–103', '81–87', '107–113', '99'],
                  ['XXL', '104–110', '88–95', '114–121', '100'],
                ].map(([size, bust, waist, hips, length]) => (
                  <tr key={size} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td className="py-3 pr-6 font-medium" style={{ color: 'var(--foreground)', fontSize: '0.75rem' }}>{size}</td>
                    <td className="py-3 pr-6 font-mono-nums" style={{ color: 'var(--foreground)', fontSize: '0.75rem' }}>{bust}</td>
                    <td className="py-3 pr-6 font-mono-nums" style={{ color: 'var(--foreground)', fontSize: '0.75rem' }}>{waist}</td>
                    <td className="py-3 pr-6 font-mono-nums" style={{ color: 'var(--foreground)', fontSize: '0.75rem' }}>{hips}</td>
                    <td className="py-3 font-mono-nums" style={{ color: 'var(--foreground)', fontSize: '0.75rem' }}>{length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 p-5" style={{ background: 'var(--muted)' }}>
            <p className="tracking-editorial mb-3" style={{ color: 'var(--muted-foreground)', fontSize: '0.6rem' }}>HOW TO MEASURE</p>
            <ul className="space-y-2">
              {[
                ['Bust', 'Measure around the fullest part of your chest, keeping the tape horizontal.'],
                ['Waist', 'Measure around your natural waistline, the narrowest part of your torso.'],
                ['Hips', 'Measure around the fullest part of your hips, approximately 20cm below your waist.'],
              ].map(([label, desc]) => (
                <li key={label} className="flex gap-3 text-xs font-light" style={{ color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
                  <span className="font-medium flex-shrink-0" style={{ color: 'var(--foreground)', minWidth: '48px' }}>{label}</span>
                  {desc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Fullscreen Viewer ───────────────────────────────────────────────────────
function FullscreenViewer({
  images,
  activeIndex,
  onClose,
  onNext,
  onPrev,
}: {
  images: { src: string; alt: string }[];
  activeIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onNext, onPrev]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.96)' }}>
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 transition-opacity hover:opacity-60"
        style={{ color: '#fff' }}
      >
        <Icon name="XMarkIcon" size={24} />
      </button>
      <button
        onClick={onPrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 p-3 transition-opacity hover:opacity-60"
        style={{ color: '#fff' }}
      >
        <Icon name="ChevronLeftIcon" size={28} />
      </button>
      <div className="relative w-full max-w-3xl h-[85vh] mx-16">
        <AppImage
          src={images[activeIndex].src}
          alt={images[activeIndex].alt}
          fill
          className="object-contain"
          sizes="90vw"
        />
      </div>
      <button
        onClick={onNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 p-3 transition-opacity hover:opacity-60"
        style={{ color: '#fff' }}
      >
        <Icon name="ChevronRightIcon" size={28} />
      </button>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full transition-all duration-200"
            style={{ background: i === activeIndex ? '#fff' : 'rgba(255,255,255,0.3)' }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Mini Product Card ───────────────────────────────────────────────────────
function MiniProductCard({ product }: { product: Product }) {
  const addToCart = useStore((s) => s.addToCart);
  const toggleWishlist = useStore((s) => s.toggleWishlist);
  const wishlist = useStore((s) => s.wishlist);
  const isWishlisted = wishlist.some((p) => p.id === product.id);
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link href={`/product-catalog/${product.id}`} className="group block">
      <div className="relative overflow-hidden mb-3" style={{ aspectRatio: '3/4', background: 'var(--muted)' }}>
        <AppImage
          src={product.image}
          alt={`${product.title} by ${product.brand}`}
          fill
          sizes="(max-width: 640px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
          className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ background: 'rgba(255,255,255,0.9)' }}
        >
          <Icon name="HeartIcon" size={12} variant={isWishlisted ? 'solid' : 'outline'} style={{ color: isWishlisted ? '#c0392b' : 'var(--muted-foreground)' } as React.CSSProperties} />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleAdd}
            className="w-full py-2.5 text-center tracking-editorial transition-all duration-200"
            style={{ background: added ? 'var(--success)' : 'var(--foreground)', color: 'var(--background)', fontSize: '0.55rem' }}
          >
            {added ? 'Added' : 'Add to Bag'}
          </button>
        </div>
      </div>
      <p className="tracking-editorial mb-0.5" style={{ color: 'var(--muted-foreground)', fontSize: '0.55rem' }}>{product.brand}</p>
      <p className="text-xs font-light line-clamp-1 mb-1" style={{ color: 'var(--foreground)' }}>{product.title}</p>
      <p className="price-tag text-xs" style={{ color: 'var(--foreground)' }}>${product.price}</p>
    </Link>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function ProductDetailClient({ product, related, recommended }: ProductDetailClientProps) {
  const addToCart = useStore((s) => s.addToCart);
  const toggleWishlist = useStore((s) => s.toggleWishlist);
  const wishlist = useStore((s) => s.wishlist);
  const isWishlisted = wishlist.some((p) => p.id === product.id);

  const images = getGalleryImages(product);

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] ?? '');
  const [selectedSize, setSelectedSize] = useState('');
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [wishlistAnimating, setWishlistAnimating] = useState(false);
  const [shareTooltip, setShareTooltip] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'shipping'>('description');
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null);

  // Touch swipe
  const touchStartX = useRef<number | null>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) setActiveImage((i) => (i + 1) % images.length);
      else setActiveImage((i) => (i - 1 + images.length) % images.length);
    }
    touchStartX.current = null;
  };

  // Mouse hover zoom
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setHoverPos({ x, y });
  }, []);
  const handleMouseLeave = useCallback(() => setHoverPos(null), []);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    setWishlistAnimating(true);
    setTimeout(() => setWishlistAnimating(false), 400);
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    setShareTooltip(true);
    setTimeout(() => setShareTooltip(false), 2000);
  };

  const nextImage = useCallback(() => setActiveImage((i) => (i + 1) % images.length), [images.length]);
  const prevImage = useCallback(() => setActiveImage((i) => (i - 1 + images.length) % images.length), [images.length]);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  // Recently viewed (mock — last 4 from related)
  const recentlyViewed = recommended.slice(0, 4);

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide" style={{ background: 'var(--background)' }}>
      {/* Breadcrumb */}
      <div className="px-6 lg:px-10 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <nav className="flex items-center gap-2 text-xs" style={{ color: 'var(--muted-foreground)' }}>
          <Link href="/product-catalog" className="tracking-editorial hover:opacity-70 transition-opacity" style={{ fontSize: '0.6rem' }}>Shop</Link>
          <span style={{ fontSize: '0.6rem' }}>/</span>
          <span className="tracking-editorial" style={{ fontSize: '0.6rem' }}>{product.category}</span>
          <span style={{ fontSize: '0.6rem' }}>/</span>
          <span className="tracking-editorial" style={{ color: 'var(--foreground)', fontSize: '0.6rem' }}>{product.title}</span>
        </nav>
      </div>

      {/* Main product section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* ── Left: Image Gallery ── */}
        <div className="relative">
          {/* Thumbnail strip (desktop) */}
          <div className="hidden lg:flex flex-col gap-2 absolute left-4 top-4 z-10" style={{ width: '64px' }}>
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className="relative overflow-hidden transition-all duration-200"
                style={{
                  aspectRatio: '3/4',
                  border: i === activeImage ? '1.5px solid var(--foreground)' : '1.5px solid transparent',
                  opacity: i === activeImage ? 1 : 0.55,
                }}
              >
                <AppImage src={img.src} alt={img.alt} fill className="object-cover" sizes="64px" />
              </button>
            ))}
          </div>

          {/* Main image */}
          <div
            ref={mainImageRef}
            className="relative overflow-hidden cursor-zoom-in select-none"
            style={{ aspectRatio: '3/4', background: 'var(--muted)', marginLeft: '0' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onClick={() => setFullscreenOpen(true)}
          >
            <AppImage
              src={images[activeImage].src}
              alt={images[activeImage].alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              style={
                hoverPos
                  ? {
                      transformOrigin: `${hoverPos.x}% ${hoverPos.y}%`,
                      transform: 'scale(1.8)',
                      transition: 'transform 0.1s ease',
                    }
                  : { transform: 'scale(1)', transition: 'transform 0.3s ease' }
              }
            />

            {/* Badges */}
            <div className="absolute top-4 right-4 flex flex-col gap-1.5 z-10">
              {product.badge && (
                <span className="px-3 py-1 tracking-editorial" style={{ background: 'var(--foreground)', color: 'var(--background)', fontSize: '0.55rem' }}>
                  {product.badge}
                </span>
              )}
              {discount && (
                <span className="px-3 py-1 tracking-editorial" style={{ background: 'rgba(192,57,43,0.9)', color: '#fff', fontSize: '0.55rem' }}>
                  -{discount}%
                </span>
              )}
            </div>

            {/* Fullscreen hint */}
            <div className="absolute bottom-4 right-4 opacity-0 hover:opacity-100 transition-opacity">
              <div className="p-2" style={{ background: 'rgba(255,255,255,0.9)' }}>
                <Icon name="ArrowsPointingOutIcon" size={14} style={{ color: 'var(--foreground)' } as React.CSSProperties} />
              </div>
            </div>

            {/* Nav arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center transition-opacity hover:opacity-70"
              style={{ background: 'rgba(255,255,255,0.9)' }}
            >
              <Icon name="ChevronLeftIcon" size={16} style={{ color: 'var(--foreground)' } as React.CSSProperties} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center transition-opacity hover:opacity-70"
              style={{ background: 'rgba(255,255,255,0.9)' }}
            >
              <Icon name="ChevronRightIcon" size={16} style={{ color: 'var(--foreground)' } as React.CSSProperties} />
            </button>
          </div>

          {/* Mobile thumbnail dots */}
          <div className="flex justify-center gap-1.5 py-4 lg:hidden">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className="w-1.5 h-1.5 rounded-full transition-all duration-200"
                style={{ background: i === activeImage ? 'var(--foreground)' : 'var(--border)' }}
              />
            ))}
          </div>

          {/* Mobile thumbnail strip */}
          <div className="flex gap-2 px-6 pb-4 lg:hidden overflow-x-auto scrollbar-hide">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className="relative flex-shrink-0 overflow-hidden"
                style={{
                  width: '64px',
                  aspectRatio: '3/4',
                  border: i === activeImage ? '1.5px solid var(--foreground)' : '1.5px solid var(--border)',
                  opacity: i === activeImage ? 1 : 0.6,
                }}
              >
                <AppImage src={img.src} alt={img.alt} fill className="object-cover" sizes="64px" />
              </button>
            ))}
          </div>
        </div>

        {/* ── Right: Product Info ── */}
        <div className="px-6 lg:px-12 py-8 lg:py-12 flex flex-col gap-6">
          {/* Brand + Title */}
          <div>
            <p className="tracking-editorial mb-2" style={{ color: 'var(--muted-foreground)', fontSize: '0.6rem' }}>{product.brand} · {product.sku}</p>
            <h1 className="font-display text-3xl lg:text-4xl font-light mb-4" style={{ color: 'var(--foreground)', lineHeight: 1.15 }}>
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} width="12" height="12" viewBox="0 0 12 12" fill={s <= Math.floor(product.rating) ? 'var(--foreground)' : 'none'} stroke="var(--foreground)" strokeWidth="1">
                    <polygon points="6,1 7.5,4.5 11,5 8.5,7.5 9,11 6,9.5 3,11 3.5,7.5 1,5 4.5,4.5" />
                  </svg>
                ))}
              </div>
              <span className="font-mono-nums" style={{ color: 'var(--muted-foreground)', fontSize: '0.7rem' }}>
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="price-tag text-2xl font-medium" style={{ color: 'var(--foreground)' }}>${product.price}</span>
              {product.originalPrice && (
                <span className="price-tag text-base line-through" style={{ color: 'var(--muted-foreground)' }}>${product.originalPrice}</span>
              )}
              {discount && (
                <span className="tracking-editorial px-2 py-0.5" style={{ background: 'rgba(192,57,43,0.1)', color: 'var(--danger)', fontSize: '0.55rem' }}>
                  Save {discount}%
                </span>
              )}
            </div>
          </div>

          {/* Colour Selector */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="tracking-editorial" style={{ color: 'var(--foreground)', fontSize: '0.6rem' }}>
                COLOUR — <span style={{ color: 'var(--muted-foreground)' }}>{selectedColor}</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className="px-4 py-2 text-xs font-light transition-all duration-200"
                  style={{
                    border: selectedColor === color ? '1.5px solid var(--foreground)' : '1px solid var(--border)',
                    color: selectedColor === color ? 'var(--foreground)' : 'var(--muted-foreground)',
                    background: 'transparent',
                    fontSize: '0.7rem',
                  }}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="tracking-editorial" style={{ color: 'var(--foreground)', fontSize: '0.6rem' }}>
                SIZE {selectedSize && <span style={{ color: 'var(--muted-foreground)' }}>— {selectedSize}</span>}
              </p>
              <button
                onClick={() => setSizeGuideOpen(true)}
                className="tracking-editorial hover:opacity-60 transition-opacity underline underline-offset-2"
                style={{ color: 'var(--muted-foreground)', fontSize: '0.6rem' }}
              >
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className="w-12 h-12 text-xs font-light transition-all duration-200 flex items-center justify-center"
                  style={{
                    border: selectedSize === size ? '1.5px solid var(--foreground)' : '1px solid var(--border)',
                    color: selectedSize === size ? 'var(--foreground)' : 'var(--muted-foreground)',
                    background: selectedSize === size ? 'var(--foreground)' : 'transparent',
                    ...(selectedSize === size ? { color: 'var(--background)' } : {}),
                    fontSize: '0.7rem',
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
            {!selectedSize && (
              <p className="mt-2 text-xs" style={{ color: 'var(--muted-foreground)', fontSize: '0.65rem' }}>Please select a size to continue</p>
            )}
          </div>

          {/* Model Info */}
          <div className="py-4 px-5" style={{ background: 'var(--muted)', borderLeft: '2px solid var(--border)' }}>
            <p className="tracking-editorial mb-3" style={{ color: 'var(--muted-foreground)', fontSize: '0.6rem' }}>MODEL INFORMATION</p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Height', value: '178 cm' },
                { label: 'Size Worn', value: 'S' },
                { label: 'Fit', value: 'True to size' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="tracking-editorial mb-1" style={{ color: 'var(--muted-foreground)', fontSize: '0.55rem' }}>{label}</p>
                  <p className="text-xs font-light" style={{ color: 'var(--foreground)' }}>{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className="w-full py-4 tracking-editorial transition-all duration-200 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: addedToCart ? 'var(--success)' : 'var(--foreground)',
                color: 'var(--background)',
                fontSize: '0.65rem',
              }}
            >
              {addedToCart ? '✓ Added to Bag' : selectedSize ? 'Add to Bag' : 'Select a Size'}
            </button>

            <div className="flex gap-3">
              <button
                onClick={handleWishlist}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 border tracking-editorial transition-all duration-200 ${wishlistAnimating ? 'scale-95' : ''}`}
                style={{
                  borderColor: isWishlisted ? 'var(--foreground)' : 'var(--border)',
                  color: isWishlisted ? 'var(--foreground)' : 'var(--muted-foreground)',
                  background: 'transparent',
                  fontSize: '0.6rem',
                }}
              >
                <Icon name="HeartIcon" size={14} variant={isWishlisted ? 'solid' : 'outline'} style={{ color: isWishlisted ? '#c0392b' : 'var(--muted-foreground)' } as React.CSSProperties} />
                {isWishlisted ? 'Saved' : 'Wishlist'}
              </button>

              <div className="relative">
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 border tracking-editorial transition-all duration-200 hover:border-foreground"
                  style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)', background: 'transparent', fontSize: '0.6rem' }}
                >
                  <Icon name="ShareIcon" size={14} />
                  Share
                </button>
                {shareTooltip && (
                  <div
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-xs whitespace-nowrap fade-in"
                    style={{ background: 'var(--foreground)', color: 'var(--background)', fontSize: '0.6rem' }}
                  >
                    Link copied!
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stock indicator */}
          {product.stockQuantity < 10 && product.inStock && (
            <p className="tracking-editorial" style={{ color: 'var(--danger)', fontSize: '0.6rem' }}>
              Only {product.stockQuantity} left in stock
            </p>
          )}

          {/* Tabs: Description / Details / Shipping */}
          <div className="border-t pt-6" style={{ borderColor: 'var(--border)' }}>
            <div className="flex gap-0 border-b mb-6" style={{ borderColor: 'var(--border)' }}>
              {(['description', 'details', 'shipping'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-0 mr-8 pb-3 tracking-editorial transition-all duration-200"
                  style={{
                    color: activeTab === tab ? 'var(--foreground)' : 'var(--muted-foreground)',
                    borderBottom: activeTab === tab ? '1.5px solid var(--foreground)' : '1.5px solid transparent',
                    fontSize: '0.6rem',
                    marginBottom: '-1px',
                  }}
                >
                  {tab === 'description' ? 'Description' : tab === 'details' ? 'Details & Care' : 'Shipping & Returns'}
                </button>
              ))}
            </div>

            {activeTab === 'description' && (
              <div className="space-y-4 fade-in">
                <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--foreground)', lineHeight: 1.8 }}>
                  {product.description}
                </p>
                <div className="pt-2">
                  <p className="tracking-editorial mb-3" style={{ color: 'var(--muted-foreground)', fontSize: '0.6rem' }}>PRODUCT TAGS</p>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 tracking-editorial" style={{ background: 'var(--muted)', color: 'var(--muted-foreground)', fontSize: '0.55rem' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="space-y-5 fade-in">
                {[
                  { label: 'Material Composition', value: '72% Viscose, 20% Polyamide, 8% Elastane' },
                  { label: 'Fabric Feel', value: 'Fluid, lightweight with a subtle sheen. Drapes beautifully against the body.' },
                  { label: 'Country of Manufacture', value: 'Made in Portugal' },
                  { label: 'Washing Instructions', value: 'Hand wash cold or dry clean only. Do not tumble dry. Iron on low heat.' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-6">
                    <p className="tracking-editorial flex-shrink-0" style={{ color: 'var(--muted-foreground)', fontSize: '0.6rem', minWidth: '140px' }}>{label}</p>
                    <p className="text-xs font-light" style={{ color: 'var(--foreground)', lineHeight: 1.7 }}>{value}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-5 fade-in">
                {[
                  { icon: 'TruckIcon', label: 'Standard Delivery', value: '3–5 business days · Free on orders over $150' },
                  { icon: 'BoltIcon', label: 'Express Delivery', value: '1–2 business days · $15' },
                  { icon: 'ArrowPathIcon', label: 'Returns', value: 'Free returns within 30 days. Items must be unworn, unwashed, and in original packaging with all tags attached.' },
                  { icon: 'ShieldCheckIcon', label: 'Quality Guarantee', value: 'All ÉLAN pieces are quality-checked before dispatch. If you receive a faulty item, contact us within 7 days for a full refund.' },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex gap-4">
                    <div className="flex-shrink-0 mt-0.5">
                      <Icon name={icon as Parameters<typeof Icon>[0]['name']} size={16} style={{ color: 'var(--muted-foreground)' } as React.CSSProperties} />
                    </div>
                    <div>
                      <p className="tracking-editorial mb-1" style={{ color: 'var(--foreground)', fontSize: '0.6rem' }}>{label}</p>
                      <p className="text-xs font-light" style={{ color: 'var(--muted-foreground)', lineHeight: 1.7 }}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Complete the Look ── */}
      {related.length > 0 && (
        <section className="px-6 lg:px-10 py-16 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="tracking-editorial mb-2" style={{ color: 'var(--muted-foreground)', fontSize: '0.6rem' }}>ÉLAN STYLING</p>
              <h2 className="font-display text-3xl font-light italic" style={{ color: 'var(--foreground)' }}>Complete the Look</h2>
            </div>
            <Link href="/product-catalog" className="tracking-editorial hover:opacity-60 transition-opacity" style={{ color: 'var(--muted-foreground)', fontSize: '0.6rem' }}>
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {related.map((p) => <MiniProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* ── Recommended ── */}
      {recommended.length > 0 && (
        <section className="px-6 lg:px-10 py-16 border-t" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="tracking-editorial mb-2" style={{ color: 'var(--muted-foreground)', fontSize: '0.6rem' }}>YOU MAY ALSO LIKE</p>
              <h2 className="font-display text-3xl font-light italic" style={{ color: 'var(--foreground)' }}>Recommended for You</h2>
            </div>
            <Link href="/product-catalog" className="tracking-editorial hover:opacity-60 transition-opacity" style={{ color: 'var(--muted-foreground)', fontSize: '0.6rem' }}>
              Explore →
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {recommended.map((p) => <MiniProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* ── Recently Viewed ── */}
      {recentlyViewed.length > 0 && (
        <section className="px-6 lg:px-10 py-16 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="tracking-editorial mb-2" style={{ color: 'var(--muted-foreground)', fontSize: '0.6rem' }}>YOUR HISTORY</p>
              <h2 className="font-display text-3xl font-light italic" style={{ color: 'var(--foreground)' }}>Recently Viewed</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {recentlyViewed.map((p) => <MiniProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* ── Sticky Add to Cart (mobile) ── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 lg:hidden px-4 py-4 border-t"
        style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
      >
        <div className="flex gap-3 items-center">
          <div className="flex-1">
            <p className="text-xs font-light line-clamp-1 mb-0.5" style={{ color: 'var(--foreground)' }}>{product.title}</p>
            <p className="price-tag text-sm font-medium" style={{ color: 'var(--foreground)' }}>${product.price}</p>
          </div>
          <button
            onClick={handleWishlist}
            className="w-12 h-12 flex items-center justify-center border transition-all duration-200"
            style={{ borderColor: 'var(--border)', background: 'transparent' }}
          >
            <Icon name="HeartIcon" size={16} variant={isWishlisted ? 'solid' : 'outline'} style={{ color: isWishlisted ? '#c0392b' : 'var(--muted-foreground)' } as React.CSSProperties} />
          </button>
          <button
            onClick={handleAddToCart}
            disabled={!selectedSize}
            className="flex-1 py-3.5 tracking-editorial transition-all duration-200 disabled:opacity-40"
            style={{
              background: addedToCart ? 'var(--success)' : 'var(--foreground)',
              color: 'var(--background)',
              fontSize: '0.6rem',
            }}
          >
            {addedToCart ? '✓ Added' : 'Add to Bag'}
          </button>
        </div>
      </div>

      {/* Modals */}
      {sizeGuideOpen && <SizeGuideModal onClose={() => setSizeGuideOpen(false)} />}
      {fullscreenOpen && (
        <FullscreenViewer
          images={images}
          activeIndex={activeImage}
          onClose={() => setFullscreenOpen(false)}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </div>
  );
}
