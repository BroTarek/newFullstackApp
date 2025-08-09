'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  fetchProducts,
  selectSearchKeywords,
  selectSorting,
  selectRangeQueries,
  selectCurrentPage,
  setSearchKeywords,
  addSortField,
  removeSortField,
  addRangeQuery,
  setCurrentPage,
  selectAllProducts,
} from '@/redux/productsSlice';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { addProductToWishList } from '@/redux/thunk';
import Link from 'next/link';

const AddProductsClient = ({ params }: { params: { categoryId: string } }) => {
   let { CategoryID } = React.use(params);

  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const search = useAppSelector(selectSearchKeywords);
  const sort = useAppSelector(selectSorting);
  const range = useAppSelector(selectRangeQueries);
  const page = useAppSelector(selectCurrentPage);
   let products
  if(CategoryID){
     CategoryID=CategoryID.replace("%26","&").toLowerCase()
     products= useAppSelector(selectAllProducts).filter(product => product.category.name === `${CategoryID}`);

  }
  else if(!CategoryID){
   products=useAppSelector(selectAllProducts)}
  if(!CategoryID)products = useAppSelector(selectAllProducts)
  console.log(products)
  console.log(CategoryID)
  // Init state from URL
  useEffect(() => {
    const keyword = searchParams.get('keyword');
    const page = searchParams.get('page');
    const sort = searchParams.get('sort');

    if (keyword) dispatch(setSearchKeywords(keyword));
    if (page) dispatch(setCurrentPage(Number(page)));
    if (sort) sort.split(',').forEach(field => dispatch(addSortField(field)));

    for (const [key, value] of searchParams.entries()) {
      const match = key.match(/^(.+)\[(gte|lte)\]$/);
      if (match) {
        dispatch(addRangeQuery({ field: match[1], rangeIdentifier: match[2], value: Number(value) }));
      }
    }
  }, []);

  // Sync state to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set('keyword', search);
    if (page) params.set('page', page.toString());
    if (sort.length > 0) params.set('sort', sort.join(','));
    range.forEach(({ field, rangeIdentifier, value }) => {
      params.set(`${field}[${rangeIdentifier}]`, value.toString());
    });

    router.replace(`${pathname}?${params.toString()}`);
  }, [search, sort, range, page]);

  // Fetch products
  useEffect(() => {
    dispatch(fetchProducts());
  }, [search, sort, range, page]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchKeywords(e.target.value));
  };

  const handleSort = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    if (sort.includes(name)) {
      dispatch(removeSortField(name));
    } else {
      dispatch(addSortField(name));
    }
  };

  const handlePagination = () => {
    dispatch(setCurrentPage(page + 1));
  };
  
 const handleAddTowishList=(productID)=>{dispatch(addProductToWishList(productID))
  console.log("working")
 }
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* Search */}
      <div>
        <input
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={handleSearch}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Sort Options */}
      <div className="flex flex-wrap gap-4">
        {['sold', 'price', 'ratingsAverage', 'ratingsQuantity', 'quantity'].map((key) => (
          <label key={key} className="flex items-center gap-2">
            <input
              type="checkbox"
              name={key}
              checked={sort.includes(key)}
              onChange={handleSort}
              className="accent-blue-500"
            />
            <span className="capitalize text-sm">{key}</span>
          </label>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, i) => (
          <div key={i} className="border rounded-xl shadow-sm overflow-hidden hover:shadow-md transition duration-200">
           
            <img src={product.imageCover} alt={product.title} className="w-full h-48 object-cover"onClick={()=>{
              window.location.href=`http://localhost:3000/Product/${product.id}`
            }
          } />
           
            <div className="p-4">
              <h3 className="font-semibold text-lg">{product.title}</h3>
              <p className="text-sm text-gray-600 mt-1">${product.price}</p>
              <button type="button" onClick={()=>handleAddTowishList(product.id)}> add to wishList</button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center">
        <button
          onClick={handlePagination}
          className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default AddProductsClient;
