'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const WEEKLY_DATA = [
  { day: 'Mon', saved: 142, orders: 2 },
  { day: 'Tue', saved: 89, orders: 1 },
  { day: 'Wed', saved: 312, orders: 4 },
  { day: 'Thu', saved: 67, orders: 1 },
  { day: 'Fri', saved: 489, orders: 5 },
  { day: 'Sat', saved: 234, orders: 3 },
  { day: 'Sun', saved: 178, orders: 2 },
];

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: { orders: number } }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-xl px-4 py-3 shadow-card-hover"
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
        minWidth: '140px',
      }}
    >
      <p className="text-xs font-semibold mb-2" style={{ color: 'var(--muted-foreground)' }}>{label}</p>
      <p className="text-base font-extrabold font-mono-nums" style={{ color: 'var(--accent)' }}>
        ${payload[0].value.toLocaleString()} saved
      </p>
      <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>
        {payload[0].payload.orders} fake orders
      </p>
    </div>
  );
}

export default function WeeklySavingsChartInner() {
  const maxDay = WEEKLY_DATA.reduce((a, b) => (a.saved > b.saved ? a : b)).day;

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={WEEKLY_DATA} barSize={32} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity={1} />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity={0.5} />
          </linearGradient>
          <linearGradient id="barGradientMuted" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--muted-foreground)" stopOpacity={0.3} />
            <stop offset="100%" stopColor="var(--muted-foreground)" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="day"
          tick={{ fill: 'var(--muted-foreground)', fontSize: 12, fontFamily: 'var(--font-sans)' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: 'var(--muted-foreground)', fontSize: 11, fontFamily: 'var(--font-sans)' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `$${v}`}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--muted)', opacity: 0.5, radius: 8 }} />
        <Bar dataKey="saved" radius={[8, 8, 0, 0]}>
          {WEEKLY_DATA.map((entry) => (
            <Cell
              key={`cell-${entry.day}`}
              fill={entry.day === maxDay ? 'url(#barGradient)' : 'url(#barGradientMuted)'}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}