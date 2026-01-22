'use client';

import { useAppDispatch, useAppSelector } from '@/redux/store';
import { selectCartProducts, selectCartStatus, selectCartError } from '@/redux/cartSlice';
import { fetchCartProducts } from '@/redux/thunk';
import { useEffect } from 'react';
import CartItemWrapper from './CartItemWrapper';
import CartLayout from './CartLayout';

export default function CartPage() {
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector(selectCartProducts);
  const status = useAppSelector(selectCartStatus);
  const error = useAppSelector(selectCartError);

  useEffect(() => {
    dispatch(fetchCartProducts());
  }, [dispatch]);

  if (status === 'loading') return <CartLayout><p>Loading your Cart...</p></CartLayout>;
  if (status === 'failed') return <CartLayout><p className="text-red-500">Error: {error}</p></CartLayout>;
  if (cartProducts.length === 0) return <CartLayout><p>Your cart is empty.</p></CartLayout>;

  return (
    <CartLayout>
      <div className="space-y-4">
        {cartProducts.map((item) => (
          <CartItemWrapper key={item._id} itemId={item._id} />
        ))}
      </div>
    </CartLayout>
  );
}