'use client';

import React from 'react';
import Link from 'next/link';

const STEPS = [
  {
    id: 'step-1',
    number: '01',
    title: 'Discover',
    description: 'Browse our curated collections. Filter by category, occasion, or aesthetic.',
  },
  {
    id: 'step-2',
    number: '02',
    title: 'Select',
    description: 'Choose your size and colour. Add to your wishlist or cart with a single click.',
  },
  {
    id: 'step-3',
    number: '03',
    title: 'Checkout',
    description: 'Secure, seamless checkout. Free shipping on orders over $150.',
  },
  {
    id: 'step-4',
    number: '04',
    title: 'Wear',
    description: 'Receive beautifully packaged pieces, ready to wear from day one.',
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      style={{ padding: '100px 0', background: 'var(--secondary)' }}
    >
      <div className="max-w-screen-xl mx-auto px-8 md:px-16">
        <div className="mb-16">
          <p className="tracking-editorial mb-4" style={{ color: 'var(--muted-foreground)', fontSize: '0.65rem' }}>
            The Process
          </p>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 3.5rem)', fontWeight: 300, color: 'var(--foreground)' }}
          >
            How it <em>works</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-0 border-t" style={{ borderColor: 'var(--border)' }}>
          {STEPS?.map((step, index) => (
            <div
              key={step?.id}
              className="py-10 pr-8 border-b md:border-b-0 md:border-r last:border-r-0"
              style={{ borderColor: 'var(--border)' }}
            >
              <span
                className="font-mono-nums block mb-6"
                style={{ color: 'var(--muted-foreground)', fontSize: '0.65rem' }}
              >
                {step?.number}
              </span>
              <h3
                className="font-display mb-3"
                style={{ fontSize: '1.75rem', fontWeight: 300, color: 'var(--foreground)', fontStyle: 'italic' }}
              >
                {step?.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)', fontWeight: 300 }}>
                {step?.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/product-catalog" className="btn-primary">
            Start Shopping
          </Link>
        </div>
      </div>
    </section>
  );
}