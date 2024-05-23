import { Review, ReviewDocument } from './schemas/review.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery, UpdateQuery } from 'mongoose';

@Injectable()
export class ReviewsRepository {
  constructor(@InjectModel(Review.name) private reviewsModel: Model<ReviewDocument>) {}

  // ########## INSERT NEW REVIEW INTO REVIEWS TABLE ##########
  async create(createEntityData: unknown): Promise<ReviewDocument> {
    const newReview = await this.reviewsModel.create(createEntityData);
    return newReview;
  }

  // ########## UPDATE PRODUCT FROM PRODUCT TABLE ##########
  async update(
    entityFilterQuery: FilterQuery<ReviewDocument>,
    updateEntityData: UpdateQuery<unknown>,
  ): Promise<ReviewDocument> {
    return await this.reviewsModel.findOneAndUpdate(entityFilterQuery, updateEntityData, {
      new: true,
    });
  }

  // ########## DELETE REVIEW FROM REVIEWS TABLE ##########
  async delete(entityFilterQuery: FilterQuery<ReviewDocument>): Promise<ReviewDocument> {
    return await this.reviewsModel.findOneAndDelete(entityFilterQuery, {});
  }

  // ########## SELECT REVIEWS LIST FROM REVIEWS TABLE ##########
  async getList(entityFilterQuery: FilterQuery<ReviewDocument>): Promise<ReviewDocument[]> {
    return await this.reviewsModel.find(entityFilterQuery);
  }

  // ########## SELECT ONE REVIEW FROM REVIEW TABLE ##########
  async getOne(entityFilterQuery: FilterQuery<ReviewDocument>): Promise<ReviewDocument>{
    return await this.reviewsModel.findOne(entityFilterQuery);
  }
}
