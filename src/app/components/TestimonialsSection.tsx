'use client';

import React from 'react';

const TESTIMONIALS = [
  {
    id: 'test-1',
    name: 'Isabelle M.',
    role: 'Paris',
    quote: '"ÉLAN has completely changed how I think about my wardrobe. Every piece I own from them is still in rotation three years later."',
  },
  {
    id: 'test-2',
    name: 'James K.',
    role: 'London',
    quote: '"The quality is extraordinary for the price point. I\'ve stopped buying from everywhere else. ÉLAN is all I need."',
  },
  {
    id: 'test-3',
    name: 'Yuki T.',
    role: 'Tokyo',
    quote: '"Minimal, beautiful, and built to last. This is what fashion should always have been."',
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" style={{ padding: '100px 0', background: 'var(--background)' }}>
      <div className="max-w-screen-xl mx-auto px-8 md:px-16">
        <div className="mb-16">
          <p className="tracking-editorial mb-4" style={{ color: 'var(--muted-foreground)', fontSize: '0.65rem' }}>
            What They Say
          </p>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 3.5rem)', fontWeight: 300, color: 'var(--foreground)' }}
          >
            Worn and <em>loved</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {TESTIMONIALS?.map((t, i) => (
            <div key={t?.id} className="flex flex-col gap-6">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5]?.map((s) => (
                  <div
                    key={`${t?.id}-star-${s}`}
                    className="w-2 h-2"
                    style={{ background: 'var(--foreground)' }}
                  />
                ))}
              </div>

              <p
                className="font-display leading-relaxed flex-1"
                style={{ color: 'var(--foreground)', fontSize: '1.1rem', fontWeight: 300, fontStyle: 'italic' }}
              >
                {t?.quote}
              </p>

              <div className="pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{t?.name}</p>
                <p className="tracking-editorial mt-1" style={{ color: 'var(--muted-foreground)', fontSize: '0.6rem' }}>
                  {t?.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}