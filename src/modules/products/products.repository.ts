import { Injectable } from '@nestjs/common';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';

import { Product, ProductDocument } from './schemas/product.schema';
import { DEFAULT_LIMIT } from './constants';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  // ########## INSERT NEW PRODUCT INTO PRODUCT TABLE ##########
  async create(createEntityData: unknown): Promise<ProductDocument> {
    const product = await this.productModel.create(createEntityData);
    return product.save();
  }

  // ########## UPDATE PRODUCT FROM PRODUCT TABLE ##########
  async update(
    entityFilterQuery: FilterQuery<ProductDocument>,
    updateEntityData: UpdateQuery<unknown>,
  ): Promise<ProductDocument> {
    return await this.productModel.findOneAndUpdate(
      entityFilterQuery,
      updateEntityData,
      { new: true },
    );
  }

  // ########## DELETE PRODUCT FROM PRODUCT TABLE ##########
  async delete(
    entityFilterQuery: FilterQuery<ProductDocument>,
  ): Promise<ProductDocument> {
    return await this.productModel.findOneAndDelete(entityFilterQuery, {});
  }

  // ########## SELECT ONE PRODUCT FROM PRODUCT TABLE BY ID ##########
  async getOne(
    entityFilterQuery: FilterQuery<ProductDocument>,
  ): Promise<ProductDocument> {
    return await this.productModel
      .findOne(entityFilterQuery)
      .select(['id', 'title', 'price', 'inStock']);
  }

  // ########## SELECT PRODUCTS LIST FROM PRODUCT TABLE WITH FILTER AND LIMIT ##########
  async getList(
    entityFilterQuery: FilterQuery<ProductDocument>,
  ): Promise<ProductDocument[]> {
    return await this.productModel
      .find(entityFilterQuery)
      .limit(DEFAULT_LIMIT)
      .select(['id', 'title', 'price', 'inStock']);
  }
}
