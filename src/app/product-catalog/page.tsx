import React from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import AppLayout from '@/components/AppLayout';
import ProductCatalogClient from './components/ProductCatalogClient';

export default function ProductCatalogPage() {
  return (
    <ThemeProvider>
      <AppLayout>
        <ProductCatalogClient />
      </AppLayout>
    </ThemeProvider>
  );
}