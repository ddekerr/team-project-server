import { Injectable, NotFoundException } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { UsersService } from 'modules/user/users.service';
import { ProductsService } from 'modules/products/products.service';
import { CreateOrderDto } from './dto/create-order.dto';
// import { OrderedProduct } from './types';
import { UniqueOTP } from 'unique-string-generator';
import { OrderDocument } from './schemas/order.shema';
import exceptionMessages from 'constants/exceptionMessages';
import { UpdateOrderDto } from './dto/update-order.dto';
// import { Types } from 'mongoose';

import * as nodemailer from 'nodemailer';
import { Params } from './types';

@Injectable()
export class OrdersService {
  private transporter: nodemailer.Transporter;

  constructor(
    private ordersRepository: OrdersRepository,
    private usersService: UsersService,
    private productsService: ProductsService,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASSWORD, //App Password
      },
    });
  }

  //#################### SEND MAIL ####################
  private async sendMail(to: string, subject: string, infoOrder: { orderCode: number; orderStatus: string }) {
    const mailOptions = {
      from: `"TechStop" <${process.env.GMAIL}>`, // від кого
      to, // до кого
      subject: 'Зміна статусу замовлення', // тема
      text: `Вітаю, замовлення ${infoOrder.orderCode} змінило статус на ${infoOrder.orderStatus}`, // текст
    };

    return await this.transporter.sendMail(mailOptions);
  }

  // #################### CREATE NEW ORDER ####################
  async create(dto: CreateOrderDto) {
    // generated order code with 7 characters
    const orderCode = await this.generateUniqueOrderCode();

    const filteredProducts = [];
    for (let i = 0; i < dto.products.length; i++) {
      const _id = dto.products[i].productId;
      const product = await this.productsService.getOneById(_id);
      filteredProducts.push(product);
    }

    // formated product to save in order table
    const products = filteredProducts.map((product) => {
      const quantity = dto.products.find(({ productId }) => {
        product.productId = productId;
        return product._id.equals(productId);
      }).quantity;
      return { ...product, quantity };
    });

    if (!products.length) {
      throw new NotFoundException(exceptionMessages.NOT_FOUND_ORDER_MSG);
    }

    const order = await this.ordersRepository.create({ ...dto, orderCode, products });
    return order;
  }

  // #################### GET ORDER LIST ####################
  async getList(params?: Params): Promise<OrderDocument[]> {
    const filter = this.setFilter(params);
    return await this.ordersRepository.getList(filter);
  }

  private setFilter(params: Params) {
    const filter = Object.entries(params).reduce((prev, [param, valueOfParam]) => {
      switch (param) {
        case 'email':
          prev['email'] = valueOfParam;
          break;

        default:
          prev[param] = valueOfParam;
          break;
      }

      return prev;
    }, {});

    return filter;
  }
  // #################### DELETE ORDER BY ID ####################
  async delete(orderCode: number): Promise<OrderDocument> {
    const order = await this.ordersRepository.delete({ orderCode });
    if (!order) {
      throw new NotFoundException(exceptionMessages.NOT_FOUND_ORDER_MSG);
    }
    return order;
  }

  // #################### UPDATE PRODUCT BY ID ####################
  async update(orderCode: number, dto: UpdateOrderDto): Promise<OrderDocument> {
    if ('orderStatus' in dto) {
      const order = await this.getOneByOrderCode(orderCode);
      if (dto.orderStatus != order.orderStatus) {
        this.sendMail(order.email, 'Зміна статусу', { orderCode, orderStatus: dto.orderStatus });
      }
    }
    return await this.ordersRepository.update({ orderCode }, dto);
  }

  // #################### GET ONE ORDER BY ORDERCODE ####################
  async getOneByOrderCode(orderCode: number): Promise<OrderDocument> {
    const order = await this.ordersRepository.getOne({ orderCode });
    if (!order) {
      throw new NotFoundException(exceptionMessages.NOT_FOUND_ORDER_MSG);
    }
    return order;
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
