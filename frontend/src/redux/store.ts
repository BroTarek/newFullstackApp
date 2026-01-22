import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import productsSliceReducer from '@/redux/productsSlice'; // Adjust path as needed
import wishListReducer from '@/redux/wishListSlice'; // Adjust path as needed
import cartReducer from '@/redux/cartSlice'; // Adjust path as needed

export const store = configureStore({
  reducer: {
    
    Product:productsSliceReducer,
    wishList: wishListReducer,
    Cart:cartReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
