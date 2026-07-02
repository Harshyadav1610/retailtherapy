'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

const STEPS = [
  {
    id: 'step-1',
    number: '01',
    icon: 'UserPlusIcon',
    title: 'Create Your Free Account',
    description: 'Sign up in seconds. No credit card required, ever. Just your email and a password.',
    color: 'var(--accent)',
  },
  {
    id: 'step-2',
    number: '02',
    icon: 'MagnifyingGlassIcon',
    title: 'Browse & Discover Products',
    description: 'Explore 60+ products across 10 categories. Search, filter, and find exactly what catches your eye.',
    color: 'var(--primary)',
  },
  {
    id: 'step-3',
    number: '03',
    icon: 'ShoppingCartIcon',
    title: 'Add to Cart & Checkout',
    description: 'Fill your cart, apply fake coupons, enter a fake address. Experience the full checkout flow.',
    color: 'var(--accent)',
  },
  {
    id: 'step-4',
    number: '04',
    icon: 'SparklesIcon',
    title: 'Feel the Joy — Save the Money',
    description: 'Confetti, order confirmation, tracking ID. The full satisfaction — and your real bank account stays full.',
    color: 'var(--success)',
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      style={{ padding: '100px 0', background: 'var(--secondary)' }}
    >
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="badge badge-muted mb-4 inline-flex">
            <Icon name="MapIcon" size={12} />
            The Process
          </span>
          <h2 className="text-hero-md font-extrabold" style={{ color: 'var(--foreground)' }}>
            How RetailTherapy{' '}
            <span style={{ color: 'var(--accent)' }}>works</span>
          </h2>
          <p className="mt-4 text-lg max-w-xl mx-auto" style={{ color: 'var(--muted-foreground)' }}>
            Four simple steps to a shopping experience that leaves your wallet intact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {STEPS.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Connector line */}
              {index < STEPS.length - 1 && (
                <div
                  className="hidden xl:block absolute top-8 left-full w-full h-px z-0"
                  style={{
                    background: `linear-gradient(to right, ${step.color}, transparent)`,
                    width: 'calc(100% - 32px)',
                    left: '50%',
                    opacity: 0.3,
                  }}
                />
              )}

              <div
                className="card-base card-hover text-center relative z-10"
                style={{ background: 'var(--card)' }}
              >
                <div
                  className="text-xs font-bold tracking-widest mb-4"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {step.number}
                </div>
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  style={{ background: `${step.color}18` }}
                >
                  <Icon
                    name={step.icon as Parameters<typeof Icon>[0]['name']}
                    size={28}
                    style={{ color: step.color } as React.CSSProperties}
                  />
                </div>
                <h3 className="font-bold text-base mb-3" style={{ color: 'var(--foreground)' }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}