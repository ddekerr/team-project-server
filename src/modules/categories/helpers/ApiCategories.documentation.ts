import { applyDecorators, HttpCode } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

import { Actions, EntityType } from 'types';
import validationMessage from 'constants/validationMessage';
import exceptionMessages from 'constants/exceptionMessages';
import { Category } from '../schemas/category.schema';

import { ApiSwaggerArrayResponse } from 'helpers/ApiSwaggerArrayResponse';
import { ApiSwaggerResponse } from 'helpers/ApiSwaggerResponse';
import { ApiValidationError } from 'helpers/ApiValidationError';
import { ApiError } from 'helpers/ApiError';

export function CreateCategory() {
  return applyDecorators(
    HttpCode(201),
    ApiOperation({
      summary: 'Create new category',
      description:
        'If there is a "parent" field in Request Body, then the created category is added to parent categoty in the "children" field',
    }),
    ApiBody({ type: CreateCategoryDto }),
    ApiBadRequestResponse({ type: ApiValidationError, description: validationMessage.VALIDATION_ERROR }),
    ApiConflictResponse({
      status: 409,
      description: exceptionMessages.CONFLICT_CATEGORY_MSG,
      type: ApiError,
    }),
    ApiSwaggerResponse(Actions.CREATE, EntityType.CATEGORY, Category),
  );
}

export function UpdateCategory() {
  return applyDecorators(
    ApiOperation({ summary: 'Update one category by slug' }),
    ApiParam({ name: 'slug', type: String }),
    ApiBody({ type: UpdateCategoryDto }),
    ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_CATEGORY_MSG }),
    ApiBadRequestResponse({ type: ApiValidationError, description: validationMessage.VALIDATION_ERROR }),
    ApiSwaggerResponse(Actions.UPDATE, EntityType.CATEGORY, Category),
  );
}

export function DeleteCategory() {
  return applyDecorators(
    HttpCode(200),
    ApiOperation({ summary: 'Delete one category by slug' }),
    ApiParam({ name: 'slug', type: String }),
    ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_CATEGORY_MSG }),
    ApiBadRequestResponse({ type: ApiValidationError, description: validationMessage.VALIDATION_ERROR }),
    ApiSwaggerResponse(Actions.DELETE, EntityType.CATEGORY, Category),
  );
}

export function GetListCategory() {
  return applyDecorators(
    HttpCode(200),
    ApiOperation({
      summary: 'Get list of all parent categories',
      description:
        'Get all category which have no parent (parent = null), but they have all children categories inside "children" field',
    }),
    ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_CATEGORY_MSG }),
    ApiSwaggerArrayResponse(Actions.GET_LIST, EntityType.CATEGORY, Category),
  );
}
