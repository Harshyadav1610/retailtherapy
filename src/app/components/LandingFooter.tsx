'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const FOOTER_LINKS = {
  Collections: [
    { label: "Women\'s", href: '/product-catalog' },
    { label: "Men\'s", href: '/product-catalog' },
    { label: 'New Arrivals', href: '/product-catalog' },
    { label: 'Sale', href: '/product-catalog' },
  ],
  Company: [
    { label: 'About ÉLAN', href: '#' },
    { label: 'Sustainability', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
  ],
  Support: [
    { label: 'Size Guide', href: '#' },
    { label: 'Returns', href: '#' },
    { label: 'Shipping', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'Accessibility', href: '#' },
  ],
};

export default function LandingFooter() {
  return (
    <footer style={{ background: 'var(--foreground)', padding: '80px 0 40px' }}>
      <div className="max-w-screen-xl mx-auto px-8 md:px-16">
        {/* Top: Brand + Newsletter */}
        <div className="grid lg:grid-cols-2 gap-16 mb-16 pb-16 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <div>
            <p className="elan-logo text-3xl mb-4" style={{ color: 'var(--background)' }}>
              Élan
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(250,249,247,0.5)', fontWeight: 300, maxWidth: '320px' }}>
              Modern fashion for the considered wardrobe. Timeless pieces, premium quality, minimal design.
            </p>
          </div>
          <div>
            <p className="tracking-editorial mb-4" style={{ color: 'rgba(250,249,247,0.5)', fontSize: '0.65rem' }}>
              Newsletter
            </p>
            <p className="text-sm mb-4" style={{ color: 'rgba(250,249,247,0.7)', fontWeight: 300 }}>
              New arrivals, exclusive offers, and editorial content — delivered to your inbox.
            </p>
            <div className="flex gap-0">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 text-xs outline-none"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  color: 'var(--background)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRight: 'none',
                  borderRadius: '0',
                }}
              />
              <button
                className="px-6 py-3 text-xs font-medium tracking-widest uppercase transition-all duration-200 hover:opacity-80"
                style={{
                  background: 'var(--background)',
                  color: 'var(--foreground)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  letterSpacing: '0.1em',
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={`footer-group-${group}`}>
              <h4 className="tracking-editorial mb-5" style={{ color: 'rgba(250,249,247,0.4)', fontSize: '0.6rem' }}>
                {group}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={`footer-link-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors duration-200"
                      style={{ color: 'rgba(250,249,247,0.6)', fontWeight: 300 }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(250,249,247,1)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(250,249,247,0.6)')}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <p className="tracking-editorial" style={{ color: 'rgba(250,249,247,0.3)', fontSize: '0.6rem' }}>
            © 2026 ÉLAN. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {['TwitterIcon', 'GlobeAltIcon', 'EnvelopeIcon'].map((icon) => (
              <button
                key={`footer-social-${icon}`}
                className="transition-all duration-200 hover:opacity-60"
              >
                <Icon
                  name={icon as Parameters<typeof Icon>[0]['name']}
                  size={14}
                  style={{ color: 'rgba(250,249,247,0.4)' } as React.CSSProperties}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}