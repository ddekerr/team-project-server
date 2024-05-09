import { Injectable } from '@nestjs/common';
import { ReviewsRepository } from './reviews.repository';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewDocument } from './schemas/review.schema';
import { UsersService } from 'modules/user/users.service';
import { ProductsService } from 'modules/products/products.service';
import { UpdateRewievDto } from './dto/update-review.dto';
import successMessages from 'constants/successMessages';
import { QueryParamsDto } from './dto/query-params.dto';

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
    const { userEmail, productId, rating } = dto;

    const user = await this.usersService.getUser(userEmail);
    const product = await this.productService.getOneById(productId);
    await this.productService.updateRating(product.id, rating);

    console.log(product);

    const review = await this.reviewsRepository.create({ user, product, ...dto });
    return review;
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
    console.log(filter);

    const reviews = await this.reviewsRepository.getList(filter);
    return reviews;
  }

  // #################### SET FILTER ####################
  private setFilter(params?: QueryParamsDto): { product?: { id: number }; user?: { id: string } } {
    const filter = Object.entries(params).reduce((prev, [keyParam, valueParam]) => {
      if (keyParam === 'productId') {
        prev['product.id'] = Number(valueParam);
      }

      if (keyParam === 'userId') {
        prev['user._id'] = valueParam;
      }

      return prev;
    }, {});

    return filter;
  }
}
