import { createSlice } from '@reduxjs/toolkit';
import { fetchWishListProducts, deleteProductFromWishList } from './thunk';

const initialState = {
  wishListProducts: [],
  status: '',
  error: ''
};

export const selectWishListProducts = (state: any) => state.wishList.wishListProducts;
export const selectWishListStatus = (state: any) => state.wishList.status;
export const selectWishListError = (state: any) => state.wishList.error;

const wishListSlice = createSlice({
  name: 'wishList',
  initialState,
  reducers: {
    clearWishList: (state) => {
      state.wishListProducts = [];
    },
    removeProductFromWishList: (state, action) => {
      state.wishListProducts = state.wishListProducts.filter(
        (p: any) => p.id !== action.payload
      );
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishListProducts.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(fetchWishListProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.wishListProducts = action.payload;
      })
      .addCase(fetchWishListProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(deleteProductFromWishList.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(deleteProductFromWishList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.wishListProducts = state.wishListProducts.filter(
          (p: any) => p.id !== action.payload
        );
      })
      .addCase(deleteProductFromWishList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});

export const { clearWishList, removeProductFromWishList } = wishListSlice.actions;
export default wishListSlice.reducer;
