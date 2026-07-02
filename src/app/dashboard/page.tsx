import React from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import AppLayout from '@/components/AppLayout';
import DashboardClient from './components/DashboardClient';

export default function DashboardPage() {
  return (
    <ThemeProvider>
      <AppLayout>
        <DashboardClient />
      </AppLayout>
    </ThemeProvider>
  );
}