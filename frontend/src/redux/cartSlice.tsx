import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { addToCart, fetchCartProducts, removeFromCart, updateCartItemQuantity } from './thunk';
import { RootState } from './store';

interface CartItem {
  _id: string;
  product: {
    _id: string;
    title: string;
    imageCover: string;
  };
  quantity: number;
  color: string;
  price: number;
}

interface CartState {
  itemsById: Record<string, CartItem>;
  itemIds: string[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string;
  totalCartPrice: number;
  updateStatus: Record<string, 'idle' | 'loading' | 'succeeded' | 'failed'>;
}

const initialState: CartState = {
  itemsById: {},
  itemIds: [],
  status: 'idle',
  error: '',
  totalCartPrice: 0,
  updateStatus: {},
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.itemsById = {};
      state.itemIds = [];
      state.totalCartPrice = 0;
    },
    updateQuantityLocally: (state, action) => {
      const { itemId, quantity } = action.payload;
      if (state.itemsById[itemId]) {
        state.itemsById[itemId].quantity = quantity;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCartProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.itemsById = action.payload.cartItems.reduce((acc: Record<string, CartItem>, item: CartItem) => {
          acc[item._id] = item;
          return acc;
        }, {});
        state.itemIds = action.payload.cartItems.map((item: CartItem) => item._id);
        state.totalCartPrice = action.payload.totalCartPrice;
      })
      .addCase(fetchCartProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const item = action.payload;
        state.itemsById[item._id] = item;
        if (!state.itemIds.includes(item._id)) {
          state.itemIds.push(item._id);
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      // Update Quantity
      .addCase(updateCartItemQuantity.pending, (state, action) => {
        state.updateStatus[action.meta.arg.itemId] = 'loading';
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        const { updatedItem, cartItems, totalCartPrice } = action.payload;

        // Update the specific item
        state.itemsById[updatedItem._id] = updatedItem;

        // Update all items if needed
        cartItems.forEach(item => {
          if (!state.itemsById[item._id]) {
            state.itemsById[item._id] = item;
            state.itemIds.push(item._id);
          }
        });

        state.totalCartPrice = totalCartPrice;
        state.updateStatus[updatedItem._id] = 'succeeded';
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        const { itemId } = action.meta.arg;
        state.updateStatus[itemId] = 'failed';
        state.error = action.payload as string;
      })

      // Remove Item
      .addCase(removeFromCart.pending, (state, action) => {
        state.updateStatus[action.meta.arg.itemId] = 'loading';
      })
      .addCase(removeFromCart.fulfilled, (state, action: PayloadAction<{ itemId: string, totalCartPrice: number }>) => {
        const { itemId, totalCartPrice } = action.payload;
        delete state.itemsById[itemId];
        state.itemIds = state.itemIds.filter(id => id !== itemId);
        state.totalCartPrice = totalCartPrice;
        delete state.updateStatus[itemId];
        console.log('removed'+itemId)
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        const { itemId } = action.meta.arg;
        state.updateStatus[itemId] = 'failed';
        state.error = action.payload as string;
      });
  },
});

// Selectors
export const selectCartStatus = (state: RootState) => state.Cart.status;
export const selectCartError = (state: RootState) => state.Cart.error;
export const selectTotalCartPrice = (state: RootState) => state.Cart.totalCartPrice;
export const selectUpdateStatus = (state: RootState) => state.Cart.updateStatus;

// Memoized selectors
export const selectCartItemIds = (state: RootState) => state.Cart.itemIds;

export const makeSelectCartItemById = (itemId: string) =>
  createSelector(
    [(state: RootState) => state.Cart.itemsById],
    (itemsById) => itemsById[itemId]
  );

export const selectCartProducts = createSelector(
  [selectCartItemIds, (state: RootState) => state.Cart.itemsById],
  (itemIds, itemsById) => itemIds.map(id => itemsById[id]).filter(Boolean)
);

export const { clearCart, updateQuantityLocally } = cartSlice.actions;
export default cartSlice.reducer;