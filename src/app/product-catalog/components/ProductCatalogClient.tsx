'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { PRODUCTS, CATEGORIES, BRANDS, type Product } from '@/lib/products';
import ProductFilters from './ProductFilters';
import ProductGrid from './ProductGrid';
import ProductSearch from './ProductSearch';
import CartDrawer from './CartDrawer';
import Icon from '@/components/ui/AppIcon';
import { useStore } from '@/lib/store';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'reviews';

export interface FilterState {
  categories: string[];
  brands: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
  badges: string[];
}

const DEFAULT_FILTERS: FilterState = {
  categories: [],
  brands: [],
  minPrice: 0,
  maxPrice: 3000,
  minRating: 0,
  badges: [],
};

export default function ProductCatalogClient() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortOption>('featured');
  const [cartOpen, setCartOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const cartCount = useStore((s) => s.getCartCount());

  const filtered = useMemo(() => {
    let result = [...PRODUCTS];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }

    // Brand filter
    if (filters.brands.length > 0) {
      result = result.filter((p) => filters.brands.includes(p.brand));
    }

    // Price filter
    result = result.filter(
      (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
    );

    // Rating filter
    if (filters.minRating > 0) {
      result = result.filter((p) => p.rating >= filters.minRating);
    }

    // Badge filter
    if (filters.badges.length > 0) {
      result = result.filter((p) => p.badge && filters.badges.includes(p.badge));
    }

    // Sort
    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        break;
    }

    return result;
  }, [search, filters, sort]);

  const activeFilterCount =
    filters.categories.length +
    filters.brands.length +
    filters.badges.length +
    (filters.minPrice > 0 ? 1 : 0) +
    (filters.maxPrice < 3000 ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0);

  const clearAllFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setSearch('');
  }, []);

  const removeCategory = useCallback((cat: string) => {
    setFilters((f) => ({ ...f, categories: f.categories.filter((c) => c !== cat) }));
  }, []);

  const removeBrand = useCallback((brand: string) => {
    setFilters((f) => ({ ...f, brands: f.brands.filter((b) => b !== brand) }));
  }, []);

  return (
    <div className="flex h-full relative">
      {/* Filter sidebar — desktop */}
      <aside
        className="hidden lg:block w-64 xl:w-72 flex-shrink-0 border-r overflow-y-auto scrollbar-hide"
        style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
      >
        <ProductFilters
          filters={filters}
          onChange={setFilters}
          categories={[...CATEGORIES]}
          brands={BRANDS}
        />
      </aside>

      {/* Mobile filter drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setFiltersOpen(false)} />
          <div
            className="absolute inset-y-0 left-0 w-80 overflow-y-auto"
            style={{ background: 'var(--card)' }}
          >
            <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--border)' }}>
              <span className="font-bold" style={{ color: 'var(--foreground)' }}>Filters</span>
              <button onClick={() => setFiltersOpen(false)}>
                <Icon name="XMarkIcon" size={20} className="text-muted-foreground" />
              </button>
            </div>
            <ProductFilters
              filters={filters}
              onChange={(f) => { setFilters(f); }}
              categories={[...CATEGORIES]}
              brands={BRANDS}
            />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div
          className="px-5 py-4 border-b flex-shrink-0"
          style={{ borderColor: 'var(--border)', background: 'var(--background)' }}
        >
          <div className="flex items-center gap-3 flex-wrap">
            {/* Mobile filter button */}
            <button
              className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium transition-all duration-150 hover:bg-muted"
              style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
              onClick={() => setFiltersOpen(true)}
            >
              <Icon name="AdjustmentsHorizontalIcon" size={16} />
              Filters
              {activeFilterCount > 0 && (
                <span
                  className="w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center"
                  style={{ background: 'var(--accent)', color: 'var(--accent-foreground)' }}
                >
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Search */}
            <div className="flex-1 min-w-0">
              <ProductSearch value={search} onChange={setSearch} />
            </div>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="input-field py-2 text-sm w-auto min-w-[160px]"
              style={{ background: 'var(--muted)' }}
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="reviews">Most Reviewed</option>
            </select>

            {/* Cart button */}
            <button
              className="relative flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-150 active:scale-95"
              style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
              onClick={() => setCartOpen(true)}
            >
              <Icon name="ShoppingCartIcon" size={16} />
              Cart
              {cartCount > 0 && (
                <span
                  className="w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center"
                  style={{ background: 'var(--accent)', color: 'var(--accent-foreground)' }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Active filter chips */}
          {(activeFilterCount > 0 || search) && (
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                {filtered.length} results
              </span>
              {filters.categories.map((cat) => (
                <button
                  key={`chip-cat-${cat}`}
                  onClick={() => removeCategory(cat)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-150 hover:opacity-80"
                  style={{ background: 'rgba(232,168,124,0.15)', color: 'var(--accent)' }}
                >
                  {cat}
                  <Icon name="XMarkIcon" size={10} />
                </button>
              ))}
              {filters.brands.map((brand) => (
                <button
                  key={`chip-brand-${brand}`}
                  onClick={() => removeBrand(brand)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-150 hover:opacity-80"
                  style={{ background: 'var(--muted)', color: 'var(--muted-foreground)' }}
                >
                  {brand}
                  <Icon name="XMarkIcon" size={10} />
                </button>
              ))}
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs font-medium transition-colors duration-150"
                  style={{ color: 'var(--danger)' }}
                >
                  Clear all
                </button>
              )}
            </div>
          )}
        </div>

        {/* Product grid */}
        <div className="flex-1 overflow-y-auto p-5">
          <ProductGrid products={filtered} onCartOpen={() => setCartOpen(true)} />
        </div>
      </div>

      {/* Cart drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}