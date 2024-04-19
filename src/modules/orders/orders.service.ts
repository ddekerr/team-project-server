import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { UsersService } from 'modules/user/users.service';
import { ProductsService } from 'modules/products/products.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { IOrder } from './types';
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
  async create(dto: CreateOrderDto): Promise<OrderDocument> {
    const orderCode = await this.generateUniqueOrderCode();

    const order = await this.ordersRepository.create({ ...dto, orderCode });
    console.log(order);
    return order;
  }

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
