'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  selectCartProducts,
  selectCartStatus,
  selectCartError,
  selectTotalCartPrice,
  clearCart,
} from '@/redux/cartSlice';
import {
  fetchCartProducts,
  removeFromCart,
  updateCartItemQuantity,
} from '@/redux/thunk';

const CartClient = () => {
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector(selectCartProducts);
  const totalCartPrice = useAppSelector(selectTotalCartPrice);
  const status = useAppSelector(selectCartStatus);
  const error = useAppSelector(selectCartError);

  useEffect(() => {
    dispatch(fetchCartProducts());
    
  }, [dispatch]);

  if (status === 'loading') return <p className="p-6">Loading your Cart...</p>;
  if (status === 'failed') return <p className="p-6 text-red-500">Error: {error}</p>;
  console.log(cartProducts)
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-xl font-bold mb-4">My Cart</h2>
      <button className="mb-4 bg-red-500 text-white px-3 py-1 rounded" onClick={() => dispatch(clearCart())}>
        Clear Cart
      </button>
      <h2 className="text-xl font-bold mb-4">Total: ${totalCartPrice.toFixed(2)}</h2>

      {cartProducts.length === 0 && <p className="text-gray-600">Your Cart is empty.</p>}

      {cartProducts.map((item: any) => (
        <div key={item._id} className="border p-4 mb-4 rounded flex gap-4 items-center">
          <img
            src={item.product.imageCover}
            alt={item.product.title}
            className="w-32 h-32 object-cover"
          />
          <div>
            <h3 className="font-semibold">{item.product.title}</h3>
            <p>${item.price}</p>

            <button
              className="bg-red-500 text-white px-2 py-1 rounded mt-2"
              onClick={() => dispatch(removeFromCart({ itemId: item._id }))}
            >
              Remove
            </button>

            <div className="mt-2">
              <label htmlFor={`quantity-${item._id}`} className="mr-2">Qty:</label>
              <input
                type="number"
                id={`quantity-${item._id}`}
                value={item.quantity}
                min={1}
                onChange={(e) =>
                  dispatch(updateCartItemQuantity({
                    quantity: Number(e.target.value),
                    itemId: item._id
                  }))
                }
                className="border p-1 w-16"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartClient;
