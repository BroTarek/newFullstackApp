"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCategories } from '@/hooks/useCategories';
import { ShoppingCartIcon, MagnifyingGlassIcon, MapPinIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const AmazonHeader = () => {
    const { data: categories } = useCategories();
    const cartItems = useSelector((state: RootState) => state.Cart.itemIds);
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <header className="flex flex-col text-white font-sans">
            {/* Top Nav */}
            <div className="bg-[#131921] px-4 py-2 flex items-center gap-4 h-15">
                {/* Logo */}
                <Link href="/home" className="flex items-center p-2 border border-transparent hover:border-white rounded-sm transition-all h-full">
                    <span className="text-2xl font-bold italic">amazon<span className="text-[#FF9900]">clone</span></span>
                </Link>

                {/* Deliver To */}
                <div className="hidden lg:flex flex-col p-2 border border-transparent hover:border-white rounded-sm cursor-pointer whitespace-nowrap">
                    <span className="text-[#CCC] text-xs leading-tight ml-5">Deliver to</span>
                    <div className="flex items-center gap-1">
                        <MapPinIcon className="h-5 w-5" />
                        <span className="text-sm font-bold">Egypt</span>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="flex flex-1 items-center h-10 group relative">
                    <div className="bg-[#f3f3f3] text-[#555] h-full flex items-center px-3 rounded-l-md border-r border-gray-300 cursor-pointer hover:bg-[#dadada] text-sm">
                        All
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search Amazon"
                        className="flex-1 h-full px-4 outline-none text-black text-base"
                    />
                    <button className="bg-[#FF9900] hover:bg-[#fa8200] h-full px-5 rounded-r-md flex items-center justify-center transition-colors">
                        <MagnifyingGlassIcon className="h-6 w-6 text-[#131921] font-bold" />
                    </button>
                </div>

                {/* Rights Side */}
                <div className="flex items-center gap-1">
                    {/* User */}
                    <Link href="/profile" className="flex flex-col p-2 border border-transparent hover:border-white rounded-sm">
                        <span className="text-xs leading-tight">Hello, Sign in</span>
                        <span className="text-sm font-bold">Account & Lists</span>
                    </Link>

                    {/* Orders */}
                    <Link href="/profile" className="flex flex-col p-2 border border-transparent hover:border-white rounded-sm">
                        <span className="text-xs leading-tight">Returns</span>
                        <span className="text-sm font-bold">& Orders</span>
                    </Link>

                    {/* Cart */}
                    <Link href="/cart" className="flex items-end p-2 border border-transparent hover:border-white rounded-sm relative h-12">
                        <div className="relative">
                            <ShoppingCartIcon className="h-9 w-9" />
                            <span className="absolute -top-1 right-2 text-[#FF9900] font-bold text-base bg-[#131921] px-1 rounded-full">
                                {cartItems.length}
                            </span>
                        </div>
                        <span className="text-sm font-bold pb-1">Cart</span>
                    </Link>
                </div>
            </div>

            {/* Bottom Nav */}
            <div className="bg-[#232F3E] px-4 py-1 flex items-center gap-4 text-sm font-medium">
                <button className="flex items-center gap-1 p-2 border border-transparent hover:border-white rounded-sm">
                    <Bars3Icon className="h-6 w-6" />
                    All
                </button>
                <div className="flex items-center gap-4">
                    <Link href="/products" className="p-2 border border-transparent hover:border-white rounded-sm">Today's Deals</Link>
                    <Link href="/products" className="p-2 border border-transparent hover:border-white rounded-sm">Customer Service</Link>
                    <Link href="/products" className="p-2 border border-transparent hover:border-white rounded-sm lg:block hidden">Registry</Link>
                    <Link href="/products" className="p-2 border border-transparent hover:border-white rounded-sm lg:block hidden">Gift Cards</Link>
                    <Link href="/products" className="p-2 border border-transparent hover:border-white rounded-sm lg:block hidden">Sell</Link>
                </div>
            </div>
        </header>
    );
};

export default AmazonHeader;
