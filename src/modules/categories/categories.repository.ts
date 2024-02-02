import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery, UpdateQuery } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';

@Injectable()
export class CategoriesRepository {
  private selectedFields = { childrens: 0 };
  constructor(
    @InjectModel(Category.name)
    private categoriesModel: Model<CategoryDocument>,
  ) {}

  // ########## INSERT NEW CATEGORY INTO CATEGORIES TABLE ##########
  async create(createEntityData: unknown): Promise<CategoryDocument> {
    return await this.categoriesModel.create(createEntityData);
  }

  // ########## UPDATE CATEGORY FROM CATEGORIES TABLE ##########
  async update(
    entityFilterQuery: FilterQuery<CategoryDocument>,
    updateEntityData: UpdateQuery<unknown>,
  ): Promise<CategoryDocument> {
    return await this.categoriesModel.findOneAndUpdate(entityFilterQuery, updateEntityData, {
      new: true,
      fields: this.selectedFields,
    });
  }

  // ########## DELETE CATEGORY FROM CATEGORIES TABLE ##########
  async delete(entityFilterQuery: FilterQuery<CategoryDocument>): Promise<CategoryDocument> {
    return await this.categoriesModel.findOneAndDelete(entityFilterQuery, {});
  }

  // ########## SELECT ONE CATEGORY FROM CATEGORIES TABLE ##########
  async getOne(entityFilterQuery: FilterQuery<CategoryDocument>): Promise<CategoryDocument> {
    return await this.categoriesModel.findOne(entityFilterQuery).select(this.selectedFields);
  }

  // ########## SELECT CATEGOREIS LIST FROM CATEGOREIS TABLE ##########
  async getList(entityFilterQuery: FilterQuery<CategoryDocument>): Promise<CategoryDocument[]> {
    return await this.categoriesModel.find(entityFilterQuery).select(this.selectedFields);
  }
}
