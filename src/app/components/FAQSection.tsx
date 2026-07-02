'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const FAQS = [
  {
    id: 'faq-1',
    question: 'What is ÉLAN\'s return policy?',
    answer: 'We offer a 30-day return policy on all unworn items with original tags attached. Returns are free for orders over $150. Simply initiate a return from your account dashboard and we\'ll arrange collection.',
  },
  {
    id: 'faq-2',
    question: 'How do I find my size?',
    answer: 'Each product page includes a detailed size guide with measurements in both cm and inches. If you\'re between sizes, we recommend sizing up for a relaxed fit or down for a more tailored silhouette.',
  },
  {
    id: 'faq-3',
    question: 'Where are ÉLAN pieces made?',
    answer: 'Our pieces are produced in partnership with ethical manufacturers across Portugal, Italy, and Japan. We visit every factory and maintain strict standards for working conditions and environmental impact.',
  },
  {
    id: 'faq-4',
    question: 'Do you offer international shipping?',
    answer: 'Yes, we ship to over 40 countries. International orders typically arrive within 5–10 business days. Duties and taxes may apply depending on your location.',
  },
  {
    id: 'faq-5',
    question: 'How do I care for my ÉLAN pieces?',
    answer: 'Each garment includes detailed care instructions on the label. As a general rule, we recommend cold washing and air drying to preserve the quality and longevity of your pieces.',
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  return (
    <section id="faq" style={{ padding: '100px 0', background: 'var(--background)' }}>
      <div className="max-w-screen-xl mx-auto px-8 md:px-16">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div className="lg:sticky top-24">
            <p className="tracking-editorial mb-4" style={{ color: 'var(--muted-foreground)', fontSize: '0.65rem' }}>
              FAQ
            </p>
            <h2
              className="font-display mb-6"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3.5rem)', fontWeight: 300, color: 'var(--foreground)' }}
            >
              Questions &<br />
              <em>Answers</em>
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--muted-foreground)', fontWeight: 300, maxWidth: '340px' }}>
              Everything you need to know about ÉLAN. Can't find your answer? Our team is here to help.
            </p>

            <div
              className="p-6 border"
              style={{ borderColor: 'var(--border)', background: 'var(--secondary)' }}
            >
              <p className="text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>Still have questions?</p>
              <p className="text-xs mb-4" style={{ color: 'var(--muted-foreground)', fontWeight: 300 }}>
                We respond to every message within 24 hours.
              </p>
              <button className="btn-primary text-xs px-6 py-3">
                Contact Us
              </button>
            </div>
          </div>

          {/* Right: Accordion */}
          <div className="flex flex-col border-t" style={{ borderColor: 'var(--border)' }}>
            {FAQS.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="border-b"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full flex items-center justify-between py-5 text-left transition-all duration-150"
                  >
                    <span className="text-sm font-medium pr-8" style={{ color: 'var(--foreground)' }}>
                      {faq.question}
                    </span>
                    <Icon
                      name={isOpen ? 'MinusIcon' : 'PlusIcon'}
                      size={14}
                      className="flex-shrink-0"
                      style={{ color: 'var(--muted-foreground)' } as React.CSSProperties}
                    />
                  </button>
                  {isOpen && (
                    <div className="pb-5">
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)', fontWeight: 300 }}>
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}