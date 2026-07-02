'use client';

import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const FOOTER_LINKS = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Start Shopping', href: '/dashboard' },
    { label: 'Product Catalog', href: '/product-catalog' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Press', href: '#' },
    { label: 'Careers', href: '#' },
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
    <footer style={{ background: 'var(--primary)', padding: '60px 0 32px' }}>
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AppLogo size={32} />
              <span className="font-bold text-base" style={{ color: 'var(--primary-foreground)' }}>
                RetailTherapy
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(250,250,248,0.6)' }}>
              Shop the joy. Keep the savings. Your financial wellness starts here.
            </p>
            <div className="flex items-center gap-3">
              {['TwitterIcon', 'GlobeAltIcon', 'EnvelopeIcon'].map((icon) => (
                <button
                  key={`footer-social-${icon}`}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-150"
                  style={{ background: 'rgba(255,255,255,0.1)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                >
                  <Icon
                    name={icon as Parameters<typeof Icon>[0]['name']}
                    size={16}
                    style={{ color: 'rgba(250,250,248,0.8)' } as React.CSSProperties}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={`footer-group-${group}`}>
              <h4 className="font-semibold text-sm mb-4 tracking-wide uppercase" style={{ color: 'rgba(250,250,248,0.5)', letterSpacing: '0.08em' }}>
                {group}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={`footer-link-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors duration-150"
                      style={{ color: 'rgba(250,250,248,0.7)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(250,250,248,1)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(250,250,248,0.7)')}
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
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(250,250,248,0.4)' }}>
            © 2026 RetailTherapy. Built for your financial wellness.
          </p>
          <div className="flex items-center gap-2">
            <Icon name="HeartIcon" size={14} style={{ color: 'var(--accent)' } as React.CSSProperties} />
            <p className="text-xs" style={{ color: 'rgba(250,250,248,0.4)' }}>
              No real money spent since 2024
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}