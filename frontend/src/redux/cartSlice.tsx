import { createSlice } from '@reduxjs/toolkit';
import { addToCart, fetchCartProducts, removeFromCart, updateCartItemQuantity } from './thunk';

const initialState = {
  CartProducts: [],
  status: '',
  error: '',
  totalCartPrice: 0
};

export const selectCartProducts = (state: any) => state.Cart.CartProducts;
export const selectTotalCartPrice = (state: any) => state.Cart.totalCartPrice;
export const selectCartStatus = (state: any) => state.Cart.status;
export const selectCartError = (state: any) => state.Cart.error;

const CartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.CartProducts = [];
    },
    removeProductFromCart: (state, action) => {
      state.CartProducts = state.CartProducts.filter(
        (CP: any) => CP.product._id !== action.payload.id
      );
    },
    updateCartItemQuantityClient: (state, action) => {
      const { id, quantity } = action.payload;
      state.CartProducts = state.CartProducts.map((item) =>
        item.product._id === id ? { ...item, quantity } : item
      );
    }


  },
  extraReducers: (builder) => {//
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.CartProducts = action.payload;
        console.log(state.CartProducts)
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(fetchCartProducts.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(fetchCartProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.CartProducts = action.payload.cartItems;
        state.totalCartPrice = action.payload.totalCartPrice
      })
      .addCase(fetchCartProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.CartProducts = action.payload.cartItems;
        state.totalCartPrice = action.payload.totalCartPrice
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      }).addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.CartProducts = action.payload.cartItems;
        state.totalCartPrice = action.payload.totalCartPrice;
      })

      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
    //
  }
});

export const { clearCart, removeProductFromCart, updateCartItemQuantityClient } = CartSlice.actions;
export default CartSlice.reducer;
