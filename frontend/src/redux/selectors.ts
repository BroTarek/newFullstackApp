
export const selectProductsMatchingRangeQueries = createSelector(
  [selectProductsMatchingKeyword, selectRangeQueries],
  (products, rangeQueries) => {
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


export const selectProductsMatchingKeyword = createSelector(
  [selectAllProducts, selectSearchKeywords],
  (products, keyword) => {
    if (!keyword) return products;
    return products.filter(product =>
      product.title.toLowerCase().includes(keyword.toLowerCase())
    );
  }
);


export const selectSortedProducts = createSelector(
  [selectProductsMatchingRangeQueries, selectSorting],
  (products, sorting) => {
    if (sorting.length === 0) return products;

    return [...products].sort((a, b) => {
      for (const sortField of sorting) {
        const isDesc = sortField.startsWith('-');
        const field = isDesc ? sortField.substring(1) : sortField;

        if (a[field as keyof Product] < b[field as keyof Product]) {
          return isDesc ? 1 : -1;
        }
        if (a[field as keyof Product] > b[field as keyof Product]) {
          return isDesc ? -1 : 1;
        }
      }
      return 0;
    });
  }
);

// export const selectFilteredProducts=createSelector([selectSortedProducts],(products)=>products)

export const selectCurrentPageProducts = createSelector(
  [selectSortedProducts, selectCurrentPage, selectItemsPerPage],
  (products, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return products.slice(startIndex, startIndex + itemsPerPage);
  }
);
