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
        size={14}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
      />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search pieces, brands, categories..."
        className="input-field pl-10 pr-9 py-3 text-xs"
        style={{ borderRadius: '0' }}
      />
      {value && (
        <button
          onClick={() => { onChange(''); inputRef.current?.focus(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 transition-opacity duration-150 hover:opacity-60"
        >
          <Icon name="XMarkIcon" size={12} className="text-muted-foreground" />
        </button>
      )}
    </div>
  );
}