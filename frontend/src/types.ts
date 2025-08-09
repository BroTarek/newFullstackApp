
export interface RangeQuery {
  field: string;
  value: number;
  rangeIdentifier: 'lt' | 'lte' | 'gt' | 'gte';
}

export interface Product {
  id: string;
  title: string;
  category: string;
  imageCover:string;
  price: number;
  rating: number;
  ratingsQuantity:number;
  ratingsAverage:number;
  sold:number;
  // Add other product fields as needed
}

export interface ProductsState {
  SpecificProduct:{},
  allProducts: Product[];
  filteredProducts: Product[];
  paginatedProducts: Product[];
  createdProduct: Product | null;
  deletedProduct: string | null;
  updatedProduct: Product | null;
  paginationResult: {
  currentPage: number;
  limit: number;
  numberOfPages: number;
  next?: number;
  prev?: number;
} | null;

  searchKeywords: string;
  sorting: string[];
  rangeQueries: RangeQuery[];
  currentPage: number;
  itemsPerPage: number;
  
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

