'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    if (typeof window !== 'undefined') {
      window.history?.back();
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-8"
      style={{ background: 'var(--background)' }}
    >
      <div className="text-center max-w-lg">
        {/* Brand */}
        <p className="elan-logo text-2xl mb-16" style={{ color: 'var(--foreground)' }}>
          Élan
        </p>

        {/* 404 */}
        <p
          className="font-display mb-4"
          style={{
            fontSize: 'clamp(6rem, 15vw, 12rem)',
            lineHeight: 1,
            color: 'var(--muted)',
            fontWeight: 300,
            fontStyle: 'italic',
          }}
        >
          404
        </p>

        <p className="tracking-editorial mb-3" style={{ color: 'var(--muted-foreground)', fontSize: '0.65rem' }}>
          Page Not Found
        </p>

        <h2
          className="font-display mb-6"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 300, color: 'var(--foreground)', fontStyle: 'italic' }}
        >
          This page doesn't exist
        </h2>

        <p className="text-sm mb-10" style={{ color: 'var(--muted-foreground)', fontWeight: 300, maxWidth: '320px', margin: '0 auto 2.5rem' }}>
          The page you're looking for may have moved or no longer exists. Let's get you back to the collection.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleGoBack}
            className="btn-outline"
          >
            Go Back
          </button>
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}