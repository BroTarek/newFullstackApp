'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  selectWishListProducts,
  selectWishListStatus,
  selectWishListError,
  clearWishList
} from '@/redux/wishListSlice';
import {
  addToCart,
  deleteProductFromWishList,
  fetchWishListProducts
} from '@/redux/thunk';

const WishListClient = () => {
  const dispatch = useAppDispatch();
  const WishListProducts = useAppSelector(selectWishListProducts);
  const status = useAppSelector(selectWishListStatus);
  const error = useAppSelector(selectWishListError);

  useEffect(() => {
    dispatch(fetchWishListProducts());
  }, [dispatch]);

  if (status === 'loading') {
    return <p className="p-6">Loading your wishlist...</p>;
  }

  if (status === 'failed') {
    return <p className="p-6 text-red-500">Error: {error}</p>;
  }
  const ClearWishList=()=>{
    console.log(WishListProducts.length)
    
    dispatch(clearWishList())
    WishListProducts.forEach((wp:any) => {
      dispatch(deleteProductFromWishList(wp.id))
    });
  }
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-xl font-bold mb-4">My Wishlist</h2>
       <button type='button' onClick={()=>ClearWishList()}>clear</button>
      {WishListProducts?.length === 0 && (
        <p className="text-gray-600">Your wishlist is empty.</p>
      )}

      {WishListProducts?.map((wp: any) => (
        <div key={wp.id} className="border p-4 mb-4 rounded flex gap-4 items-center">
          <img src={wp.imageCover} alt={wp.title} className="w-32 h-32 object-cover" />
          <div>
            <h3 className="font-semibold">{wp.title}</h3>
            <p>${wp.price}</p>
            <button
              className="text-red-500 hover:underline"
              onClick={() => dispatch(deleteProductFromWishList(wp.id))}
            >
              Remove from Wishlist
            </button><button
              className="text-red-500 hover:underline"
              onClick={() =>{ 
                console.log(dispatch(addToCart({productId:wp.id,color:wp.color})))
                }}
            >
              add to cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WishListClient;
