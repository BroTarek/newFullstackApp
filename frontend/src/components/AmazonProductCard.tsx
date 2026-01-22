"use client"

import React from 'react';
import Image from 'next/image';
import { useAppDispatch } from '@/redux/store';
import { addToCart } from '@/redux/thunk';
import { Product } from '@/types';
import StarRating from './StarRating';
import { toast } from 'react-toastify';

interface AmazonProductCardProps {
    product: Product;
}

const AmazonProductCard = ({ product }: AmazonProductCardProps) => {
    const dispatch = useAppDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart({ productId: product._id, color: 'auto' }));
        toast.success(`Added ${product.title} to cart`);
    };

    return (
        <div className="bg-white border border-[#DDD] hover:border-[#e77600] group flex flex-col h-full rounded shadow-sm hover:shadow-md transition-all">
            {/* Image Container */}
            <div className="h-64 p-4 flex items-center justify-center bg-white">
                <div className="relative w-full h-full">
                    <img
                        src={product.imageCover}
                        alt={product.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1 border-t border-[#DDD]">
                <h3 className="text-sm font-medium text-[#0f1111] line-clamp-2 h-10 mb-1 group-hover:text-[#C45500] cursor-pointer">
                    {product.title}
                </h3>

                {/* Rating */}
                <div className="mb-1">
                    <StarRating rating={product.ratingsAverage} count={product.ratingsQuantity} />
                </div>

                {/* Price */}
                <div className="flex items-start gap-0.5 mb-2">
                    <span className="text-xs font-medium mt-1">$</span>
                    <span className="text-2xl font-bold">{Math.floor(product.price)}</span>
                    <span className="text-xs font-medium mt-1">{(product.price % 1).toFixed(2).split('.')[1]}</span>
                </div>

                {/* Prime Mock */}
                <div className="flex items-center gap-1 mb-3">
                    <span className="bg-[#00A8E1] text-white text-[10px] font-bold px-1 rounded-sm italic">prime</span>
                    <span className="text-xs text-[#565959]">Get it as soon as Tomorrow</span>
                </div>

                {/* Button */}
                <button
                    onClick={handleAddToCart}
                    className="mt-auto w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-full py-1.5 text-xs font-medium text-[#0f1111] shadow-sm active:shadow-inner"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default AmazonProductCard;
