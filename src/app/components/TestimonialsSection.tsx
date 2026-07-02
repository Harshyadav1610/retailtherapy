'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

const TESTIMONIALS = [
  {
    id: 'test-1',
    name: 'Priya Ramanathan',
    role: 'UX Designer, Bangalore',
    avatar: 'P',
    avatarBg: 'var(--accent)',
    quote:
      '"I used to spend ₹15,000 a month on clothes I\'d wear once. RetailTherapy gave me the shopping high without the guilt. I\'ve saved over ₹2 lakh this year."',
    saved: '$2,400',
    streak: '47 days',
    rating: 5,
  },
  {
    id: 'test-2',
    name: 'Marcus Delacroix',
    role: 'Software Engineer, Toronto',
    avatar: 'M',
    avatarBg: 'var(--primary)',
    quote:
      '"I used to mindlessly scroll Amazon at midnight and wake up to packages I didn\'t need. Now I scroll RetailTherapy. My savings account actually grew for the first time."',
    saved: '$3,180',
    streak: '62 days',
    rating: 5,
  },
  {
    id: 'test-3',
    name: 'Yuki Tanaka',
    role: 'Freelance Photographer, Tokyo',
    avatar: 'Y',
    avatarBg: '#6b7280',
    quote:
      '"The checkout experience is SO satisfying. Confetti, tracking number, everything. But my money stays mine. It\'s brilliant and a little bit magical."',
    saved: '$1,890',
    streak: '29 days',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" style={{ padding: '100px 0', background: 'var(--background)' }}>
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="badge badge-success mb-4 inline-flex">
            <Icon name="ChatBubbleLeftRightIcon" size={12} />
            Real Stories
          </span>
          <h2 className="text-hero-md font-extrabold" style={{ color: 'var(--foreground)' }}>
            People who stopped{' '}
            <span style={{ color: 'var(--accent)' }}>overspending</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS?.map((t) => (
            <div
              key={t?.id}
              className="card-base card-hover flex flex-col gap-5"
              style={{ borderColor: 'var(--border)' }}
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5]?.map((s) => (
                  <Icon key={`${t?.id}-star-${s}`} name="StarIcon" size={14} className="star-filled" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--foreground)' }}>
                {t?.quote}
              </p>

              {/* Stats */}
              <div
                className="grid grid-cols-2 gap-3 py-4 border-y"
                style={{ borderColor: 'var(--border)' }}
              >
                <div>
                  <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Total Saved</p>
                  <p className="font-bold font-mono-nums" style={{ color: 'var(--success)' }}>{t?.saved}</p>
                </div>
                <div>
                  <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Best Streak</p>
                  <p className="font-bold font-mono-nums" style={{ color: 'var(--accent)' }}>{t?.streak}</p>
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: t?.avatarBg, color: 'var(--primary-foreground)' }}
                >
                  {t?.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: 'var(--foreground)' }}>{t?.name}</p>
                  <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{t?.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}