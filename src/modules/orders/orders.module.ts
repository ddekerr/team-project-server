import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { OrdersController } from './orders.controller';
import { ProductsModule } from 'modules/products/products.module';
import { UsersModule } from 'modules/user/users.module';
import { Order, OrderSchema } from './schemas/order.shema';

@Module({
  providers: [OrdersService, OrdersRepository],
  controllers: [OrdersController],
  imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]), ProductsModule, UsersModule],
})
export class OrdersModule {}
