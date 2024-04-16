import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { UsersService } from 'modules/user/users.service';
import { ProductsService } from 'modules/products/products.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { IOrder } from './types';
import { UniqueOTP } from 'unique-string-generator';

@Injectable()
export class OrdersService {
  constructor(
    private ordersRepository: OrdersRepository,
    private usersService: UsersService,
    private productsService: ProductsService,
  ) {}

  async create(dto: CreateOrderDto) {
    // const order_code: string = UniqueOTP(7);
    // const newDto = { ...dto, order_code };
    // console.log(newDto);

    // const newOrder = await this.ordersRepository.create({ ...dto, order_code });
    // return newOrder;
  }
}
