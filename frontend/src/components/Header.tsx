import React, { useState } from 'react'
import { FaCartShopping, FaHeart } from "react-icons/fa6";
import { IoPersonCircleOutline } from "react-icons/io5"
import ReactCountryFlag from "react-country-flag";
import { useCategories, useSubCategories } from '@/hooks/useCategories';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
    const [subCategoriesToShow, setSubCategoriesToShow] = useState<string>('')
    const { data: categoryData = [], isLoading: isCategoriesLoading } = useCategories();
    const { data: subCategoryData = [], isLoading: isSubCategoriesLoading } = useSubCategories(subCategoriesToShow);

    return (
        <div className="w-full flex flex-col font-sans">
            {/* Top Header */}
            <div className="bg-slate-50 border-b p-4 flex items-center justify-between gap-4">
                <Link href="/home" className="flex-shrink-0">
                    <Image src="/globe.svg" alt="Logo" width={40} height={40} />
                </Link>

                <div className="flex items-center gap-2 text-sm text-slate-600">
                    <ReactCountryFlag countryCode="US" svg />
                    <div>
                        <p className="text-xs uppercase font-semibold text-slate-400">Deliver to</p>
                        <button className="font-medium hover:text-blue-600">New York</button>
                    </div>
                </div>

                <div className="flex-grow max-w-2xl relative">
                    <input
                        type="search"
                        placeholder="What are you looking for?"
                        className="w-full bg-white border rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex items-center gap-6">
                    <button className="text-sm font-medium hover:text-blue-600">English</button>

                    <Link href="/login" className="flex items-center gap-1 hover:text-blue-600">
                        <IoPersonCircleOutline size={24} />
                        <span className="text-sm font-medium">Log In</span>
                    </Link>

                    <Link href="/wish-list" className="text-slate-600 hover:text-red-500 transition-colors">
                        <FaHeart size={20} />
                    </Link>

                    <Link href="/cart" className="text-slate-600 hover:text-blue-600 transition-colors relative">
                        <FaCartShopping size={20} />
                    </Link>
                </div>
            </div>

            {/* Bottom Header (Categories) */}
            <div
                className="bg-white border-b relative"
                onMouseLeave={() => setSubCategoriesToShow('')}
            >
                <div className="container mx-auto flex items-center gap-8 px-4 overflow-x-auto no-scrollbar">
                    {isCategoriesLoading ? (
                        <div className="py-3 text-sm text-slate-400">Loading categories...</div>
                    ) : (
                        categoryData.map((category) => (
                            <button
                                key={category._id}
                                className={`py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 hover:text-blue-600 ${subCategoriesToShow === category._id ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-600'
                                    }`}
                                onMouseEnter={() => setSubCategoriesToShow(category._id)}
                            >
                                {category.name}
                            </button>
                        ))
                    )}
                </div>

                {/* Mega Menu (Subcategories) */}
                {subCategoriesToShow && (
                    <div className="absolute top-full left-0 w-full bg-white shadow-xl border-t z-50 animate-in fade-in slide-in-from-top-1 duration-200">
                        <div className="container mx-auto p-6 flex justify-between gap-8">
                            <div className="flex-grow grid grid-cols-4 gap-8">
                                {isSubCategoriesLoading ? (
                                    <div className="col-span-4 text-slate-400 py-8">Loading...</div>
                                ) : subCategoryData.length > 0 ? (
                                    subCategoryData.map((sub) => (
                                        <div key={sub._id}>
                                            <h4 className="font-bold text-slate-900 mb-3">{sub.name}</h4>
                                            {/* Sub-subcategory placeholder or more links can go here */}
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-4 text-slate-400 py-8 italic text-sm">No subcategories found</div>
                                )}
                            </div>

                            <div className="hidden lg:block w-48 h-48 relative rounded-xl overflow-hidden shadow-inner bg-slate-100">
                                {categoryData.find(cat => cat._id === subCategoriesToShow)?.image && (
                                    <img
                                        src={categoryData.find(cat => cat._id === subCategoriesToShow)?.image}
                                        alt="Category display"
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Header
