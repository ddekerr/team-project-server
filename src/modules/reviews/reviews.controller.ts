import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Patch, Post, Param, Delete, Get, Query } from '@nestjs/common';
import { ApiResponse } from 'helpers/ApiResponse';
import { ReviewsService } from './reviews.service';
import { ReviewDocument } from './schemas/review.schema';
import { Actions, EntityType } from 'types';

import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateRewievDto } from './dto/update-review.dto';
import { QueryParamsDto } from './dto/query-params.dto';

import { CreateReview, DeleteRewiev, GetReviewsList, UpdateRewiev } from './helpers/ApiReviews.documentation';

@ApiTags('Reviews')
@Controller('api/reviews')
export class ReviewsController {
  constructor(private reviwsService: ReviewsService) {}

  // #################### CREATE REVIEW ####################
  @Post()
  @CreateReview()
  async create(@Body() dto: CreateReviewDto): Promise<ApiResponse<ReviewDocument>> {
    const review = await this.reviwsService.create(dto);
    return new ApiResponse(Actions.CREATE, EntityType.REVIEW, review);
  }

  // #################### UPDATE REVIEW ####################
  @Patch(':id')
  @UpdateRewiev()
  async update(@Param('id') id: string, @Body() dto: UpdateRewievDto): Promise<ApiResponse<ReviewDocument>> {
    const review = await this.reviwsService.update(id, dto);
    return new ApiResponse(Actions.UPDATE, EntityType.REVIEW, review);
  }

  // #################### DELETE REVIEW ####################
  @Delete(':id')
  @DeleteRewiev()
  async delete(@Param('id') id: string): Promise<ApiResponse<string>> {
    const message = await this.reviwsService.delete(id);
    return new ApiResponse(Actions.UPDATE, EntityType.REVIEW, message);
  }

  // #################### GET REVIEWS LIST ####################
  @Get()
  @GetReviewsList()
  async getList(@Query() params: QueryParamsDto): Promise<ApiResponse<ReviewDocument[]>> {
    const reviews = await this.reviwsService.getList(params);
    return new ApiResponse(Actions.GET_LIST, EntityType.REVIEW, reviews);
  }
}
