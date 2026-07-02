'use client';

import React, { useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ProductSearch({ value, onChange }: ProductSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative">
      <Icon
        name="MagnifyingGlassIcon"
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
      />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products, brands, categories..."
        className="input-field pl-9 pr-9 py-2 text-sm"
      />
      {value && (
        <button
          onClick={() => { onChange(''); inputRef.current?.focus(); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity duration-150 hover:opacity-70"
        >
          <Icon name="XMarkIcon" size={14} className="text-muted-foreground" />
        </button>
      )}
    </div>
  );
}