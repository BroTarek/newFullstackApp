'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const CartItemRoute = dynamic(() => import('./@items/[itemId]/page'), { 
  ssr: false,
  loading: () => <div className="border p-4 rounded">Loading item...</div>
});

export default function CartItemWrapper({ itemId }: { itemId: string }) {
  return (
    <Suspense fallback={<div className="border p-4 rounded">Loading item...</div>}>
      <CartItemRoute params={{ itemId }} />
    </Suspense>
  );
}