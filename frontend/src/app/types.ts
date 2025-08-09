
export type Category = {
  _id: string;
  name: string;
  slug: string;
  image: string;
};

export type SubCategory = {
  _id: string;
  name: string;
  slug: string;
  category: string;
};

export type Brand = {
  _id: string;
  name: string;
  slug: string;
  image: string;
};

export type Product = {
  _id: string;
  title: string;
  slug: string;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  category: {
    _id: string;
    name: string;
  };
  subcategories: SubCategory[];
  brand?: Brand;
  ratingsAverage?: number;
};