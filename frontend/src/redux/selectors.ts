import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Product } from '@/types';

const selectAllProducts = (state: RootState) => state.Product.AllProducts;
const selectSearchKeywords = (state: RootState) => state.Product.searchKeywords;
const selectRangeQueries = (state: RootState) => state.Product.rangeQueries;
const selectSorting = (state: RootState) => state.Product.sorting;
const selectCurrentPage = (state: RootState) => state.Product.PaginationResult.currentPage;
const selectItemsPerPage = (state: RootState) => state.Product.PaginationResult.limit;

export const selectProductsMatchingKeyword = createSelector(
  [selectAllProducts, selectSearchKeywords],
  (products: Product[], keyword: string) => {
    if (!keyword) return products;
    return products.filter(product =>
      product.title.toLowerCase().includes(keyword.toLowerCase())
    );
  }
);

export const selectProductsMatchingRangeQueries = createSelector(
  [selectProductsMatchingKeyword, selectRangeQueries],
  (products: Product[], rangeQueries: any[]) => {
    if (rangeQueries.length === 0) return products;

    return products.filter(product => {
      return rangeQueries.every(query => {
        const productValue = product[query.field as keyof Product];
        if (typeof productValue !== 'number') return false;

        switch (query.rangeIdentifier) {
          case 'lt': return productValue < query.value;
          case 'lte': return productValue <= query.value;
          case 'gt': return productValue > query.value;
          case 'gte': return productValue >= query.value;
          default: return false;
        }
      });
    });
  }
);

export const selectSortedProducts = createSelector(
  [selectProductsMatchingRangeQueries, selectSorting],
  (products: Product[], sorting: string[]) => {
    if (sorting.length === 0) return products;

    return [...products].sort((a, b) => {
      for (const sortField of sorting) {
        const isDesc = sortField.startsWith('-');
        const field = isDesc ? sortField.substring(1) : sortField;

        const valA = a[field as keyof Product];
        const valB = b[field as keyof Product];

        if (typeof valA === 'number' && typeof valB === 'number') {
          if (valA < valB) return isDesc ? 1 : -1;
          if (valA > valB) return isDesc ? -1 : 1;
        }
      }
      return 0;
    });
  }
);

export const selectCurrentPageProducts = createSelector(
  [selectSortedProducts, selectCurrentPage, selectItemsPerPage],
  (products: Product[], currentPage: number, itemsPerPage: number) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return products.slice(startIndex, startIndex + itemsPerPage);
  }
);
