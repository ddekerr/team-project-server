import { Injectable } from '@nestjs/common';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';

import { Product, ProductDocument } from './schemas/product.schema';
import { DEFAULT_LIMIT } from './constants';
import { InjectModel } from '@nestjs/mongoose';
import { Sort } from './types';

@Injectable()
export class ProductsRepository {
  private selectedFields = ['id', 'title', 'price', 'inStock', 'poster', 'rating', 'categories'];
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  // ########## INSERT NEW PRODUCT INTO PRODUCT TABLE ##########
  async create(createEntityData: unknown): Promise<ProductDocument> {
    const product = await this.productModel.create(createEntityData);
    return await product.save();
  }

  // ########## UPDATE PRODUCT FROM PRODUCT TABLE ##########
  async update(
    entityFilterQuery: FilterQuery<ProductDocument>,
    updateEntityData: UpdateQuery<unknown>,
  ): Promise<ProductDocument> {
    return await this.productModel.findOneAndUpdate(entityFilterQuery, updateEntityData, {
      new: true,
      fields: this.selectedFields,
    });
  }

  // ########## DELETE PRODUCT FROM PRODUCT TABLE ##########
  async delete(entityFilterQuery: FilterQuery<ProductDocument>): Promise<ProductDocument> {
    return await this.productModel.findOneAndDelete(entityFilterQuery, {});
  }

  // ########## SELECT ONE PRODUCT FROM PRODUCT TABLE ##########
  async getOne(entityFilterQuery: FilterQuery<ProductDocument>): Promise<ProductDocument> {
    return await this.productModel.findOne(entityFilterQuery).select(this.selectedFields);
  }

  async getById(_id: string) {
    return await this.productModel.findById(_id);
  }

  // ########## SELECT PRODUCTS LIST FROM PRODUCT TABLE WITH FILTER AND LIMIT ##########
  async getList(entityFilterQuery: FilterQuery<ProductDocument>, page: number, sort: Sort): Promise<ProductDocument[]> {
    const limit = DEFAULT_LIMIT;
    const skip = (page - 1) * limit;
    return await this.productModel
      .find(entityFilterQuery)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select(this.selectedFields);
  }

  // #################### SERCH PRODUCT ####################
  async serchProduct(regex: RegExp): Promise<ProductDocument[]> {
    return await this.productModel.find({ title: regex }).exec();
    //Додати логіку пошуку по характеристикам
  }

  private getProductFields(product: ProductDocument) {
    const { _id, id, title, price, inStock, poster, rating, categories } = product;
    return { _id, id, title, price, inStock, poster, rating, categories };
  }
}
