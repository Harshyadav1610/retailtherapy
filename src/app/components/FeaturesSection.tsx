'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

const COLLECTIONS = [
  {
    id: 'col-1',
    title: 'The Minimal Edit',
    desc: 'Clean lines, neutral tones, enduring style.',
    bg: '#e8e5e0',
    count: '42 pieces',
  },
  {
    id: 'col-2',
    title: 'Après Work',
    desc: 'Effortless transitions from desk to dinner.',
    bg: '#d4d0ca',
    count: '38 pieces',
  },
  {
    id: 'col-3',
    title: 'Weekend Luxe',
    desc: 'Elevated comfort for unhurried days.',
    bg: '#c8c4be',
    count: '55 pieces',
  },
];

const FEATURES = [
  {
    id: 'feat-1',
    number: '01',
    title: 'Curated Selection',
    description: 'Every piece is selected for quality, versatility, and timeless appeal. No fast fashion, no compromise.',
  },
  {
    id: 'feat-2',
    number: '02',
    title: 'Premium Materials',
    description: 'From organic cotton to Italian wool — we source only the finest fabrics from responsible suppliers.',
  },
  {
    id: 'feat-3',
    number: '03',
    title: 'Considered Design',
    description: 'Minimal silhouettes that work across seasons. Pieces that earn their place in your wardrobe for years.',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" style={{ background: 'var(--background)' }}>
      {/* Collections grid */}
      <div className="max-w-screen-xl mx-auto px-8 md:px-16 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="tracking-editorial mb-3" style={{ color: 'var(--muted-foreground)', fontSize: '0.65rem' }}>
              Curated for You
            </p>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 3.5vw, 3.5rem)', fontWeight: 300, color: 'var(--foreground)' }}>
              Featured <em>Collections</em>
            </h2>
          </div>
          <Link href="/product-catalog" className="hidden md:flex items-center gap-2 tracking-editorial transition-colors duration-200 hover:opacity-60" style={{ color: 'var(--muted-foreground)', fontSize: '0.65rem' }}>
            View All
            <Icon name="ArrowRightIcon" size={12} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COLLECTIONS?.map((col) => (
            <Link
              key={col?.id}
              href="/product-catalog"
              className="group block"
            >
              <div
                className="aspect-[3/4] mb-4 overflow-hidden rounded-sm relative"
                style={{ background: col?.bg }}
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="tracking-editorial" style={{ color: 'rgba(0,0,0,0.5)', fontSize: '0.6rem' }}>
                    {col?.count}
                  </p>
                </div>
              </div>
              <div>
                <h3
                  className="font-display mb-1 transition-all duration-200"
                  style={{ fontSize: '1.25rem', fontWeight: 300, color: 'var(--foreground)', fontStyle: 'italic' }}
                >
                  {col?.title}
                </h3>
                <p className="text-xs" style={{ color: 'var(--muted-foreground)', fontWeight: 300 }}>
                  {col?.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* Brand pillars */}
      <div
        className="border-t border-b py-24"
        style={{ borderColor: 'var(--border)', background: 'var(--secondary)' }}
      >
        <div className="max-w-screen-xl mx-auto px-8 md:px-16">
          <div className="grid lg:grid-cols-3 gap-12">
            {FEATURES?.map((feature, i) => (
              <div key={feature?.id} className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <span
                    className="font-mono-nums"
                    style={{ color: 'var(--muted-foreground)', fontSize: '0.65rem' }}
                  >
                    {feature?.number}
                  </span>
                  <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
                </div>
                <h3
                  className="font-display"
                  style={{ fontSize: '1.5rem', fontWeight: 300, color: 'var(--foreground)', fontStyle: 'italic' }}
                >
                  {feature?.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)', fontWeight: 300 }}>
                  {feature?.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}