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
        className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold transition-colors duration-150 hover:bg-muted/50"
        style={{ color: 'var(--foreground)' }}
      >
        {title}
        <Icon
          name={open ? 'ChevronUpIcon' : 'ChevronDownIcon'}
          size={16}
          className="text-muted-foreground"
        />
      </button>
      {open && <div className="px-5 pb-4">{children}</div>}
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
        <span className="font-bold text-sm" style={{ color: 'var(--foreground)' }}>Filters</span>
        {hasActiveFilters && (
          <button
            onClick={() => onChange({ categories: [], brands: [], minPrice: 0, maxPrice: 3000, minRating: 0, badges: [] })}
            className="text-xs font-medium"
            style={{ color: 'var(--danger)' }}
          >
            Reset all
          </button>
        )}
      </div>

      {/* Category */}
      <FilterSection title="Category">
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <label
              key={`filter-cat-${cat}`}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.categories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="w-4 h-4 rounded"
                style={{ accentColor: 'var(--accent)' }}
              />
              <span
                className="text-sm transition-colors duration-150"
                style={{ color: filters.categories.includes(cat) ? 'var(--foreground)' : 'var(--muted-foreground)' }}
              >
                {cat}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Price */}
      <FilterSection title="Price Range">
        <div className="flex flex-col gap-2 mb-4">
          {PRICE_PRESETS.map((preset) => {
            const active = filters.minPrice === preset.min && filters.maxPrice === preset.max;
            return (
              <button
                key={`price-preset-${preset.label}`}
                onClick={() => onChange({ ...filters, minPrice: preset.min, maxPrice: preset.max })}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all duration-150"
                style={{
                  background: active ? 'rgba(232,168,124,0.15)' : 'transparent',
                  color: active ? 'var(--accent)' : 'var(--muted-foreground)',
                  border: `1px solid ${active ? 'var(--accent)' : 'transparent'}`,
                  fontWeight: active ? 600 : 400,
                }}
              >
                <span>{preset.label}</span>
                {active && <Icon name="CheckIcon" size={14} />}
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
      <FilterSection title="Minimum Rating">
        <div className="flex flex-col gap-2">
          {RATINGS.map((rating) => (
            <button
              key={`rating-${rating}`}
              onClick={() => onChange({ ...filters, minRating: filters.minRating === rating ? 0 : rating })}
              className="flex items-center gap-2 px-2 py-1.5 rounded-xl transition-all duration-150 hover:bg-muted/50 w-full text-left"
              style={{ background: filters.minRating === rating ? 'rgba(245,158,11,0.1)' : 'transparent' }}
            >
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Icon
                    key={`rating-star-${rating}-${s}`}
                    name="StarIcon"
                    size={12}
                    className={s <= Math.floor(rating) ? 'star-filled' : 'star-empty'}
                  />
                ))}
              </div>
              <span className="text-xs font-medium" style={{ color: 'var(--foreground)' }}>
                {rating}+ stars
              </span>
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Brand */}
      <FilterSection title="Brand" defaultOpen={false}>
        <div className="flex flex-col gap-2 max-h-48 overflow-y-auto scrollbar-hide">
          {brands.map((brand) => (
            <label
              key={`filter-brand-${brand}`}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="w-4 h-4 rounded"
                style={{ accentColor: 'var(--accent)' }}
              />
              <span
                className="text-sm"
                style={{ color: filters.brands.includes(brand) ? 'var(--foreground)' : 'var(--muted-foreground)' }}
              >
                {brand}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Badge / Tag */}
      <FilterSection title="Product Tags" defaultOpen={false}>
        <div className="flex flex-wrap gap-2">
          {BADGES.map((badge) => {
            const active = filters.badges.includes(badge);
            return (
              <button
                key={`badge-filter-${badge}`}
                onClick={() => toggleBadge(badge)}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150"
                style={{
                  background: active ? 'var(--accent)' : 'var(--muted)',
                  color: active ? 'var(--accent-foreground)' : 'var(--muted-foreground)',
                }}
              >
                {badge}
              </button>
            );
          })}
        </div>
      </FilterSection>
    </div>
  );
}