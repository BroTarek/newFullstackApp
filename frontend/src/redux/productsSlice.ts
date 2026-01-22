import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import React from "react";
import { InitialState, Product, PaginationResult, RangeQueries } from "@/types";
import { fetchProducts } from "./ProductThunk";
import { RootState } from '@/redux/store'
const initialState: InitialState = {
  AllProducts: [],
  Categoryname:'',
  PaginationResult: {
    currentPage: 1,
    limit: 5,
    next: null,
    numberOfPages: 1,
  },
  searchKeywords: "",
  sorting: [],
  rangeQueries: [],
  Status: 'idle',
  Error: ''
}
export const AllProductsGetter = (state: RootState) => state.Product.AllProducts
export const SortingGetter = (state: RootState) => state.Product.sorting
export const FilteredProducts = (state: RootState) => {
  let FilteredProducts = state.Product.AllProducts
    .filter((p: Product) =>
      p.category.name.toLowerCase() === state.Product.Categoryname.toLowerCase()
    );

  if (state.Product.searchKeywords !== '') {
    FilteredProducts = FilteredProducts.filter((p: Product) => 
      p.description.includes(state.Product.searchKeywords) ||
      p.title.includes(state.Product.searchKeywords)
    );
  }

  if (state.Product.rangeQueries.length > 0) {
    FilteredProducts = FilteredProducts.filter((p: Product) =>
      state.Product.rangeQueries.every((RQ: RangeQueries) => {
        const { field, operator, value } = RQ;
        const ProductField = field as keyof Product;
        const fieldValue = p[ProductField] as number;

        switch (operator) {
          case "gt": return fieldValue > value;
          case "gte": return fieldValue >= value;
          case "lt": return fieldValue < value;
          case "lte": return fieldValue <= value;
          default: return true;
        }
      })
    );
  }

  if (state.Product.sorting.length > 0) {
    FilteredProducts = FilteredProducts.slice().sort((a, b) => {
      for (let key of state.Product.sorting) {
        let desc = false;
        let field = key;

        if (key.startsWith("-")) {
          desc = true;
          field = key.slice(1);
        }

        let diff = 0;
        const aVal = a[field as keyof Product];
        const bVal = b[field as keyof Product];

        if (typeof aVal === "number" && typeof bVal === "number") {
          diff = desc ? bVal - aVal : aVal - bVal;
        } else if (typeof aVal === "string" && typeof bVal === "string") {
          diff = desc ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
        }

        if (diff !== 0) return diff;
      }
      return 0;
    });
  }

  return FilteredProducts;
};



const productSlice = createSlice({
  name: "Products",
  initialState,
  reducers: {
    setCategoryname:(state,action:PayloadAction<string>)=>{state.Categoryname=action.payload},
    clearErrors: (state) => {
      state.Error = null;
    },
    clearQueries: (state) => {
      state.searchKeywords = '';
      state.sorting = [];
      state.rangeQueries = [];
      state.PaginationResult.currentPage = 1;
    },

    setSearchKeywords: (state, action: PayloadAction<string>) => {
      state.searchKeywords = action.payload;
      state.PaginationResult.currentPage = 1; // Reset to first page when search changes
    },
    addSortField: (state, action: PayloadAction<string>) => {
      if (!state.sorting.includes(action.payload)) {
        state.sorting.push(action.payload);
      }
    },
   removeSortField: (state, action: PayloadAction<string>) => {
  state.sorting = state.sorting.filter(
    field => field.replace(/^-/, "") !== action.payload
  );
},

    addRangeQuery: (state, action: PayloadAction<RangeQueries>) => {
      state.rangeQueries.push(action.payload);
    },
    removeRangeQuery: (state, action: PayloadAction<RangeQueries>) => {
      state.rangeQueries = state.rangeQueries.filter(
        q => !(q.field === action.payload.field &&
          q.operator === action.payload.operator)
      );
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.PaginationResult.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.PaginationResult.limit = action.payload;
      state.PaginationResult.currentPage = 1; // Reset to first page when page size changes
    },
    setLoading: (state) => {
      state.Status = 'loading';
    },
    setError: (state, action: PayloadAction<string>) => {
      state.Status = 'failed';
      state.Error = action.payload;
    },
    setSorting:(state,action:PayloadAction<string[]>)=>{
      state.sorting=action.payload
    }
  },

  extraReducers: builder =>
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.Status = 'loading'
      })
      .addCase(fetchProducts.fulfilled, (state,
        action: PayloadAction<{ AllProducts: Product[], paginationResult: PaginationResult }>) => {
        state.AllProducts = action.payload.AllProducts
        state.PaginationResult = action.payload.paginationResult
      })
      


}
)

export default productSlice.reducer
export const {
  addRangeQuery,
  addSortField,
  removeSortField,
  removeRangeQuery,setSorting,
setCategoryname } = productSlice.actions;