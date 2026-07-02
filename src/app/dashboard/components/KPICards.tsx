'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';
import { useStore } from '@/lib/store';

export default function KPICards() {
  const orders = useStore((s) => s.orders);
  const wishlist = useStore((s) => s.wishlist);
  const streak = useStore((s) => s.streak);
  const totalSaved = useStore((s) => s.totalSaved);

  const thisMonthSaved = Math.round(totalSaved * 0.12);

  const cards = [
    {
      id: 'kpi-streak',
      label: 'No-Spend Streak',
      value: `${streak}`,
      unit: 'days',
      icon: 'FireIcon',
      trend: '+3 vs last week',
      trendUp: true,
      color: 'var(--accent)',
      bg: 'rgba(232, 168, 124, 0.08)',
      alert: false,
    },
    {
      id: 'kpi-orders',
      label: 'Fake Orders Placed',
      value: `${orders.length + 47}`,
      unit: 'total',
      icon: 'ShoppingBagIcon',
      trend: `${orders.length} this session`,
      trendUp: true,
      color: 'var(--primary)',
      bg: 'rgba(26, 26, 46, 0.05)',
      alert: false,
    },
    {
      id: 'kpi-wishlist',
      label: 'Wishlist Items',
      value: `${wishlist.length + 23}`,
      unit: 'saved',
      icon: 'HeartIcon',
      trend: '5 added this week',
      trendUp: true,
      color: '#e85d75',
      bg: 'rgba(232, 93, 117, 0.08)',
      alert: false,
    },
    {
      id: 'kpi-month',
      label: 'Saved This Month',
      value: `$${thisMonthSaved.toLocaleString()}`,
      unit: 'Jul 2026',
      icon: 'CalendarDaysIcon',
      trend: '+18% vs June',
      trendUp: true,
      color: 'var(--success)',
      bg: 'rgba(34, 197, 94, 0.08)',
      alert: false,
    },
  ];

  return (
    <>
      {cards.map((card) => (
        <div
          key={card.id}
          className="card-base card-hover flex flex-col justify-between"
          style={{ background: 'var(--card)', minHeight: '130px' }}
        >
          <div className="flex items-start justify-between mb-3">
            <p className="text-xs font-medium tracking-wide" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.02em' }}>
              {card.label}
            </p>
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: card.bg }}
            >
              <Icon
                name={card.icon as Parameters<typeof Icon>[0]['name']}
                size={16}
                style={{ color: card.color } as React.CSSProperties}
              />
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-1.5 mb-1">
              <span className="text-2xl font-extrabold font-mono-nums" style={{ color: 'var(--foreground)' }}>
                {card.value}
              </span>
              <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                {card.unit}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Icon
                name={card.trendUp ? 'ArrowTrendingUpIcon' : 'ArrowTrendingDownIcon'}
                size={12}
                style={{ color: card.trendUp ? 'var(--success)' : 'var(--danger)' } as React.CSSProperties}
              />
              <span className="text-xs" style={{ color: card.trendUp ? 'var(--success)' : 'var(--danger)' }}>
                {card.trend}
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}