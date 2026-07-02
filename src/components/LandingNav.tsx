'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass' : 'bg-transparent'
        }`}
        style={{ height: '72px' }}
      >
        <div className="max-w-screen-xl mx-auto px-8 h-full flex items-center justify-between">
          {/* Left nav links */}
          <div className="hidden md:flex items-center gap-8">
            {['Collections', 'New Arrivals', 'Sale']?.map((item) => (
              <a
                key={`landing-nav-${item}`}
                href={`#features`}
                className="tracking-editorial transition-colors duration-200"
                style={{ color: 'var(--muted-foreground)', fontSize: '0.65rem' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--foreground)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted-foreground)')}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Center: Brand wordmark */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link href="/" className="elan-logo text-2xl" style={{ color: 'var(--foreground)' }}>
              Élan
            </Link>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-5 ml-auto">
            <button
              onClick={toggleTheme}
              className="transition-all duration-200 hover:opacity-60"
            >
              <Icon name={theme === 'dark' ? 'SunIcon' : 'MoonIcon'} size={16} className="text-muted-foreground" />
            </button>

            <Link
              href="/dashboard"
              className="hidden md:flex tracking-editorial transition-colors duration-200"
              style={{ color: 'var(--muted-foreground)', fontSize: '0.65rem' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--foreground)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted-foreground)')}
            >
              Shop Now
            </Link>

            <button
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <Icon name={mobileOpen ? 'XMarkIcon' : 'Bars3Icon'} size={18} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      </nav>
      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="fixed inset-x-0 top-[72px] z-40 border-b px-8 py-8 flex flex-col gap-6 md:hidden"
          style={{ background: 'var(--background)', borderColor: 'var(--border)' }}
        >
          {['Collections', 'New Arrivals', 'Sale', 'About']?.map((item) => (
            <a
              key={`mobile-landing-${item}`}
              href={`#features`}
              className="tracking-editorial"
              style={{ color: 'var(--foreground)', fontSize: '0.7rem' }}
              onClick={() => setMobileOpen(false)}
            >
              {item}
            </a>
          ))}
          <Link
            href="/dashboard"
            className="btn-primary w-full justify-center mt-2"
            onClick={() => setMobileOpen(false)}
          >
            Shop Now
          </Link>
        </div>
      )}
    </>
  );
}