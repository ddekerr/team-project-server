import { applyDecorators, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiNotFoundResponse, ApiBadRequestResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

import exceptionMessages from 'constants/exceptionMessages';
import validationMessage from 'constants/validationMessage';

import { ApiError } from 'helpers/ApiError';
import { ApiSwaggerResponse } from 'helpers/ApiSwaggerResponse';
import { ApiValidationError } from 'helpers/ApiValidationError';
import { ApiSwaggerArrayResponse } from 'helpers/ApiSwaggerArrayResponse';

import { Actions, EntityType } from 'types';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateRewievDto } from '../dto/update-review.dto';
import { Review } from '../schemas/review.schema';

export function ApiCreateReview() {
  return applyDecorators(
    HttpCode(201),
    ApiOperation({ summary: 'Create new review' }),
    ApiBody({ type: CreateReviewDto }),
    ApiSwaggerResponse(Actions.CREATE, EntityType.REVIEW, Review),
    ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_USER_MSG }),
    ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_PRODUCT_MSG }),
    ApiBadRequestResponse({ type: ApiValidationError, description: validationMessage.VALIDATION_ERROR }),
  );
}

export function ApiUpdateRewiev() {
  return applyDecorators(
    HttpCode(200),
    ApiOperation({ summary: 'Update review by ID' }),
    ApiParam({ name: 'id', type: String }),
    ApiBody({ type: UpdateRewievDto }),
    ApiBadRequestResponse({ type: ApiValidationError, description: validationMessage.VALIDATION_ERROR }),
    ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_REVIEW_MSG }),
    ApiSwaggerResponse(Actions.UPDATE, EntityType.REVIEW, Review),
  );
}

export function ApiDeleteRewiev() {
  return applyDecorators(
    HttpCode(200),
    ApiOperation({ summary: 'Delete review by ID' }),
    ApiParam({ name: 'id', type: String }),
    ApiBadRequestResponse({ type: ApiValidationError, description: validationMessage.VALIDATION_ERROR }),
    ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_REVIEW_MSG }),
    ApiSwaggerResponse(Actions.CREATE, EntityType.PRODUCT, String),
  );
}

export function ApiGetReviewsList() {
  return applyDecorators(
    HttpCode(200),
    ApiOperation({ summary: 'Get Review list' }),
    ApiQuery({ name: 'productId', type: String, required: false }),
    ApiQuery({ name: 'userId', type: String, required: false }),
    ApiBadRequestResponse({ type: ApiValidationError, description: validationMessage.VALIDATION_ERROR }),
    ApiSwaggerArrayResponse(Actions.GET_LIST, EntityType.REVIEW, Review),
  );
}
