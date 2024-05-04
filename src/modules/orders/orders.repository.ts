import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery, UpdateQuery } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.shema';

@Injectable()
export class OrdersRepository {
  constructor(@InjectModel(Order.name) private ordersModel: Model<OrderDocument>) {}

  // ########## INSERT NEW ORDER INTO ORDERS TABLE ##########
  async create(createEntityData: unknown): Promise<OrderDocument> {
    return await this.ordersModel.create(createEntityData);
  }

  // ########## UPDATE ORDER FROM ORDERS TABLE ##########
  async update(
    entityFilterQuery: FilterQuery<OrderDocument>,
    updateEntityData: UpdateQuery<unknown>,
  ): Promise<OrderDocument> {
    return await this.ordersModel.findOneAndUpdate(entityFilterQuery, updateEntityData, {
      new: true,
    });
  }

  // ########## DELETE ORDER FROM ORDERS TABLE ##########
  async delete(entityFilterQuery: FilterQuery<OrderDocument>): Promise<OrderDocument> {
    return await this.ordersModel.findOneAndDelete(entityFilterQuery, {});
  }

  // ########## SELECT ONE ORDER FROM ORDERS TABLE ##########
  async getOne(entityFilterQuery: FilterQuery<OrderDocument>): Promise<OrderDocument> {
    return await this.ordersModel.findOne(entityFilterQuery);
  }

  // ########## SELECT ORDERS LIST FROM ORDERS TABLE ##########
  async getList(entityFilterQuery: FilterQuery<OrderDocument>): Promise<OrderDocument[]> {
    return await this.ordersModel.find(entityFilterQuery);
  }
}
