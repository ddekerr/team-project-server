import { ApiResponse } from 'helpers/ApiResponse';
import { ReviewsService } from './reviews.service';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ReviewDocument } from './schemas/review.schema';
import { CreateReviewDto } from './dto/create-review.dto';
import { Actions, EntityType } from 'types';

@Controller('api/reviews')
export class ReviewsController {
  constructor(private reviwsService: ReviewsService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() dto: CreateReviewDto): Promise<ApiResponse<ReviewDocument>> {
    const review = await this.reviwsService.create(dto);
    return new ApiResponse(Actions.CREATE, EntityType.REVIEW, review);
  }
}
