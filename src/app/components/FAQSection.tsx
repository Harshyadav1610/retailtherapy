'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const FAQS = [
  {
    id: 'faq-1',
    question: 'Is RetailTherapy completely free?',
    answer:
      'Yes, completely free. No credit card, no subscription, no hidden fees. The entire app is free to use forever. We may offer a premium tier in the future with advanced analytics, but the core experience will always be free.',
  },
  {
    id: 'faq-2',
    question: 'Do I need to enter real payment information?',
    answer:
      'Never. RetailTherapy does not collect, store, or process any real payment information. The checkout form is a simulation — entering a card number there does nothing. No payment gateway is connected.',
  },
  {
    id: 'faq-3',
    question: 'Are the products real? Can I actually buy them?',
    answer:
      'The products are inspired by real items from real brands, but you cannot purchase them through RetailTherapy. This is a simulation. If you decide you genuinely need something after your cool-down period, you can search for it on the retailer\'s actual website.',
  },
  {
    id: 'faq-4',
    question: 'How does the savings tracker work?',
    answer:
      'Every time you complete a fake checkout, the total value of that order is added to your "Total Saved" counter. It represents money you did not spend by using RetailTherapy instead of a real store. It\'s not money in a bank account — it\'s a measure of impulse purchases avoided.',
  },
  {
    id: 'faq-5',
    question: 'What happens to my data?',
    answer:
      'Your cart, orders, and wishlist are stored locally in your browser using localStorage. We do not send your shopping behaviour to any server. Your data is yours. You can delete everything from the Settings page at any time.',
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  return (
    <section id="faq" style={{ padding: '100px 0', background: 'var(--secondary)' }}>
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div className="lg:sticky top-24">
            <span className="badge badge-muted mb-4 inline-flex">
              <Icon name="QuestionMarkCircleIcon" size={12} />
              FAQ
            </span>
            <h2 className="text-hero-md font-extrabold mb-4" style={{ color: 'var(--foreground)' }}>
              Questions &{' '}
              <span style={{ color: 'var(--accent)' }}>Answers</span>
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--muted-foreground)' }}>
              Everything you need to know about RetailTherapy. If your question isn&apos;t here, reach out.
            </p>

            <div
              className="rounded-2xl p-6"
              style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Icon name="EnvelopeIcon" size={20} style={{ color: 'var(--accent)' } as React.CSSProperties} />
                <span className="font-semibold text-sm" style={{ color: 'var(--foreground)' }}>Still have questions?</span>
              </div>
              <p className="text-sm mb-4" style={{ color: 'var(--muted-foreground)' }}>
                We read every message and respond within 24 hours.
              </p>
              <button className="btn-accent text-sm px-5 py-2.5 w-full justify-center">
                Contact Support
              </button>
            </div>
          </div>

          {/* Right: Accordion */}
          <div className="flex flex-col gap-3">
            {FAQS.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl overflow-hidden transition-all duration-200"
                  style={{
                    background: 'var(--card)',
                    border: `1.5px solid ${isOpen ? 'var(--accent)' : 'var(--border)'}`,
                  }}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left transition-all duration-150 hover:bg-muted/50"
                  >
                    <span className="font-semibold text-sm pr-4" style={{ color: 'var(--foreground)' }}>
                      {faq.question}
                    </span>
                    <Icon
                      name={isOpen ? 'ChevronUpIcon' : 'ChevronDownIcon'}
                      size={18}
                      className="flex-shrink-0 transition-transform duration-200"
                      style={{ color: isOpen ? 'var(--accent)' : 'var(--muted-foreground)' } as React.CSSProperties}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5">
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
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