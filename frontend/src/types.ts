export interface Category {
  _id: string;
  name: string;
  image: string;
}

export interface SubCategory {
  _id: string;
  name: string;
  category: string;
}

export interface Brand {
  _id: string;
  name: string;
  image: string;
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  quantity: number;
  sold: number;
  price: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  imageCover: string;
  images: string[];
  category: Category;
  colors: string[];
  brand?: Brand;
  slug: string;
  createdAt?: string;
  updatedAt?: string;
  subcategories?: any;
}

export type PaginationResult = {
  currentPage: number;
  limit: number;
  next: any;
  numberOfPages: number;
};

export type RangeQueries = {
  field: string;
  operator: 'gt' | 'gte' | 'lt' | 'lte';
  value: number;
};

export interface InitialState {
  AllProducts: Product[];
  Categoryname: string;
  PaginationResult: PaginationResult;
  Status: 'idle' | 'loading' | 'fulfilled' | 'failed';
  searchKeywords: string;
  sorting: string[];
  rangeQueries: RangeQueries[];
  Error: any;
}