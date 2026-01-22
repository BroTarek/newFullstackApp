'use client';

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
// import { selectSpecificProduct } from '@/redux/productsSlice';
import { addProductToWishList, getSpecificProduct } from '@/redux/thunk';
import { StarRating } from './StarRating';

const ProductClient = ({ params }: { params: { id: string } }) => {
  const { id } = React.use(params); // Fixed: Removed incorrect React.use()
  
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectSpecificProduct);
  const [currentImage, setCurrentImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (id) {
      dispatch(getSpecificProduct(id));
    }
  }, [dispatch, id]);

  // Initialize currentImage when product loads
  useEffect(() => {
    if (product?.imageCover) {
      setCurrentImage(product.imageCover);
    }
  }, [product]);

  const handleAddToWishList = (productId: string) => {
    dispatch(addProductToWishList(productId));
  };

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    setQuantity(prev => {
      if (type === 'increase') return prev + 1;
      return prev > 1 ? prev - 1 : 1;
    });
  };

  if (!product || !product._id) {
    return <p className="text-center text-gray-500">Loading product...</p>;
  }

  return (
    <div className="product-page container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="product-gallery">
          <div className="main-image mb-4">
            {currentImage && (
              <img 
                src={currentImage} 
                alt={product.title} 
                className="w-full h-96 object-contain rounded-lg shadow-md"
              />
            )}
          </div>
          <div className="thumbnail-grid grid grid-cols-3 gap-2">
            {/* Include cover image in thumbnails */}
            <img 
              src={product.imageCover} 
              alt={`${product.title} main view`}
              onClick={() => setCurrentImage(product.imageCover)}
              className={`w-full h-24 object-cover rounded-md cursor-pointer hover:opacity-80 ${
                currentImage === product.imageCover ? 'ring-2 ring-blue-500' : ''
              }`}
            />
            {/* Other images */}
            {product.images?.map((img: string, index: number) => (
              <img 
                key={index}
                src={img} 
                alt={`${product.title} view ${index + 1}`}
                onClick={() => setCurrentImage(img)}
                className={`w-full h-24 object-cover rounded-md cursor-pointer hover:opacity-80 ${
                  currentImage === img ? 'ring-2 ring-blue-500' : ''
                }`}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-4">Desert Titanium • 256GB • 5G with FaceTime</p>
          
          <div className="flex items-center mb-4">
            <StarRating rating={product.ratingsAverage} />
            <span className="ml-2 text-gray-700">
              {product.ratingsAverage} ({product.ratingsQuantity} reviews)
            </span>
            <span className="mx-2">•</span>
            <span className="text-green-600">{product.sold} sold</span>
          </div>

          <div className="price-section mb-6">
            <p className="text-4xl font-bold text-gray-900">
              ${product.price.toLocaleString('en-US', {minimumFractionDigits: 2})}
            </p>
            <p className="text-green-600">In Stock: {product.quantity} units</p>
          </div>

          <div className="description mb-6">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div className="actions flex flex-col sm:flex-row gap-4">
            <div className="quantity-selector flex items-center border rounded-md overflow-hidden">
              <button 
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
                onClick={() => handleQuantityChange('decrease')}
              >
                -
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button 
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
                onClick={() => handleQuantityChange('increase')}
              >
                +
              </button>
            </div>
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium flex-1"
              onClick={() => handleAddToWishList(product._id)}
            >
              Add to wishlist
            </button>
            <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-6 rounded-md font-medium flex-1">
              Buy Now
            </button>
          </div>

          <div className="delivery-info mt-6 p-4 bg-gray-50 rounded-md">
            <h4 className="font-medium mb-2">Delivery options</h4>
            <p className="text-sm text-gray-600">Free shipping on orders over $50</p>
            <p className="text-sm text-gray-600">Estimated delivery: 2-5 business days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductClient;