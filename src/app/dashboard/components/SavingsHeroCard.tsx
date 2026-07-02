'use client';

import React, { useEffect, useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { useStore } from '@/lib/store';

function AnimatedValue({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * value);
      setDisplayed(current);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [value]);

  return (
    <span>
      {prefix}{displayed.toLocaleString()}{suffix}
    </span>
  );
}

export default function SavingsHeroCard() {
  const totalSaved = useStore((s) => s.totalSaved);
  const streak = useStore((s) => s.streak);

  const milestoneTarget = 5000;
  const progress = Math.min((totalSaved / milestoneTarget) * 100, 100);

  return (
    <div
      className="gradient-savings rounded-2xl p-6 h-full relative overflow-hidden"
      style={{ minHeight: '220px' }}
    >
      {/* Background decoration */}
      <div
        className="absolute -top-8 -right-8 w-48 h-48 rounded-full opacity-10"
        style={{ background: 'var(--accent)' }}
      />
      <div
        className="absolute -bottom-12 -left-8 w-40 h-40 rounded-full opacity-5"
        style={{ background: 'var(--accent)' }}
      />

      <div className="relative z-10 h-full flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-xs font-medium tracking-wide uppercase mb-1" style={{ color: 'rgba(250,250,248,0.6)', letterSpacing: '0.08em' }}>
                Total Money Saved
              </p>
              <div className="text-4xl xl:text-5xl font-extrabold font-mono-nums" style={{ color: 'var(--primary-foreground)' }}>
                $<AnimatedValue value={totalSaved} />
              </div>
            </div>
            <div
              className="px-3 py-1.5 rounded-xl flex items-center gap-1.5"
              style={{ background: 'rgba(34, 197, 94, 0.2)' }}
            >
              <Icon name="ArrowTrendingUpIcon" size={14} style={{ color: 'var(--success)' } as React.CSSProperties} />
              <span className="text-xs font-semibold" style={{ color: 'var(--success)' }}>+$342 this week</span>
            </div>
          </div>

          <p className="text-sm mt-1" style={{ color: 'rgba(250,250,248,0.5)' }}>
            by choosing RetailTherapy over real stores
          </p>
        </div>

        {/* Milestone progress */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs" style={{ color: 'rgba(250,250,248,0.6)' }}>
              Next milestone: ${milestoneTarget.toLocaleString()}
            </span>
            <span className="text-xs font-semibold font-mono-nums" style={{ color: 'var(--accent)' }}>
              {Math.round(progress)}%
            </span>
          </div>
          <div
            className="h-2 rounded-full overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.15)' }}
          >
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{ width: `${progress}%`, background: 'var(--accent)' }}
            />
          </div>
          <div className="flex items-center gap-2 mt-4">
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
              style={{ background: 'rgba(232, 168, 124, 0.2)' }}
            >
              <Icon name="FireIcon" size={14} style={{ color: 'var(--accent)' } as React.CSSProperties} />
              <span className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>
                {streak} day streak
              </span>
            </div>
            <span className="text-xs" style={{ color: 'rgba(250,250,248,0.4)' }}>
              Don&apos;t break it!
            </span>
          </div>
        </div>
      </div>
    </div>);
}