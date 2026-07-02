'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Icon from '@/components/ui/AppIcon';

const WeeklySavingsChartInner = dynamic(
  () => import('./WeeklySavingsChartInner'),
  { ssr: false, loading: () => <div className="h-[280px] skeleton rounded-xl" /> }
);

export default function WeeklySavingsChart() {
  return (
    <div className="card-base" style={{ background: 'var(--card)' }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-base" style={{ color: 'var(--foreground)' }}>Weekly Savings</h3>
          <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
            Money not spent per day — last 7 days
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
            style={{ background: 'rgba(34,197,94,0.1)' }}
          >
            <Icon name="ArrowTrendingUpIcon" size={14} style={{ color: 'var(--success)' } as React.CSSProperties} />
            <span className="text-xs font-semibold" style={{ color: 'var(--success)' }}>+23% this week</span>
          </div>
        </div>
      </div>
      <WeeklySavingsChartInner />
    </div>
  );
}