'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const SAVINGS_TARGET = 18420;

function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animFrame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) animFrame = requestAnimationFrame(step);
    };

    const timeout = setTimeout(() => {
      animFrame = requestAnimationFrame(step);
    }, 500);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animFrame);
    };
  }, [target, duration]);

  return (
    <span className="font-mono-nums">
      ${count.toLocaleString()}
    </span>
  );
}

const FLOATING_PRODUCTS = [
  { id: 'float-1', name: 'AirPods Pro', price: '$249', emoji: '🎧', delay: '0ms', top: '15%', left: '5%' },
  { id: 'float-2', name: 'Linen Blazer', price: '$185', emoji: '🧥', delay: '200ms', top: '55%', left: '2%' },
  { id: 'float-3', name: 'Le Creuset', price: '$389', emoji: '🍳', delay: '400ms', top: '30%', right: '4%' },
  { id: 'float-4', name: 'Manduka Mat', price: '$120', emoji: '🧘', delay: '600ms', top: '70%', right: '6%' },
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="gradient-hero relative overflow-hidden" style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      {/* Background blobs */}
      <div
        className="absolute top-20 right-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'var(--accent)' }}
      />
      <div
        className="absolute bottom-20 left-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'var(--primary)' }}
      />

      {/* Floating product cards — desktop only */}
      {mounted && FLOATING_PRODUCTS.map((item) => (
        <div
          key={item.id}
          className="hidden xl:flex absolute glass-card rounded-2xl px-4 py-3 items-center gap-3 shadow-card animate-fade-in"
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            animationDelay: item.delay,
            zIndex: 1,
          }}
        >
          <span className="text-2xl">{item.emoji}</span>
          <div>
            <p className="text-xs font-semibold" style={{ color: 'var(--foreground)' }}>{item.name}</p>
            <p className="text-xs price-tag line-through" style={{ color: 'var(--muted-foreground)' }}>{item.price}</p>
          </div>
          <span className="badge badge-success text-xs ml-1">Saved!</span>
        </div>
      ))}

      <div className="max-w-screen-xl mx-auto px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-2">
              <span className="badge badge-accent">
                <Icon name="SparklesIcon" size={12} />
                Financial Wellness
              </span>
              <span className="badge badge-success">
                <Icon name="HeartIcon" size={12} />
                Guilt-Free Shopping
              </span>
            </div>

            <div>
              <h1 className="text-hero-xl font-extrabold text-balance" style={{ color: 'var(--foreground)', letterSpacing: '-0.03em' }}>
                Feel the Joy of{' '}
                <span style={{ color: 'var(--accent)' }}>Shopping.</span>
                <br />
                Spend Nothing.
              </h1>
              <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)', maxWidth: '500px' }}>
                Experience the excitement of browsing, carting, and "buying" your favourite products — while your real wallet stays untouched.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/dashboard" className="btn-primary text-base px-8 py-4">
                <Icon name="ShoppingBagIcon" size={18} />
                Start Shopping Free
              </Link>
              <a href="#how-it-works" className="btn-outline text-base px-8 py-4">
                <Icon name="PlayCircleIcon" size={18} />
                How It Works
              </a>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <div className="flex -space-x-2">
                {['S', 'M', 'A', 'R'].map((initial, i) => (
                  <div
                    key={`avatar-${initial}-${i}`}
                    className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                    style={{
                      background: i % 2 === 0 ? 'var(--accent)' : 'var(--primary)',
                      color: i % 2 === 0 ? 'var(--accent-foreground)' : 'var(--primary-foreground)',
                      borderColor: 'var(--background)',
                    }}
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Icon key={`star-${s}`} name="StarIcon" size={14} className="star-filled" />
                  ))}
                </div>
                <p className="text-sm mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
                  <strong style={{ color: 'var(--foreground)' }}>12,400+</strong> people saving money
                </p>
              </div>
            </div>
          </div>

          {/* Right: Savings dashboard preview */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              {/* Main savings card */}
              <div
                className="gradient-savings rounded-3xl p-8 shadow-primary-glow relative overflow-hidden"
              >
                <div
                  className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10 -translate-y-1/4 translate-x-1/4"
                  style={{ background: 'var(--accent)' }}
                />
                <p className="text-sm font-medium mb-2 opacity-70" style={{ color: 'var(--primary-foreground)' }}>
                  Total Saved This Year
                </p>
                <div className="text-5xl font-extrabold mb-1 font-mono-nums" style={{ color: 'var(--primary-foreground)' }}>
                  {mounted ? <AnimatedCounter target={SAVINGS_TARGET} /> : '$0'}
                </div>
                <p className="text-sm opacity-60 mb-6" style={{ color: 'var(--primary-foreground)' }}>
                  by not impulse buying
                </p>

                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Orders', value: '47', icon: 'ShoppingBagIcon' },
                    { label: 'Day Streak', value: '14', icon: 'FireIcon' },
                    { label: 'Wishlisted', value: '83', icon: 'HeartIcon' },
                  ].map((stat) => (
                    <div
                      key={`hero-stat-${stat.label}`}
                      className="rounded-2xl p-3 text-center"
                      style={{ background: 'rgba(255,255,255,0.1)' }}
                    >
                      <Icon name={stat.icon as Parameters<typeof Icon>[0]['name']} size={18} className="mx-auto mb-1 opacity-80" style={{ color: 'var(--primary-foreground)' } as React.CSSProperties} />
                      <div className="text-xl font-bold font-mono-nums" style={{ color: 'var(--primary-foreground)' }}>{stat.value}</div>
                      <div className="text-xs opacity-60" style={{ color: 'var(--primary-foreground)' }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mini product cards below */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                {[
                  { id: 'mini-1', name: 'Sony Headphones', price: '$349', saved: true, img: '🎧' },
                  { id: 'mini-2', name: 'Linen Blazer', price: '$185', saved: true, img: '🧥' },
                ].map((item) => (
                  <div key={item.id} className="glass-card rounded-2xl p-4 flex items-center gap-3">
                    <span className="text-2xl">{item.img}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold truncate" style={{ color: 'var(--foreground)' }}>{item.name}</p>
                      <p className="text-xs price-tag line-through" style={{ color: 'var(--muted-foreground)' }}>{item.price}</p>
                    </div>
                    <Icon name="CheckCircleIcon" size={18} className="ml-auto flex-shrink-0" style={{ color: 'var(--success)' } as React.CSSProperties} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}