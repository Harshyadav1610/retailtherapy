import React from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import AppLayout from '@/components/AppLayout';
import ProductDetailClient from '../components/ProductDetailClient';
import { PRODUCTS } from '@/lib/products';

interface PageProps {
  params: Promise<{ productId: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { productId } = await params;
  const product = PRODUCTS.find((p) => p.id === productId) ?? PRODUCTS[0];
  const related = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
  const recommended = PRODUCTS.filter((p) => p.id !== product.id && p.gender === product.gender && p.category !== product.category).slice(0, 4);

  return (
    <ThemeProvider>
      <AppLayout>
        <ProductDetailClient product={product} related={related} recommended={recommended} />
      </AppLayout>
    </ThemeProvider>
  );
}
