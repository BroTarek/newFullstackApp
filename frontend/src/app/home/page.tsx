"use client"

import React from 'react';
import Link from 'next/link';
import { useCategories } from '@/hooks/useCategories';

const HomePage = () => {
  const { data: categories = [], isLoading } = useCategories();

  return (
    <div className="bg-[#EAEDED] min-h-screen pb-10">
      {/* Hero Section */}
      <div className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#EAEDED] z-10" />
        <img
          src="https://m.media-amazon.com/images/I/61zAjw4bqPL._SX3000_.jpg"
          alt="Hero"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Category Cards Grid */}
      <div className="max-w-[1500px] mx-auto px-4 -mt-80 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-5 h-80 animate-pulse rounded-sm" />
            ))
          ) : (
            categories.slice(0, 8).map((cat: any) => (
              <div key={cat._id} className="bg-white p-5 flex flex-col h-full rounded-sm shadow-sm">
                <h2 className="text-xl font-bold text-[#0f1111] mb-3">{cat.name}</h2>
                <div className="flex-1 overflow-hidden cursor-pointer group">
                  <img
                    src={cat.image || 'https://via.placeholder.com/300'}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <Link
                  href={`/products?category=${cat.name}`}
                  className="text-sm text-[#007185] mt-4 hover:text-[#C45500] hover:underline"
                >
                  Shop now
                </Link>
              </div>
            ))
          )}
        </div>

        {/* Secondary Row (Mixed Content) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <div className="bg-white p-5 flex flex-col rounded-sm shadow-sm lg:col-span-2">
            <h2 className="text-xl font-bold text-[#0f1111] mb-3">Today's Deals</h2>
            <div className="flex-1 bg-gray-50 flex items-center justify-center border border-[#DDD] group cursor-pointer">
              <img src="https://m.media-amazon.com/images/I/41-lVq8XfDL._AC_SY200_.jpg" alt="Deal" className="h-40 object-contain group-hover:scale-110 transition-transform" />
            </div>
            <Link href="/products" className="text-sm text-[#007185] mt-4 hover:underline">See all deals</Link>
          </div>

          <div className="bg-white p-5 flex flex-col rounded-sm shadow-sm">
            <h2 className="text-xl font-bold text-[#0f1111] mb-3">Sign in for your best experience</h2>
            <Link href="/login" className="w-full bg-[#FFD814] hover:bg-[#F7CA00] py-2 rounded-full text-center text-sm font-medium shadow-sm mb-4">
              Sign in securely
            </Link>
            <div className="mt-auto border-t border-[#DDD] pt-4">
              <img src="https://m.media-amazon.com/images/G/01/AmazonOutgoing/1cw_desktop_gateway_signin_EN_1x._CB485946370_.png" alt="" className="w-full" />
            </div>
          </div>

          <div className="bg-white p-5 flex flex-col rounded-sm shadow-sm">
            <h2 className="text-xl font-bold text-[#0f1111] mb-3">Shop Laptops</h2>
            <img src="https://m.media-amazon.com/images/I/71TPda7cwUL._AC_SX466_.jpg" alt="Laptop" className="flex-1 object-contain mb-4" />
            <Link href="/products" className="text-sm text-[#007185] hover:underline">See more</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;