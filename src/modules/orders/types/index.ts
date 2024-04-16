import { Product } from 'modules/products/schemas/product.schema';
import { Address } from 'modules/user/schemas/user.schema';

export type OrderedProducts = {
  product: Product;
  quantity: number;
};

export interface IOrder {
  order_code: string;
  customer_email: string;
  total: number;
  delivery_address: Address;
  products: OrderedProducts[];
}
