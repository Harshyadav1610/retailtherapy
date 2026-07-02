'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const EDITORIAL_IMAGES = [
  {
    id: 'hero-1',
    label: 'New Collection',
    desc: 'SS 2026',
    bg: '#e8e5e0',
  },
  {
    id: 'hero-2',
    label: 'Essentials',
    desc: 'Timeless Pieces',
    bg: '#d4d0ca',
  },
];

const CATEGORIES = [
  { id: 'cat-women', label: "Women\'s", sub: 'Dresses · Tops · Coats', href: '/product-catalog' },
  { id: 'cat-men', label: "Men\'s", sub: 'Shirts · Jackets · Trousers', href: '/product-catalog' },
  { id: 'cat-new', label: 'New Arrivals', sub: 'Just Landed', href: '/product-catalog' },
  { id: 'cat-sale', label: 'Sale', sub: 'Up to 50% Off', href: '/product-catalog' },
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setActiveImg((prev) => (prev + 1) % EDITORIAL_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="gradient-hero relative overflow-hidden"
      style={{ paddingTop: '72px', minHeight: '100vh' }}
    >
      {/* Full-bleed editorial hero */}
      <div className="relative w-full" style={{ height: 'calc(100vh - 72px)' }}>
        {/* Editorial image placeholder */}
        <div
          className="absolute inset-0 transition-all duration-1000"
          style={{ background: mounted ? EDITORIAL_IMAGES[activeImg].bg : EDITORIAL_IMAGES[0].bg }}
        >
          {/* Subtle texture overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(0,0,0,0.04) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(0,0,0,0.03) 0%, transparent 60%)',
            }}
          />
          {/* Editorial grid lines */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />
        </div>

        {/* Hero content overlay */}
        <div className="absolute inset-0 flex flex-col justify-end pb-16 px-8 md:px-16 lg:px-24">
          <div className="max-w-screen-xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-8 items-end">
              {/* Left: Main headline */}
              <div className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <p className="tracking-editorial mb-4" style={{ color: 'var(--muted-foreground)', fontSize: '0.65rem' }}>
                  {EDITORIAL_IMAGES[activeImg].desc}
                </p>
                <h1 className="text-hero-xl mb-6" style={{ color: 'var(--foreground)' }}>
                  {EDITORIAL_IMAGES[activeImg].label === 'New Collection' ? (
                    <>
                      The New<br />
                      <em>Collection</em>
                    </>
                  ) : (
                    <>
                      Timeless<br />
                      <em>Essentials</em>
                    </>
                  )}
                </h1>
                <div className="flex items-center gap-4">
                  <Link href="/product-catalog" className="btn-primary">
                    Explore Now
                  </Link>
                  <Link href="/product-catalog" className="btn-outline">
                    View All
                  </Link>
                </div>
              </div>

              {/* Right: Slide indicators */}
              <div className="flex justify-end items-end gap-2">
                {EDITORIAL_IMAGES.map((_, i) => (
                  <button
                    key={`hero-dot-${i}`}
                    onClick={() => setActiveImg(i)}
                    className="transition-all duration-300"
                    style={{
                      width: i === activeImg ? '32px' : '8px',
                      height: '2px',
                      background: i === activeImg ? 'var(--foreground)' : 'rgba(0,0,0,0.25)',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category strip */}
      <div
        className="border-t border-b"
        style={{ borderColor: 'var(--border)', background: 'var(--background)' }}
      >
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x" style={{ borderColor: 'var(--border)' }}>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={cat.href}
                className="group px-8 py-8 flex flex-col gap-1 transition-all duration-300 hover:bg-muted"
              >
                <span
                  className="font-display text-2xl transition-all duration-300"
                  style={{ color: 'var(--foreground)', fontStyle: 'italic', fontWeight: 300 }}
                >
                  {cat.label}
                </span>
                <span className="tracking-editorial" style={{ color: 'var(--muted-foreground)', fontSize: '0.6rem' }}>
                  {cat.sub}
                </span>
                <Icon
                  name="ArrowRightIcon"
                  size={14}
                  className="mt-2 transition-transform duration-300 group-hover:translate-x-1"
                  style={{ color: 'var(--muted-foreground)' } as React.CSSProperties}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Editorial feature section */}
      <div className="max-w-screen-xl mx-auto px-8 md:px-16 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <p className="tracking-editorial mb-6" style={{ color: 'var(--muted-foreground)', fontSize: '0.65rem' }}>
              Our Philosophy
            </p>
            <h2 className="font-display mb-8" style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 300, lineHeight: 1.1, color: 'var(--foreground)' }}>
              Crafted for the<br />
              <em>modern wardrobe</em>
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--muted-foreground)', maxWidth: '420px', fontWeight: 300 }}>
              ÉLAN is built on the belief that great style is effortless. Each piece is selected for its quality, versatility, and enduring appeal — fashion that transcends seasons.
            </p>
            <Link href="/product-catalog" className="btn-outline">
              Discover the Collection
            </Link>
          </div>

          {/* Right: Editorial image placeholder grid */}
          <div className="grid grid-cols-2 gap-4">
            <div
              className="aspect-[3/4] rounded-sm"
              style={{ background: '#e8e5e0' }}
            >
              <div className="w-full h-full flex items-end p-4">
                <p className="tracking-editorial" style={{ color: 'var(--muted-foreground)', fontSize: '0.6rem' }}>
                  Women's Collection
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div
                className="aspect-square rounded-sm"
                style={{ background: '#d4d0ca' }}
              >
                <div className="w-full h-full flex items-end p-4">
                  <p className="tracking-editorial" style={{ color: 'var(--muted-foreground)', fontSize: '0.6rem' }}>
                    Men's Edit
                  </p>
                </div>
              </div>
              <div
                className="aspect-square rounded-sm"
                style={{ background: '#c8c4be' }}
              >
                <div className="w-full h-full flex items-end p-4">
                  <p className="tracking-editorial" style={{ color: 'var(--muted-foreground)', fontSize: '0.6rem' }}>
                    Accessories
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand values strip */}
      <div
        className="border-t py-12"
        style={{ borderColor: 'var(--border)', background: 'var(--secondary)' }}
      >
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Free Shipping', sub: 'On orders over $150' },
              { label: 'Easy Returns', sub: '30-day return policy' },
              { label: 'Sustainably Made', sub: 'Ethical production' },
              { label: 'Premium Quality', sub: 'Curated materials' },
            ].map((item) => (
              <div key={`value-${item.label}`} className="flex flex-col gap-2">
                <p className="font-display text-lg" style={{ color: 'var(--foreground)', fontStyle: 'italic', fontWeight: 300 }}>
                  {item.label}
                </p>
                <p className="tracking-editorial" style={{ color: 'var(--muted-foreground)', fontSize: '0.6rem' }}>
                  {item.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}