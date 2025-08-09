
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "@/redux/store";
import axios from "axios";
import { Product, ProductsState, RangeQuery } from '@/types'
import build from "next/dist/build";
import { getSpecificProduct } from "./thunk";
// Types
const initialState: ProductsState = {

  SpecificProduct:{},
  allProducts: [],
  filteredProducts: [],
  paginatedProducts: [],
  createdProduct: null,
  deletedProduct: null,
  updatedProduct: null,

  searchKeywords: '',
  sorting: [],
  rangeQueries: [],
  currentPage: 1,
  itemsPerPage: 50,

  paginationResult: null,
  status: 'idle',
  error: null
};

// Selectors
export const selectAllProducts = (state: { products: ProductsState }) => state.products.allProducts;
export const selectSpecificProduct = (state:any) => state.products.SpecificProduct;
export const selectSearchKeywords = (state: { products: ProductsState }) => state.products.searchKeywords;
export const selectSorting = (state: { products: ProductsState }) => state.products.sorting;
export const selectRangeQueries = (state: { products: ProductsState }) => state.products.rangeQueries;
export const selectItemsPerPage = (state: { products: ProductsState }) => state.products.itemsPerPage;
export const selectProductsStatus = (state: { products: ProductsState }) => state.products.status;

export const selectPaginationResult = (state: { products: ProductsState }) =>
  state.products.paginationResult;

export const selectCurrentPage = (state: { products: ProductsState }) =>
  state.products.currentPage;

export const selectTotalPages = (state: { products: ProductsState }) =>
  state.products.paginationResult?.numberOfPages || 1;


// Slice
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetCreatedProduct: (state) => {
      state.createdProduct = null;
      state.status = 'idle';
      state.error = null;
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.allProducts = action.payload;
      state.status = 'succeeded';
    },
    setPaginationResult: (
      state,
      action: PayloadAction<ProductsState["paginationResult"]>
    ) => {
      state.paginationResult = action.payload;
    },

    clearErrors: (state) => {
      state.error = null;
    },
    clearQueries: (state) => {
      state.searchKeywords = '';
      state.sorting = [];
      state.rangeQueries = [];
      state.currentPage = 1;
    },

    setSearchKeywords: (state, action: PayloadAction<string>) => {
      state.searchKeywords = action.payload;
      state.currentPage = 1; // Reset to first page when search changes
    },
    addSortField: (state, action: PayloadAction<string>) => {
      if (!state.sorting.includes(action.payload)) {
        state.sorting.push(action.payload);
      }
    },
    removeSortField: (state, action: PayloadAction<string>) => {
      state.sorting = state.sorting.filter(field => field !== action.payload);
    },
    addRangeQuery: (state, action: PayloadAction<RangeQuery>) => {
      state.rangeQueries.push(action.payload);
    },
    removeRangeQuery: (state, action: PayloadAction<{ field: string, rangeIdentifier: string }>) => {
      state.rangeQueries = state.rangeQueries.filter(
        q => !(q.field === action.payload.field &&
          q.rangeIdentifier === action.payload.rangeIdentifier)
      );
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1; // Reset to first page when page size changes
    },
    setLoading: (state) => {
      state.status = 'loading';
    },
    setError: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    }
  },
  extraReducers:builder=>
    builder
     .addCase(getSpecificProduct.pending, (state) => {
        state.status = 'loading';
        state.error = '';
    })
     .addCase(getSpecificProduct.fulfilled,(state,action: PayloadAction<{}>)=>{
      state.status = 'succeeded';
      state.SpecificProduct=action.payload
    })
     .addCase(getSpecificProduct.rejected,(state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
    })
});

// Thunks
export const fetchProducts = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(productsSlice.actions.setLoading());

    const state = getState().products;
    const params = new URLSearchParams();

    if (state.searchKeywords) params.append('keyword', state.searchKeywords);
    if (state.currentPage) params.append('page', `${state.currentPage}`);
    
    
    if (state.sorting.length > 0) params.append('sort', state.sorting.join(','));
    state.rangeQueries.forEach(query => {
      params.append(`${query.field}[${query.rangeIdentifier}]`, query.value.toString());
    });

    const response = await axios.get(`http://localhost:8000/api/v1/products/?${params.toString()}`);

    dispatch(productsSlice.actions.setProducts(response.data.data));
    dispatch(productsSlice.actions.setPaginationResult(response.data.paginationResult));
  } catch (error: any) {
    dispatch(productsSlice.actions.setError(error.response?.data?.message || 'Failed to fetch products'));
  }
};



export const {
  resetCreatedProduct,
  clearErrors,
  clearQueries,
  setSearchKeywords,
  addSortField,
  removeSortField,
  addRangeQuery,
  removeRangeQuery,
  setCurrentPage,
  setItemsPerPage,setPaginationResult,
} = productsSlice.actions;

export default productsSlice.reducer;