import { ProductDocument } from '../schemas/product.schema';

export type Filter = {
  category?: string;
  _id?: string[];
  price?: number;
  search?: string;
};

export type Params = {
  /**
   * date - from newest to oldest
   * -date - from oldest to newest
   * price - from biggest to lowest
   * -price - from lowest to biggest
   */
  sort?: SortParams;
  category?: string;
  _id?: string;
  minPrice?: string;
  maxPrice?: string;
  search?: string;
  page?: string;
  perPage?: string;
};

// values of url parameters 'sort'
export enum SortParams {
  DATEASC = 'date',
  DATEDESC = '-date',
  PRICEASC = 'price',
  PRICEDESC = '-price',
}

// fileds by sorting
export type SortingFields = 'updatedAt' | 'price';

// sorting object
export type Sort = {
  [field in SortingFields]?: 1 | -1 | 'asc' | 'desc';
};

export type Rating = {
  rating: number;
};

export interface TotalProducts {
  products: ProductDocument[];
  total: number;
}
