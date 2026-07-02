'use client';

import React from 'react';
import SavingsHeroCard from './SavingsHeroCard';
import KPICards from './KPICards';
import WeeklySavingsChart from './WeeklySavingsChart';
import RecentOrders from './RecentOrders';
import CategoryShortcuts from './CategoryShortcuts';

export default function DashboardClient() {
  return (
    <div className="p-6 xl:p-8 max-w-screen-2xl mx-auto">
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>
          Good morning, Sofia ☀️
        </h1>
        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
          You&apos;ve saved <strong style={{ color: 'var(--success)' }}>$2,847</strong> by shopping here instead of real stores. Keep going!
        </p>
      </div>

      {/* Bento grid: hero + 4 KPI cards
          Plan: 5 cards → grid-cols-4
          Row 1: hero spans 2 cols + 2 regular
          Row 2: 3 regular cards (last spans 2 to fill)
          Actually: hero (col-span-2) + streak + orders on row 1
                    wishlist + this month (col-span-2) + ... 
          Revised: hero col-span-2, 2 cards on row 1; 3 cards row 2 with one spanning 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
        {/* Hero savings — spans 2 cols */}
        <div className="md:col-span-2 xl:col-span-2">
          <SavingsHeroCard />
        </div>
        <KPICards />
      </div>

      {/* Charts + orders row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-6">
        <div className="xl:col-span-2">
          <WeeklySavingsChart />
        </div>
        <div>
          <RecentOrders />
        </div>
      </div>

      {/* Category shortcuts */}
      <CategoryShortcuts />
    </div>
  );
}