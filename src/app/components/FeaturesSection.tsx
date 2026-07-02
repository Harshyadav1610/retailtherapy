'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

const FEATURES = [
  {
    id: 'feat-guilt-free',
    icon: 'FaceSmileIcon',
    title: 'Shop Completely Guilt-Free',
    description:
      'Browse thousands of products, fill your cart, and complete checkout — all without spending a single cent. The dopamine hit, minus the regret.',
    color: 'accent',
    stat: '94%',
    statLabel: 'report less buyer\'s remorse',
  },
  {
    id: 'feat-zero-spending',
    icon: 'BanknotesIcon',
    title: 'Zero Real Spending',
    description:
      'Your payment information is never collected. Nothing is ever charged. This is a simulation built for your wellbeing, not your credit card.',
    color: 'success',
    stat: '$0',
    statLabel: 'ever charged',
  },
  {
    id: 'feat-save-money',
    icon: 'ArrowTrendingUpIcon',
    title: 'Track Your Real Savings',
    description:
      'Every "purchase" you make is logged as money saved. Watch your savings counter grow with every checkout — real financial progress.',
    color: 'primary',
    stat: '$18K',
    statLabel: 'avg saved per year',
  },
  {
    id: 'feat-impulse',
    icon: 'ShieldCheckIcon',
    title: 'Defeat Impulse Purchases',
    description:
      'Research shows the act of adding to cart satisfies 80% of the shopping urge. By the time you "checkout," the impulse has passed.',
    color: 'warning',
    stat: '80%',
    statLabel: 'urge satisfied by browsing',
  },
  {
    id: 'feat-streak',
    icon: 'FireIcon',
    title: 'Build No-Spend Streaks',
    description:
      'Maintain your daily no-spend streak. Gamified progress keeps you motivated. Celebrate milestones with your community.',
    color: 'accent',
    stat: '21 days',
    statLabel: 'avg streak length',
  },
];

const colorMap: Record<string, string> = {
  accent: 'var(--accent)',
  success: 'var(--success)',
  primary: 'var(--primary)',
  warning: 'var(--warning)',
};

const bgMap: Record<string, string> = {
  accent: 'rgba(232, 168, 124, 0.1)',
  success: 'rgba(34, 197, 94, 0.1)',
  primary: 'rgba(26, 26, 46, 0.06)',
  warning: 'rgba(245, 158, 11, 0.1)',
};

export default function FeaturesSection() {
  return (
    <section id="features" style={{ padding: '100px 0', background: 'var(--background)' }}>
      <div className="max-w-screen-xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="badge badge-accent mb-4 inline-flex">
            <Icon name="SparklesIcon" size={12} />
            Why It Works
          </span>
          <h2 className="text-hero-md font-extrabold" style={{ color: 'var(--foreground)' }}>
            The science behind{' '}
            <span style={{ color: 'var(--accent)' }}>guilt-free shopping</span>
          </h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto" style={{ color: 'var(--muted-foreground)' }}>
            RetailTherapy is built on behavioral psychology. Satisfy the shopping urge without the financial consequences.
          </p>
        </div>

        {/* Feature grid: 3+2 layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {FEATURES.slice(0, 3).map((feature) => (
            <div
              key={feature.id}
              className="card-base card-hover group"
              style={{ borderColor: 'var(--border)' }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: bgMap[feature.color] }}
              >
                <Icon
                  name={feature.icon as Parameters<typeof Icon>[0]['name']}
                  size={24}
                  style={{ color: colorMap[feature.color] } as React.CSSProperties}
                />
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--foreground)' }}>
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--muted-foreground)' }}>
                {feature.description}
              </p>
              <div
                className="flex items-baseline gap-2 pt-4 border-t"
                style={{ borderColor: 'var(--border)' }}
              >
                <span className="text-2xl font-extrabold font-mono-nums" style={{ color: colorMap[feature.color] }}>
                  {feature.stat}
                </span>
                <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                  {feature.statLabel}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURES.slice(3).map((feature) => (
            <div
              key={feature.id}
              className="card-base card-hover"
              style={{ borderColor: 'var(--border)' }}
            >
              <div className="flex items-start gap-5">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: bgMap[feature.color] }}
                >
                  <Icon
                    name={feature.icon as Parameters<typeof Icon>[0]['name']}
                    size={24}
                    style={{ color: colorMap[feature.color] } as React.CSSProperties}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--foreground)' }}>
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                    {feature.description}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-extrabold font-mono-nums" style={{ color: colorMap[feature.color] }}>
                    {feature.stat}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                    {feature.statLabel}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}