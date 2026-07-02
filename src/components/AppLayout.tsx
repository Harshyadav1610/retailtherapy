'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import { useTheme } from '@/components/ThemeProvider';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: 'HomeIcon' },
  { href: '/product-catalog', label: 'Shop', icon: 'ShoppingBagIcon' },
  { href: '/dashboard#orders', label: 'Orders', icon: 'ClipboardDocumentListIcon' },
  { href: '/dashboard#analytics', label: 'Analytics', icon: 'ChartBarIcon' },
  { href: '/dashboard#wishlist', label: 'Wishlist', icon: 'HeartIcon' },
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

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--background)' }}>
      {/* Sidebar */}
      <aside
        className={`hidden lg:flex flex-col sidebar-transition flex-shrink-0 border-r`}
        style={{
          width: sidebarOpen ? '240px' : '68px',
          background: 'var(--card)',
          borderColor: 'var(--border)',
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-3 px-4 py-5 border-b"
          style={{ borderColor: 'var(--border)', minHeight: '72px' }}
        >
          <AppLogo size={36} />
          {sidebarOpen && (
            <span className="font-bold text-base tracking-tight" style={{ color: 'var(--foreground)' }}>
              RetailTherapy
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            return (
              <Link
                key={`nav-${item.label}`}
                href={item.href}
                title={!sidebarOpen ? item.label : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group relative ${
                  isActive
                    ? 'bg-accent/10 text-accent font-semibold' :'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon
                  name={item.icon as Parameters<typeof Icon>[0]['name']}
                  size={20}
                  className={isActive ? 'text-accent' : 'text-muted-foreground group-hover:text-foreground'}
                />
                {sidebarOpen && (
                  <span className="text-sm">{item.label}</span>
                )}
                {!sidebarOpen && item.label === 'Wishlist' && wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent" />
                )}
                {!sidebarOpen && item.label === 'Orders' && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: 'var(--success)' }} />
                )}
                {sidebarOpen && item.label === 'Wishlist' && wishlistCount > 0 && (
                  <span className="ml-auto badge badge-accent text-xs">{wishlistCount}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="py-4 px-2 border-t flex flex-col gap-1" style={{ borderColor: 'var(--border)' }}>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 text-muted-foreground hover:bg-muted hover:text-foreground w-full"
            title={!sidebarOpen ? (theme === 'dark' ? 'Light Mode' : 'Dark Mode') : undefined}
          >
            <Icon name={theme === 'dark' ? 'SunIcon' : 'MoonIcon'} size={20} />
            {sidebarOpen && <span className="text-sm">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>
          <Link
            href="/dashboard#settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 text-muted-foreground hover:bg-muted hover:text-foreground"
            title={!sidebarOpen ? 'Settings' : undefined}
          >
            <Icon name="Cog6ToothIcon" size={20} />
            {sidebarOpen && <span className="text-sm">Settings</span>}
          </Link>
          {/* User avatar */}
          <div className="flex items-center gap-3 px-3 py-2.5 mt-1">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{ background: 'var(--accent)', color: 'var(--accent-foreground)' }}
            >
              S
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: 'var(--foreground)' }}>Sofia Marchetti</p>
                <p className="text-xs truncate" style={{ color: 'var(--muted-foreground)' }}>sofia@example.com</p>
              </div>
            )}
          </div>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute left-0 bottom-24 translate-x-full w-6 h-10 rounded-r-lg border border-l-0 flex items-center justify-center transition-all duration-150 hover:bg-muted"
          style={{
            background: 'var(--card)',
            borderColor: 'var(--border)',
            marginLeft: sidebarOpen ? '240px' : '68px',
            position: 'fixed',
            zIndex: 10,
          }}
        >
          <Icon
            name={sidebarOpen ? 'ChevronLeftIcon' : 'ChevronRightIcon'}
            size={14}
            className="text-muted-foreground"
          />
        </button>
      </aside>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
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
        <div className="flex items-center justify-between px-4 py-5 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2">
            <AppLogo size={32} />
            <span className="font-bold text-base" style={{ color: 'var(--foreground)' }}>RetailTherapy</span>
          </div>
          <button onClick={() => setMobileMenuOpen(false)}>
            <Icon name="XMarkIcon" size={20} className="text-muted-foreground" />
          </button>
        </div>
        <nav className="flex-1 py-4 px-2 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={`mobile-nav-${item.label}`}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-150 ${
                  isActive ? 'bg-accent/10 text-accent font-semibold' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={20} />
                <span className="text-sm">{item.label}</span>
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
            <Icon name="Bars3Icon" size={22} className="text-muted-foreground" />
          </button>

          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Icon
                name="MagnifyingGlassIcon"
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Search products..."
                className="input-field pl-9 py-2 text-sm"
                style={{ background: 'var(--muted)' }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Cart */}
            <Link
              href="/product-catalog"
              className="relative p-2 rounded-xl transition-all duration-150 hover:bg-muted"
            >
              <Icon name="ShoppingCartIcon" size={20} className="text-muted-foreground" />
              {cartCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-xs font-bold flex items-center justify-center"
                  style={{ background: 'var(--accent)', color: 'var(--accent-foreground)' }}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Notifications */}
            <button className="relative p-2 rounded-xl transition-all duration-150 hover:bg-muted">
              <Icon name="BellIcon" size={20} className="text-muted-foreground" />
              <span
                className="absolute top-1 right-1 w-2 h-2 rounded-full"
                style={{ background: 'var(--accent)' }}
              />
            </button>

            {/* Avatar */}
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer"
              style={{ background: 'var(--accent)', color: 'var(--accent-foreground)' }}
            >
              S
            </div>
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