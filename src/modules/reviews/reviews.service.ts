import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewsRepository } from './reviews.repository';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewDocument } from './schemas/review.schema';
import { UsersService } from 'modules/user/users.service';
import { ProductsService } from 'modules/products/products.service';
import { UpdateRewievDto } from './dto/update-review.dto';
import successMessages from 'constants/successMessages';
import { QueryParamsDto } from './dto/query-params.dto';
import exceptionMessages from 'constants/exceptionMessages';

@Injectable()
export class ReviewsService {
  constructor(
    private reviewsRepository: ReviewsRepository,
    private usersService: UsersService,
    private productService: ProductsService,
  ) {}

  // #################### CREATE REVIEW ####################
  async create(dto: CreateReviewDto): Promise<ReviewDocument> {
    // const { userEmail, productId, rating, advantages, disadvantages, comment } = dto;
    const { userId, productId, rating } = dto;

    const product = await this.productService.getOneById(productId);

    await this.checkReviewUserId(userId, productId);

    await this.productService.updateRating(product._id, rating);

    const review = await this.reviewsRepository.create({ ...dto });

    review.product = product;

    return await review.save();
  }

  // #################### CHECK REVIEW EXIST ####################
  async checkReviewUserId(userId: string, productId: string): Promise<void> {
    const review = await this.reviewsRepository.getOne({ userId, 'product._id': productId });
    if (!(typeof review === 'object' && review === null)) {
      throw new NotFoundException(exceptionMessages.LEFT_REVIEW);
    }
  }

  // #################### UPDATE REVIEW ####################
  async update(_id: string, dto: UpdateRewievDto): Promise<ReviewDocument> {
    const review = await this.reviewsRepository.update({ _id }, dto);
    return review;
  }

  // #################### DELETE REVIEW ####################
  async delete(_id: string): Promise<string> {
    await this.reviewsRepository.delete({ _id });
    return successMessages.REVIEW_DELETE_MSG;
  }

  // #################### GET REVIEWS LIST ####################
  async getList(params?: QueryParamsDto): Promise<ReviewDocument[]> {
    const filter = this.setFilter(params);
    const reviews = await this.reviewsRepository.getList(filter);
    return reviews;
  }

  // #################### SET FILTER ####################
  private setFilter(params?: QueryParamsDto): { product?: { _id: string }; user?: { _id: string } } {
    const filter = Object.entries(params).reduce((prev, [keyParam, valueParam]) => {
      if (keyParam === 'productId') {
        prev['product._id'] = valueParam;
      }

      if (keyParam === 'userId') {
        prev['userId'] = valueParam;
      }

      return prev;
    }, {});

    return filter;
  }
}
