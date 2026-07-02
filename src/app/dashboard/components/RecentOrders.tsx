'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';
import { useStore } from '@/lib/store';

const MOCK_ORDERS = [
  {
    id: 'mock-order-1',
    productName: 'AirPods Pro (3rd Gen)',
    category: 'Electronics',
    amount: 249,
    status: 'Delivered' as const,
    date: 'Jun 29',
    emoji: '🎧',
  },
  {
    id: 'mock-order-2',
    productName: 'Lululemon Align Leggings',
    category: 'Fitness',
    amount: 128,
    status: 'Shipped' as const,
    date: 'Jun 27',
    emoji: '🧘',
  },
  {
    id: 'mock-order-3',
    productName: 'Le Creuset Dutch Oven',
    category: 'Kitchen',
    amount: 389,
    status: 'Delivered' as const,
    date: 'Jun 24',
    emoji: '🍳',
  },
  {
    id: 'mock-order-4',
    productName: 'Sony WH-1000XM5',
    category: 'Electronics',
    amount: 349,
    status: 'Processing' as const,
    date: 'Jul 1',
    emoji: '🎵',
  },
];

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  Delivered: { bg: 'rgba(34,197,94,0.1)', color: 'var(--success)' },
  Shipped: { bg: 'rgba(59,130,246,0.1)', color: '#3b82f6' },
  Processing: { bg: 'rgba(245,158,11,0.1)', color: 'var(--warning)' },
  Cancelled: { bg: 'rgba(239,68,68,0.1)', color: 'var(--danger)' },
};

export default function RecentOrders() {
  const storeOrders = useStore((s) => s.orders);

  const displayOrders = [
    ...storeOrders.slice(0, 2).map((o) => ({
      id: o.id,
      productName: o.items[0]?.product.title ?? 'Order',
      category: o.items[0]?.product.category ?? '',
      amount: o.total,
      status: o.status,
      date: new Date(o.placedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      emoji: '🛍️',
    })),
    ...MOCK_ORDERS,
  ].slice(0, 5);

  return (
    <div className="card-base h-full flex flex-col" style={{ background: 'var(--card)' }}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-base" style={{ color: 'var(--foreground)' }}>Recent Orders</h3>
        <button className="text-xs font-medium" style={{ color: 'var(--accent)' }}>
          View all
        </button>
      </div>

      <div className="flex flex-col gap-3 flex-1">
        {displayOrders.map((order) => {
          const statusStyle = STATUS_STYLES[order.status] ?? STATUS_STYLES['Processing'];
          return (
            <div
              key={order.id}
              className="flex items-center gap-3 p-3 rounded-xl transition-all duration-150 hover:bg-muted/50 cursor-pointer"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                style={{ background: 'var(--muted)' }}
              >
                {order.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: 'var(--foreground)' }}>
                  {order.productName}
                </p>
                <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                  {order.date} · {order.category}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold font-mono-nums" style={{ color: 'var(--foreground)' }}>
                  ${order.amount.toFixed(0)}
                </p>
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{ background: statusStyle.bg, color: statusStyle.color }}
                >
                  {order.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="mt-4 pt-4 border-t flex items-center justify-between"
        style={{ borderColor: 'var(--border)' }}
      >
        <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
          {displayOrders.length} recent orders
        </span>
        <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--success)' }}>
          <Icon name="CheckCircleIcon" size={12} />
          All fake — wallet safe
        </div>
      </div>
    </div>
  );
}