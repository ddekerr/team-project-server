import { ApiResponse } from 'helpers/ApiResponse';
import { ReviewsService } from './reviews.service';
import { Body, Controller, HttpCode, Patch, Post, Param, Delete, Get, Query } from '@nestjs/common';
import { Review, ReviewDocument } from './schemas/review.schema';
import { CreateReviewDto } from './dto/create-review.dto';
import { Actions, EntityType } from 'types';
import { UpdateRewievDto } from './dto/update-review.dto';
import { QueryParamsDto } from './dto/query-params.dto';
import { ApiBadRequestResponse, ApiBody, ApiNotFoundResponse, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ApiSwaggerResponse } from 'helpers/ApiSwaggerResponse';
import { ApiError } from 'helpers/ApiError';
import exceptionMessages from 'constants/exceptionMessages';
import { ApiValidationError } from 'helpers/ApiValidationError';
import validationMessage from 'constants/validationMessage';
import { ApiSwaggerArrayResponse } from 'helpers/ApiSwaggerArrayResponse';

@Controller('api/reviews')
export class ReviewsController {
  constructor(private reviwsService: ReviewsService) {}

  // #################### CREATE REVIEW ####################
  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create new review' })
  @ApiBody({ type: CreateReviewDto })
  @ApiSwaggerResponse(Actions.CREATE, EntityType.REVIEW, Review)
  @ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_USER_MSG })
  @ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_PRODUCT_MSG })
  @ApiBadRequestResponse({ type: ApiValidationError, description: validationMessage.VALIDATION_ERROR })
  async create(@Body() dto: CreateReviewDto): Promise<ApiResponse<ReviewDocument>> {
    const review = await this.reviwsService.create(dto);
    return new ApiResponse(Actions.CREATE, EntityType.REVIEW, review);
  }

  // #################### UPDATE REVIEW ####################
  @Patch(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update review by ID' })
  @ApiParam({ name: '_id', type: String })
  @ApiBody({ type: UpdateRewievDto })
  @ApiSwaggerResponse(Actions.UPDATE, EntityType.REVIEW, Review)
  @ApiBadRequestResponse({ type: ApiValidationError, description: validationMessage.VALIDATION_ERROR })
  async update(@Param('id') id: string, @Body() dto: UpdateRewievDto): Promise<ApiResponse<ReviewDocument>> {
    const review = await this.reviwsService.update(id, dto);
    return new ApiResponse(Actions.UPDATE, EntityType.REVIEW, review);
  }

  // #################### DELETE REVIEW ####################
  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete review by ID' })
  @ApiParam({ name: '_id', type: String })
  @ApiSwaggerResponse(Actions.CREATE, EntityType.PRODUCT, String)
  async delete(@Param('id') id: string): Promise<ApiResponse<string>> {
    const message = await this.reviwsService.delete(id);
    return new ApiResponse(Actions.UPDATE, EntityType.REVIEW, message);
  }

  // #################### GET REVIEWS LIST ####################
  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get Review list' })
  @ApiQuery({ name: 'productId', type: String, required: false })
  @ApiQuery({ name: 'userId', type: String, required: false })
  @ApiSwaggerArrayResponse(Actions.GET_LIST, EntityType.REVIEW, Review)
  @ApiBadRequestResponse({ type: ApiValidationError, description: validationMessage.VALIDATION_ERROR })
  async getList(@Query() params: QueryParamsDto): Promise<ApiResponse<ReviewDocument[]>> {
    const reviews = await this.reviwsService.getList(params);
    return new ApiResponse(Actions.GET_LIST, EntityType.REVIEW, reviews);
  }
}
