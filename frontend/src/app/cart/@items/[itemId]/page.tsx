'use client';

import { use } from 'react';
import { makeSelectCartItemById } from '@/redux/cartSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { updateCartItemQuantity, removeFromCart } from '@/redux/thunk';
import Link from 'next/link';

export default function CartItemPage({ params }: { params: Promise<{ itemId: string }> }) {
  const { itemId } = use(params);
  const dispatch = useAppDispatch();
  const selectItem = makeSelectCartItemById(itemId);
  const item = useAppSelector(selectItem);

  if (!item) return null;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newQuantity = Number(e.target.value);
    if (newQuantity > 0) {
      dispatch(updateCartItemQuantity({
        quantity: newQuantity,
        itemId: itemId
      }));
    }
  };

  return (
    <div className="border-b border-[#DDD] py-4 flex flex-col md:flex-row gap-4 last:border-0">
      {/* Product Image */}
      <Link href={`/product/${item.product._id}`} className="w-44 h-44 flex-shrink-0 cursor-pointer">
        <img
          src={item.product.imageCover}
          alt={item.product.title}
          className="w-full h-full object-contain"
        />
      </Link>

      {/* Product Details */}
      <div className="flex-1 flex flex-col gap-1">
        <Link href={`/product/${item.product._id}`} className="text-lg font-medium text-[#007185] hover:text-[#C45500] hover:underline cursor-pointer line-clamp-2">
          {item.product.title}
        </Link>
        <p className="text-xs text-[#007600] font-medium">In Stock</p>
        <p className="text-xs text-[#565959]">Eligible for FREE Shipping & FREE Returns</p>

        <div className="flex items-center gap-2 mt-2">
          <input type="checkbox" defaultChecked className="h-4 w-4" />
          <span className="text-xs text-[#0f1111]">This is a gift <span className="text-[#007185] hover:underline cursor-pointer">Learn more</span></span>
        </div>

        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center bg-[#F0F2F2] border border-[#D5D9D9] rounded-lg shadow-sm px-2 py-1 cursor-pointer hover:bg-[#E3E6E6]">
            <label htmlFor={`qty-${itemId}`} className="text-xs bg-transparent">Qty:</label>
            <select
              id={`qty-${itemId}`}
              value={item.quantity}
              onChange={handleQuantityChange}
              className="bg-transparent text-xs font-medium outline-none ml-1"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>
          <span className="text-gray-300">|</span>
          <button
            className="text-xs text-[#007185] hover:underline"
            onClick={() => dispatch(removeFromCart({ itemId: itemId }))}
          >
            Delete
          </button>
          <span className="text-gray-300">|</span>
          <button className="text-xs text-[#007185] hover:underline">Save for later</button>
          <span className="text-gray-300">|</span>
          <button className="text-xs text-[#007185] hover:underline">Compare with similar items</button>
        </div>
      </div>

      {/* Product Price */}
      <div className="flex flex-col items-end min-w-[100px]">
        <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
      </div>
    </div>
  );
}