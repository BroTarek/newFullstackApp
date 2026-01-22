import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Automatically attach token to each request
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('usertoken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

export const getSpecificProduct = createAsyncThunk(
  'products/getSpecificProduct',
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/products/${id}`);
      console.log(response.data.data)
      return response.data.data; // Make sure your API returns the product in `data.data`
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
    }
  }
);

/*
https://f.nooncdn.com/p/pnsku/N70106183V/45/_/1726043631/3064c465-3457-42ef-a234-0b6382365281.jpg?width=800
 

https://f.nooncdn.com/p/pnsku/N70106183V/45/_/1725964086/f5afadb8-ea47-41c4-88a2-45e5c2a94b2d.jpg?width=320
https://f.nooncdn.com/p/pnsku/N70106183V/45/_/1726043633/319cd40e-a492-48e9-8f02-ea9a3376922e.jpg?width=320
https://f.nooncdn.com/p/pnsku/N70106183V/45/_/1726043631/3064c465-3457-42ef-a234-0b6382365281.jpg?width=320





*/
export const fetchWishListProducts = createAsyncThunk(
  'wishList/fetchWishListProducts',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/wishlist');
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteProductFromWishList = createAsyncThunk(
  'wishList/deleteProductFromWishList',
  async (productID: string, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/wishlist/${productID}`);
      return productID;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addProductToWishList = createAsyncThunk(
  'wishList/addProductToWishList',
  async (productID: string, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/wishlist', {
        productId: productID
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  'Cart/addToCart',
  async (payload: { productId: string; color: string }, thunkAPI) => {
    try {
      
      const response = await axios.post('http://localhost:8000/api/v1/cart', {
        productId: payload.productId,
        color: payload.color
      });
      
      return response.data.data
    }
    catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const fetchCartProducts = createAsyncThunk(
  'Cart/fetchCartProducts',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/cart');
      
      const cartItems = response.data.data.cartItems;
      const totalCartPrice = response.data.data.totalCartPrice;

      console.log({
        cartItems: cartItems,
        totalCartPrice,
      })
      return {
        cartItems: cartItems,
        totalCartPrice,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// In your thunk.ts
export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateCartItemQuantity',
  async (payload: { quantity: number, itemId: string }, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/cart/${payload.itemId}`,
        { quantity: payload.quantity }
      );
      
      return {
        updatedItem: response.data.data.updatedItem,
        cartItems: response.data.data.cartItems,
        totalCartPrice: response.data.data.totalCartPrice
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Update failed');
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'Cart/removeFromCart',
  async (payload: { itemId: string }, thunkAPI) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/cart/${payload.itemId}`
      );
      const totalCartPrice = response.data.data.totalCartPrice;
      return { id: payload.itemId, totalCartPrice };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);