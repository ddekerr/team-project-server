import { Injectable } from '@nestjs/common';
import { ReviewsRepository } from './reviews.repository';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewDocument } from './schemas/review.schema';
import { UsersService } from 'modules/user/users.service';
import { ProductsService } from 'modules/products/products.service';

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

    const review = await this.reviewsRepository.create({ user, product, ...dto });
    return review;
  }
}
