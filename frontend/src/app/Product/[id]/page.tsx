"use client"

import React from 'react';
import { useParams } from 'next/navigation';
import { useProduct } from '@/hooks/useProducts';
import StarRating from '@/components/StarRating';
import { useAppDispatch } from '@/redux/store';
import { addToCart } from '@/redux/thunk';
import { toast } from 'react-toastify';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { data: product, isLoading, isError } = useProduct(id as string);

    if (isLoading) return <div className="p-20 text-center text-[#565959]">Loading product details...</div>;
    if (isError || !product) return <div className="p-20 text-center text-red-600">Product not found.</div>;

    const handleAddToCart = () => {
        dispatch(addToCart({ productId: product._id, color: 'auto' }));
        toast.success(`Added ${product.title} to cart`);
    };

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-[1500px] mx-auto p-4 lg:p-10 flex flex-col lg:flex-row gap-10">
                {/* Left Column: Image */}
                <div className="lg:w-2/5 flex flex-col gap-4">
                    <div className="sticky top-10 border border-[#DDD] p-10 rounded-sm">
                        <img
                            src={product.imageCover}
                            alt={product.title}
                            className="w-full h-auto object-contain max-h-[500px]"
                        />
                    </div>
                    {/* Thumbnail placeholder */}
                    <div className="flex gap-2 justify-center">
                        {product.images?.map((img: string, i: number) => (
                            <div key={i} className="w-12 h-12 border border-[#DDD] p-1 rounded-sm cursor-pointer hover:border-[#e77600]">
                                <img src={img} alt="" className="w-full h-full object-contain" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Middle Column: Details */}
                <div className="lg:w-2/5 flex flex-col gap-4">
                    <div className="border-b border-[#DDD] pb-4">
                        <h1 className="text-2xl font-bold text-[#0f1111] mb-1">{product.title}</h1>
                        <p className="text-[#007185] hover:underline cursor-pointer text-sm font-medium">Brand: {product.brand?.name || 'Generic'}</p>
                        <div className="mt-2 flex items-center gap-2">
                            <StarRating rating={product.ratingsAverage} count={product.ratingsQuantity} />
                            <span className="text-sm text-[#565959]">| 100+ answered questions</span>
                        </div>
                    </div>

                    <div className="py-2">
                        <div className="flex items-start gap-1 text-[#565959]">
                            <span className="text-sm">List Price:</span>
                            <span className="text-sm line-through">${(product.price * 1.2).toFixed(2)}</span>
                        </div>
                        <div className="flex items-start gap-1">
                            <span className="text-sm text-[#CC0C39] font-medium">-20%</span>
                            <div className="flex items-start gap-0.5">
                                <span className="text-sm font-medium mt-1">$</span>
                                <span className="text-2xl font-bold">{Math.floor(product.price)}</span>
                                <span className="text-sm font-medium mt-1">{(product.price % 1).toFixed(2).split('.')[1]}</span>
                            </div>
                        </div>
                        <p className="text-sm text-[#565959] mt-1">FREE Returns</p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold text-sm">About this item</h3>
                        <p className="text-sm text-[#0f1111] leading-relaxed">
                            {product.description}
                        </p>
                    </div>
                </div>

                {/* Right Column: Buy Box */}
                <div className="lg:w-1/5">
                    <div className="border border-[#DDD] p-4 rounded-sm flex flex-col gap-4 sticky top-10">
                        <div className="flex items-start gap-0.5">
                            <span className="text-sm font-medium mt-1">$</span>
                            <span className="text-2xl font-bold">{Math.floor(product.price)}</span>
                            <span className="text-sm font-medium mt-1">{(product.price % 1).toFixed(2).split('.')[1]}</span>
                        </div>
                        <p className="text-sm text-[#565959]">FREE delivery <b>Tomorrow, Jan 23</b>. Order within <span className="text-[#007600]">12 hrs 14 mins</span></p>

                        <div className="text-xs flex items-center gap-1">
                            <span className="text-[#007185] hover:underline cursor-pointer flex items-center gap-1">
                                <span className="h-4 w-4 bg-[#007185] rounded-full inline-block"></span> Deliver to Egypt
                            </span>
                        </div>

                        <div className="text-lg text-[#007600] font-medium">In Stock</div>

                        <div className="space-y-2">
                            <button
                                onClick={handleAddToCart}
                                className="w-full bg-[#FFD814] hover:bg-[#F7CA00] py-2 rounded-full text-sm font-medium shadow-sm transition-colors"
                            >
                                Add to Cart
                            </button>
                            <button className="w-full bg-[#FFA41C] hover:bg-[#FA8914] py-2 rounded-full text-sm font-medium shadow-sm transition-colors">
                                Buy Now
                            </button>
                        </div>

                        <div className="text-xs text-[#565959] flex flex-col gap-1">
                            <div className="flex justify-between">
                                <span>Ships from</span>
                                <span className="text-[#0f1111]">amazonclone.com</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Sold by</span>
                                <span className="text-[#0f1111]">amazonclone.com</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Returns</span>
                                <span className="text-[#007185] hover:underline cursor-pointer">Eligible for Return, Refund or Replacement within 30 days of receipt</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
