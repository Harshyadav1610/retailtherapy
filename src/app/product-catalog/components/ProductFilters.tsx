'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import type { FilterState } from './ProductCatalogClient';

interface ProductFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  categories: string[];
  brands: string[];
}

const RATINGS = [4.5, 4.0, 3.5, 3.0];
const BADGES = ['New Arrival', 'Bestseller', 'Sale', 'Limited'];
const PRICE_PRESETS = [
  { label: 'Under $50', min: 0, max: 50 },
  { label: '$50 – $200', min: 50, max: 200 },
  { label: '$200 – $500', min: 200, max: 500 },
  { label: '$500+', min: 500, max: 3000 },
];

function FilterSection({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b" style={{ borderColor: 'var(--border)' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 transition-colors duration-150"
      >
        <span className="tracking-editorial" style={{ color: 'var(--foreground)', fontSize: '0.65rem' }}>{title}</span>
        <Icon
          name={open ? 'MinusIcon' : 'PlusIcon'}
          size={12}
          className="text-muted-foreground"
        />
      </button>
      {open && <div className="px-5 pb-5">{children}</div>}
    </div>
  );
}

export default function ProductFilters({ filters, onChange, categories, brands }: ProductFiltersProps) {
  const toggleCategory = (cat: string) => {
    const next = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    onChange({ ...filters, categories: next });
  };

  const toggleBrand = (brand: string) => {
    const next = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onChange({ ...filters, brands: next });
  };

  const toggleBadge = (badge: string) => {
    const next = filters.badges.includes(badge)
      ? filters.badges.filter((b) => b !== badge)
      : [...filters.badges, badge];
    onChange({ ...filters, badges: next });
  };

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.brands.length > 0 ||
    filters.badges.length > 0 ||
    filters.minPrice > 0 ||
    filters.maxPrice < 3000 ||
    filters.minRating > 0;

  return (
    <div>
      {/* Header */}
      <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
        <span className="tracking-editorial" style={{ color: 'var(--foreground)', fontSize: '0.65rem' }}>Refine</span>
        {hasActiveFilters && (
          <button
            onClick={() => onChange({ categories: [], brands: [], minPrice: 0, maxPrice: 3000, minRating: 0, badges: [] })}
            className="tracking-editorial transition-colors duration-150 hover:opacity-60"
            style={{ color: 'var(--muted-foreground)', fontSize: '0.6rem' }}
          >
            Clear All
          </button>
        )}
      </div>

      {/* Category */}
      <FilterSection title="Category">
        <div className="flex flex-col gap-2.5">
          {categories.map((cat) => (
            <label
              key={`filter-cat-${cat}`}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div
                className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0 transition-all duration-150"
                style={{
                  border: `1px solid ${filters.categories.includes(cat) ? 'var(--foreground)' : 'var(--border)'}`,
                  background: filters.categories.includes(cat) ? 'var(--foreground)' : 'transparent',
                }}
                onClick={() => toggleCategory(cat)}
              >
                {filters.categories.includes(cat) && (
                  <Icon name="CheckIcon" size={8} style={{ color: 'var(--background)' } as React.CSSProperties} />
                )}
              </div>
              <span
                className="text-xs transition-colors duration-150 cursor-pointer"
                style={{ color: filters.categories.includes(cat) ? 'var(--foreground)' : 'var(--muted-foreground)', fontWeight: 300 }}
                onClick={() => toggleCategory(cat)}
              >
                {cat}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Price */}
      <FilterSection title="Price">
        <div className="flex flex-col gap-1.5 mb-4">
          {PRICE_PRESETS.map((preset) => {
            const active = filters.minPrice === preset.min && filters.maxPrice === preset.max;
            return (
              <button
                key={`price-preset-${preset.label}`}
                onClick={() => onChange({ ...filters, minPrice: preset.min, maxPrice: preset.max })}
                className="flex items-center justify-between py-2 text-left transition-all duration-150"
              >
                <span
                  className="text-xs"
                  style={{
                    color: active ? 'var(--foreground)' : 'var(--muted-foreground)',
                    fontWeight: active ? 500 : 300,
                  }}
                >
                  {preset.label}
                </span>
                {active && (
                  <div className="w-1.5 h-1.5" style={{ background: 'var(--foreground)' }} />
                )}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) => onChange({ ...filters, minPrice: Number(e.target.value) })}
            placeholder="Min"
            className="input-field py-2 text-xs w-full"
            min={0}
            max={filters.maxPrice}
          />
          <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>–</span>
          <input
            type="number"
            value={filters.maxPrice}
            onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
            placeholder="Max"
            className="input-field py-2 text-xs w-full"
            min={filters.minPrice}
            max={10000}
          />
        </div>
      </FilterSection>

      {/* Rating */}
      <FilterSection title="Rating">
        <div className="flex flex-col gap-2">
          {RATINGS.map((rating) => (
            <button
              key={`rating-${rating}`}
              onClick={() => onChange({ ...filters, minRating: filters.minRating === rating ? 0 : rating })}
              className="flex items-center gap-3 py-1.5 w-full text-left transition-all duration-150"
            >
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div
                    key={`rating-star-${rating}-${s}`}
                    className="w-1.5 h-1.5"
                    style={{ background: s <= Math.floor(rating) ? 'var(--foreground)' : 'var(--border)' }}
                  />
                ))}
              </div>
              <span
                className="text-xs"
                style={{
                  color: filters.minRating === rating ? 'var(--foreground)' : 'var(--muted-foreground)',
                  fontWeight: filters.minRating === rating ? 500 : 300,
                }}
              >
                {rating}+ stars
              </span>
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Brand */}
      <FilterSection title="Brand" defaultOpen={false}>
        <div className="flex flex-col gap-2.5 max-h-48 overflow-y-auto scrollbar-hide">
          {brands.map((brand) => (
            <label
              key={`filter-brand-${brand}`}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div
                className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0 transition-all duration-150"
                style={{
                  border: `1px solid ${filters.brands.includes(brand) ? 'var(--foreground)' : 'var(--border)'}`,
                  background: filters.brands.includes(brand) ? 'var(--foreground)' : 'transparent',
                }}
                onClick={() => toggleBrand(brand)}
              >
                {filters.brands.includes(brand) && (
                  <Icon name="CheckIcon" size={8} style={{ color: 'var(--background)' } as React.CSSProperties} />
                )}
              </div>
              <span
                className="text-xs cursor-pointer"
                style={{ color: filters.brands.includes(brand) ? 'var(--foreground)' : 'var(--muted-foreground)', fontWeight: 300 }}
                onClick={() => toggleBrand(brand)}
              >
                {brand}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Badge / Tag */}
      <FilterSection title="Tags" defaultOpen={false}>
        <div className="flex flex-col gap-2">
          {BADGES.map((badge) => {
            const active = filters.badges.includes(badge);
            return (
              <button
                key={`badge-filter-${badge}`}
                onClick={() => toggleBadge(badge)}
                className="flex items-center gap-3 py-1.5 text-left transition-all duration-150"
              >
                <div
                  className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0"
                  style={{
                    border: `1px solid ${active ? 'var(--foreground)' : 'var(--border)'}`,
                    background: active ? 'var(--foreground)' : 'transparent',
                  }}
                >
                  {active && <Icon name="CheckIcon" size={8} style={{ color: 'var(--background)' } as React.CSSProperties} />}
                </div>
                <span
                  className="text-xs"
                  style={{ color: active ? 'var(--foreground)' : 'var(--muted-foreground)', fontWeight: active ? 500 : 300 }}
                >
                  {badge}
                </span>
              </button>
            );
          })}
        </div>
      </FilterSection>
    </div>
  );
}