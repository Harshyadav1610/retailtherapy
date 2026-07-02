'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import type { FakeOrder } from '@/lib/store';

interface OrderSuccessModalProps {
  order: FakeOrder;
  onClose: () => void;
}

export default function OrderSuccessModal({ order, onClose }: OrderSuccessModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Backend integration point: log order event to analytics
    let confetti: ((opts: object) => void) | null = null;

    import('canvas-confetti').then((mod) => {
      confetti = mod.default;
      if (confetti) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#e8a87c', '#1a1a2e', '#22c55e', '#f0c49a', '#ffffff'],
        });
        setTimeout(() => {
          if (confetti) {
            confetti({
              particleCount: 60,
              spread: 100,
              origin: { y: 0.4, x: 0.3 },
              colors: ['#e8a87c', '#22c55e'],
            });
          }
        }, 400);
      }
    });

    return () => { confetti = null; };
  }, []);

  const itemCount = order.items.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[61]" />
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="relative z-[62] w-full max-w-sm rounded-3xl p-8 text-center animate-slide-up"
        style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
      >
        {/* Success icon */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ background: 'rgba(34,197,94,0.12)' }}
        >
          <Icon name="CheckCircleIcon" size={44} style={{ color: 'var(--success)' } as React.CSSProperties} />
        </div>

        <h2 className="text-2xl font-extrabold mb-2" style={{ color: 'var(--foreground)' }}>
          Order Placed! 🎉
        </h2>
        <p className="text-sm mb-6" style={{ color: 'var(--muted-foreground)' }}>
          Your fake order has been confirmed. Your wallet is untouched.
        </p>

        {/* Savings highlight */}
        <div
          className="rounded-2xl p-5 mb-5"
          style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}
        >
          <p className="text-xs font-medium mb-1" style={{ color: 'var(--success)' }}>
            You just saved
          </p>
          <p className="text-4xl font-extrabold font-mono-nums" style={{ color: 'var(--success)' }}>
            ${order.total.toFixed(2)}
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>
            by shopping here instead of a real store
          </p>
        </div>

        {/* Order details */}
        <div className="flex flex-col gap-2 mb-6 text-sm">
          <div className="flex justify-between">
            <span style={{ color: 'var(--muted-foreground)' }}>Tracking ID</span>
            <span className="font-bold font-mono-nums" style={{ color: 'var(--foreground)' }}>{order.trackingId}</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: 'var(--muted-foreground)' }}>Items</span>
            <span className="font-semibold" style={{ color: 'var(--foreground)' }}>{itemCount} item{itemCount !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: 'var(--muted-foreground)' }}>Est. Delivery</span>
            <span className="font-semibold" style={{ color: 'var(--foreground)' }}>{order.estimatedDelivery}</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: 'var(--muted-foreground)' }}>Status</span>
            <span
              className="px-2 py-0.5 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(245,158,11,0.15)', color: 'var(--warning)' }}
            >
              {order.status}
            </span>
          </div>
        </div>

        <button onClick={onClose} className="btn-primary w-full justify-center py-3">
          <Icon name="SparklesIcon" size={16} />
          Keep Shopping (It&apos;s Free!)
        </button>

        <p className="text-xs mt-3" style={{ color: 'var(--muted-foreground)' }}>
          No package will arrive. No money was spent. Pure joy. ✨
        </p>
      </div>
    </div>
  );
}