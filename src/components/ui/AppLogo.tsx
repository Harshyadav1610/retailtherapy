'use client';

import React, { memo } from 'react';


interface AppLogoProps {
  src?: string;
  iconName?: string;
  size?: number;
  className?: string;
  onClick?: () => void;
}

const AppLogo = memo(function AppLogo({
  size = 64,
  className = '',
  onClick,
}: AppLogoProps) {
  const fontSize = size > 48 ? '1.5rem' : size > 32 ? '1.1rem' : '0.9rem';

  return (
    <div
      className={`flex items-center ${onClick ? 'cursor-pointer hover:opacity-70 transition-opacity' : ''} ${className}`}
      onClick={onClick}
    >
      <span
        className="elan-logo"
        style={{ fontSize, color: 'var(--foreground)' }}
      >
        Élan
      </span>
    </div>
  );
});

export default AppLogo;
