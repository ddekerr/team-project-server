import { User } from 'modules/user/schemas/user.schema';
import { Product } from 'modules/products/schemas/product.schema';

export interface ReviewI {
  estimation: string;
  advantages: string;
  disadvantages: string;
  comment?: string;
  user: User;
  product: Product;
  createdAt: Date;
}
