import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { UsersService } from 'modules/user/users.service';
import { ProductsService } from 'modules/products/products.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderedProduct } from './types';
import { UniqueOTP } from 'unique-string-generator';
import { OrderDocument } from './schemas/order.chema';

@Injectable()
export class OrdersService {
  constructor(
    private ordersRepository: OrdersRepository,
    private usersService: UsersService,
    private productsService: ProductsService,
  ) {}

  // #################### CREATE NEW ORDER ####################
  async create(dto: CreateOrderDto) {
    // generated order code with 7 characters
    const orderCode = await this.generateUniqueOrderCode();

    // filtered products in ProductDocument format
    const filteredProducts = (await this.productsService.getList({ id: dto.products.map((p) => p.productId) })).map(
      ({ title, price, poster, id }) => ({ title, price, poster, id }),
    );

    // formated product to save in order table
    const products: OrderedProduct[] = filteredProducts.map((product) => {
      const quantity = dto.products.find(({ productId }) => productId === product.id).quantity;
      return { ...product, quantity };
    });

    const order = await this.ordersRepository.create({ ...dto, orderCode, products });
    return order;
  }

  // #################### GET ORDER LIST ####################
  async getList(): Promise<OrderDocument[]> {
    return await this.ordersRepository.getList({});
  }

  // #################### GENERATE UNIQUE ORDER CODE ####################
  private async generateUniqueOrderCode(): Promise<string> {
    let order: OrderDocument | null;
    let orderCode: string;

    do {
      orderCode = UniqueOTP(7);
      order = await this.ordersRepository.getOne({ orderCode });
    } while (order !== null);

    return orderCode.toString();
  }
}
