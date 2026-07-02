'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import { useTheme } from '@/components/ThemeProvider';
import { useStore } from '@/lib/store';

const navItems = [
  { href: '/dashboard', label: 'Home', icon: 'HomeIcon' },
  { href: '/product-catalog', label: 'Shop', icon: 'ShoppingBagIcon' },
  { href: '/dashboard#orders', label: 'Orders', icon: 'ClipboardDocumentListIcon' },
  { href: '/dashboard#analytics', label: 'Analytics', icon: 'ChartBarIcon' },
  { href: '/wishlist', label: 'Wishlist', icon: 'HeartIcon' },
] as const;

interface AppLayoutProps {
  children: React.ReactNode;
  cartCount?: number;
  wishlistCount?: number;
}

export default function AppLayout({ children, cartCount = 0, wishlistCount = 0 }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const storeWishlistCount = useStore((s) => s.wishlist.length);
  const storeCartCount = useStore((s) => s.getCartCount());
  const resolvedWishlistCount = storeWishlistCount || wishlistCount;
  const resolvedCartCount = storeCartCount || cartCount;

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--background)' }}>
      {/* Sidebar */}
      <aside
        className={`hidden lg:flex flex-col sidebar-transition flex-shrink-0 border-r`}
        style={{
          width: sidebarOpen ? '220px' : '60px',
          background: 'var(--card)',
          borderColor: 'var(--border)',
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center justify-center px-4 py-6 border-b"
          style={{ borderColor: 'var(--border)', minHeight: '72px' }}
        >
          {sidebarOpen ? (
            <Link href="/" className="elan-logo text-xl" style={{ color: 'var(--foreground)' }}>
              Élan
            </Link>
          ) : (
            <Link href="/" className="elan-logo text-base" style={{ color: 'var(--foreground)' }}>
              É
            </Link>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-6 px-3 flex flex-col gap-0.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            return (
              <Link
                key={`nav-${item.label}`}
                href={item.href}
                title={!sidebarOpen ? item.label : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 transition-all duration-200 group relative ${
                  isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon
                  name={item.icon as Parameters<typeof Icon>[0]['name']}
                  size={16}
                  className={isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}
                />
                {sidebarOpen && (
                  <span className="tracking-editorial" style={{ fontSize: '0.65rem' }}>{item.label}</span>
                )}
                {isActive && (
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4"
                    style={{ background: 'var(--foreground)' }}
                  />
                )}
                {!sidebarOpen && item.label === 'Wishlist' && resolvedWishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--foreground)' }} />
                )}
                {sidebarOpen && item.label === 'Wishlist' && resolvedWishlistCount > 0 && (
                  <span
                    className="ml-auto text-xs font-mono-nums"
                    style={{ color: 'var(--muted-foreground)', fontSize: '0.6rem' }}
                  >
                    {resolvedWishlistCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="py-4 px-3 border-t flex flex-col gap-0.5" style={{ borderColor: 'var(--border)' }}>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 px-3 py-2.5 transition-all duration-200 text-muted-foreground hover:text-foreground w-full"
            title={!sidebarOpen ? (theme === 'dark' ? 'Light Mode' : 'Dark Mode') : undefined}
          >
            <Icon name={theme === 'dark' ? 'SunIcon' : 'MoonIcon'} size={16} />
            {sidebarOpen && <span className="tracking-editorial" style={{ fontSize: '0.65rem' }}>{theme === 'dark' ? 'Light' : 'Dark'}</span>}
          </button>
          <Link
            href="/dashboard#settings"
            className="flex items-center gap-3 px-3 py-2.5 transition-all duration-200 text-muted-foreground hover:text-foreground"
            title={!sidebarOpen ? 'Settings' : undefined}
          >
            <Icon name="Cog6ToothIcon" size={16} />
            {sidebarOpen && <span className="tracking-editorial" style={{ fontSize: '0.65rem' }}>Settings</span>}
          </Link>
          {/* User */}
          <div className="flex items-center gap-3 px-3 py-2.5 mt-1">
            <div
              className="w-7 h-7 flex items-center justify-center text-xs font-medium flex-shrink-0"
              style={{ background: 'var(--muted)', color: 'var(--foreground)', borderRadius: '2px' }}
            >
              S
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate" style={{ color: 'var(--foreground)' }}>Sofia Marchetti</p>
              </div>
            )}
          </div>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute bottom-24 w-5 h-8 flex items-center justify-center transition-all duration-150 hover:opacity-60"
          style={{
            background: 'var(--card)',
            borderColor: 'var(--border)',
            border: '1px solid var(--border)',
            borderLeft: 'none',
            marginLeft: sidebarOpen ? '220px' : '60px',
            position: 'fixed',
            zIndex: 10,
            borderRadius: '0 2px 2px 0',
          }}
        >
          <Icon
            name={sidebarOpen ? 'ChevronLeftIcon' : 'ChevronRightIcon'}
            size={12}
            className="text-muted-foreground"
          />
        </button>
      </aside>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 lg:hidden flex flex-col transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ background: 'var(--card)', borderRight: '1px solid var(--border)' }}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: 'var(--border)' }}>
          <Link href="/" className="elan-logo text-xl" style={{ color: 'var(--foreground)' }}>
            Élan
          </Link>
          <button onClick={() => setMobileMenuOpen(false)}>
            <Icon name="XMarkIcon" size={18} className="text-muted-foreground" />
          </button>
        </div>
        <nav className="flex-1 py-6 px-3 flex flex-col gap-0.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={`mobile-nav-${item.label}`}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 transition-all duration-200 relative ${
                  isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {isActive && (
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4"
                    style={{ background: 'var(--foreground)' }}
                  />
                )}
                <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={16} />
                <span className="tracking-editorial" style={{ fontSize: '0.65rem' }}>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header
          className="flex items-center gap-4 px-4 lg:px-6 h-[72px] border-b flex-shrink-0"
          style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
        >
          <button
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Icon name="Bars3Icon" size={18} className="text-muted-foreground" />
          </button>

          {/* Brand on mobile */}
          <div className="lg:hidden">
            <Link href="/" className="elan-logo text-lg" style={{ color: 'var(--foreground)' }}>
              Élan
            </Link>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-sm hidden md:block">
            <div className="relative">
              <Icon
                name="MagnifyingGlassIcon"
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Search collections..."
                className="input-field pl-9 py-2 text-xs"
                style={{ background: 'var(--muted)', borderRadius: '2px' }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2 transition-all duration-200 hover:opacity-60"
            >
              <Icon name="HeartIcon" size={18} className="text-muted-foreground" />
              {resolvedWishlistCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 text-xs font-bold flex items-center justify-center"
                  style={{ background: 'var(--foreground)', color: 'var(--background)', borderRadius: '2px', fontSize: '0.5rem' }}
                >
                  {resolvedWishlistCount > 9 ? '9+' : resolvedWishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/product-catalog"
              className="relative p-2 transition-all duration-200 hover:opacity-60"
            >
              <Icon name="ShoppingCartIcon" size={18} className="text-muted-foreground" />
              {resolvedCartCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 text-xs font-bold flex items-center justify-center"
                  style={{ background: 'var(--foreground)', color: 'var(--background)', borderRadius: '2px', fontSize: '0.5rem' }}
                >
                  {resolvedCartCount > 9 ? '9+' : resolvedCartCount}
                </span>
              )}
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}