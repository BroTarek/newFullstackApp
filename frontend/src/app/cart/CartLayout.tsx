'use client';

import { useAppDispatch, useAppSelector } from '@/redux/store';
import { clearCart, selectTotalCartPrice, selectCartProducts } from '@/redux/cartSlice';
import Link from 'next/link';

export default function CartLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const totalCartPrice = useAppSelector(selectTotalCartPrice);
  const cartProducts = useAppSelector(selectCartProducts);

  return (
    <div className="bg-[#EAEDED] min-h-screen py-8">
      <div className="max-w-[1500px] mx-auto px-4 flex flex-col lg:flex-row gap-6">
        {/* Left Column: Cart Items */}
        <div className="flex-1 bg-white p-6 shadow-sm rounded-sm">
          <div className="flex justify-between items-end border-b border-[#DDD] pb-2 mb-4">
            <h1 className="text-3xl font-medium text-[#0f1111]">Shopping Cart</h1>
            <span className="text-sm text-[#565959] hidden md:block">Price</span>
          </div>

          {children}

          {cartProducts.length > 0 && (
            <div className="mt-4 flex flex-col items-end gap-2">
              <div className="text-right">
                <span className="text-lg">Subtotal ({cartProducts.length} items): </span>
                <span className="text-lg font-bold">${totalCartPrice.toFixed(2)}</span>
              </div>
              <button
                className="text-sm text-[#007185] hover:underline"
                onClick={() => dispatch(clearCart())}
              >
                Deselect all items
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Checkout Box */}
        {cartProducts.length > 0 && (
          <aside className="lg:w-[300px] flex-shrink-0">
            <div className="bg-white p-5 shadow-sm rounded-sm flex flex-col gap-4 sticky top-10">
              <div className="flex items-start gap-1">
                <div className="bg-[#007600] rounded-full p-0.5 mt-1">
                  <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-[#007600] text-xs">Your order qualifies for FREE Shipping. Choose this option at checkout.</p>
              </div>

              <div>
                <span className="text-lg">Subtotal ({cartProducts.length} items): </span>
                <span className="text-lg font-bold">${totalCartPrice.toFixed(2)}</span>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="gift" className="h-4 w-4" />
                <label htmlFor="gift" className="text-sm text-[#0f1111]">This order contains a gift</label>
              </div>

              <button className="w-full bg-[#FFD814] hover:bg-[#F7CA00] py-2 rounded-full text-sm font-medium shadow-sm border border-[#FCD200]">
                Proceed to checkout
              </button>

              <div className="border border-[#DDD] p-3 rounded-md mt-2 group cursor-pointer">
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Recently viewed</span>
                  <span className="text-[#007185]">Manage</span>
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}