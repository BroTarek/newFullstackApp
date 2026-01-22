'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const CartItemRoute = dynamic(() => import('./@items/[itemId]/CartItem'), {
  ssr: false,
  loading: () => <div className="border-[#DDD] border-b p-4 min-h-[170px] animate-pulse">Loading item...</div>
});

export default function CartItemWrapper({ itemId }: { itemId: string }) {
  return (
    <Suspense fallback={<div className="border-[#DDD] border-b p-4 min-h-[170px] animate-pulse">Loading item...</div>}>
      <CartItemRoute params={{ itemId }} />
    </Suspense>
  );
}