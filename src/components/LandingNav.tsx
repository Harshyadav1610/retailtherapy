'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import { useTheme } from '@/components/ThemeProvider';

export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass shadow-sm' : 'bg-transparent'
        }`}
        style={{ height: '72px' }}
      >
        <div className="max-w-screen-xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AppLogo size={36} />
            <span className="font-bold text-base tracking-tight" style={{ color: 'var(--foreground)' }}>
              RetailTherapy
            </span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {['Features', 'How It Works', 'Testimonials', 'FAQ']?.map((item) => (
              <a
                key={`landing-nav-${item}`}
                href={`#${item?.toLowerCase()?.replace(/\s+/g, '-')}`}
                className="text-sm font-medium transition-colors duration-150"
                style={{ color: 'var(--muted-foreground)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--foreground)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted-foreground)')}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl transition-all duration-150 hover:bg-muted"
            >
              <Icon name={theme === 'dark' ? 'SunIcon' : 'MoonIcon'} size={18} className="text-muted-foreground" />
            </button>

            <Link href="/dashboard" className="btn-primary hidden md:inline-flex text-sm px-5 py-2.5">
              Start Shopping
            </Link>

            <button
              className="md:hidden p-2 rounded-xl hover:bg-muted"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <Icon name={mobileOpen ? 'XMarkIcon' : 'Bars3Icon'} size={20} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      </nav>
      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="fixed inset-x-0 top-[72px] z-40 glass border-b px-6 py-4 flex flex-col gap-3 md:hidden"
          style={{ borderColor: 'var(--border)' }}
        >
          {['Features', 'How It Works', 'Testimonials', 'FAQ']?.map((item) => (
            <a
              key={`mobile-landing-${item}`}
              href={`#${item?.toLowerCase()?.replace(/\s+/g, '-')}`}
              className="text-sm font-medium py-2"
              style={{ color: 'var(--foreground)' }}
              onClick={() => setMobileOpen(false)}
            >
              {item}
            </a>
          ))}
          <Link href="/dashboard" className="btn-primary w-full justify-center mt-2" onClick={() => setMobileOpen(false)}>
            Start Shopping
          </Link>
        </div>
      )}
    </>
  );
}