"use client"

import React, { useState } from 'react'
import { useParams } from 'next/navigation';
import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import AmazonProductCard from './AmazonProductCard';
import StarRating from './StarRating';

const ProductsPage = () => {
  const param = useParams();
  const [sortingOptions, setSortingOptions] = useState("price");
  const { data: categories = [] } = useCategories();

  let categoryName = param.CategoryID?.toString().replace("%26", "&") || "";

  const { data: products = [], isLoading, isError } = useProducts({
    category: categoryName,
    sort: sortingOptions
  });

  const sortingFields = [
    { label: "Price: Low to High", value: "price" },
    { label: "Price: High to Low", value: "-price" },
    { label: "Best Selling", value: "-sold" },
    { label: "Top Rated", value: "-ratingsAverage" },
  ];

  if (isLoading) return <div className="p-10 text-center text-[#565959]">Loading results...</div>;
  if (isError) return <div className="p-10 text-center text-red-600">Failed to load result. Please refresh.</div>;

  return (
    <div className="max-w-[1500px] mx-auto flex gap-6 px-4 py-6 bg-[#EAEDED] min-h-screen">
      {/* Sidebar - Filters */}
      <aside className="w-[240px] flex-shrink-0 hidden md:block border-r border-gray-300 pr-4">
        <div className="space-y-6">
          {/* Department */}
          <div>
            <h3 className="text-sm font-bold text-[#0f1111] mb-2">Department</h3>
            <ul className="space-y-1">
              <li className="text-sm font-bold text-[#0f1111] italic cursor-pointer">{categoryName || "Any Department"}</li>
              {categories.slice(0, 10).map((cat: any) => (
                <li key={cat._id} className="text-sm text-[#0f1111] hover:text-[#C45500] cursor-pointer ml-3">{cat.name}</li>
              ))}
            </ul>
          </div>

          {/* Customer Review */}
          <div>
            <h3 className="text-sm font-bold text-[#0f1111] mb-2">Average Customer Review</h3>
            <div className="space-y-2">
              {[4, 3, 2, 1].map(rating => (
                <div key={rating} className="flex items-center gap-1 group cursor-pointer">
                  <StarRating rating={rating} />
                  <span className="text-sm text-[#0f1111] group-hover:text-[#C45500]">& Up</span>
                </div>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <h3 className="text-sm font-bold text-[#0f1111] mb-2">Price</h3>
            <ul className="space-y-1 text-sm text-[#0f1111]">
              <li className="hover:text-[#C45500] cursor-pointer">Under $25</li>
              <li className="hover:text-[#C45500] cursor-pointer">$25 to $50</li>
              <li className="hover:text-[#C45500] cursor-pointer">$50 to $100</li>
              <li className="hover:text-[#C45500] cursor-pointer">$100 & Above</li>
            </ul>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="bg-white border border-[#DDD] p-4 flex justify-between items-center mb-4 rounded shadow-sm">
          <div className="text-sm text-[#565959]">
            {products.length} results for <span className="text-[#C45500] font-bold">"{categoryName || "All Products"}"</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#565959]">Sort by:</span>
            <select
              value={sortingOptions}
              onChange={(e) => setSortingOptions(e.target.value)}
              className="bg-[#F0F2F2] border border-[#D5D9D9] rounded-md px-2 py-1 text-xs focus:ring-1 focus:ring-[#007185] outline-none shadow-sm"
            >
              {sortingFields.map(field => (
                <option key={field.value} value={field.value}>{field.label}</option>
              ))}
            </select>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="bg-white border border-[#DDD] p-12 text-center text-[#565959] rounded shadow-sm">
            <h2 className="text-xl font-bold mb-2">No results found</h2>
            <p className="text-sm text-gray-400">Try checking your spelling or use more general terms</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
              <AmazonProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductsPage;
