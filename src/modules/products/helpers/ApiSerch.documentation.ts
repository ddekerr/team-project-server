import { applyDecorators, HttpCode } from '@nestjs/common';
import {
  ApiOperation,
  ApiBody,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiParam,
  ApiQuery,
  ApiConsumes,
} from '@nestjs/swagger';
import exceptionMessages from 'constants/exceptionMessages';
import validationMessage from 'constants/validationMessage';
import { ApiError } from 'helpers/ApiError';
import { ApiSwaggerResponse } from 'helpers/ApiSwaggerResponse';
import { ApiValidationError } from 'helpers/ApiValidationError';
import { Actions, EntityType } from 'types';
import { CreateProductDto } from '../dto/create-product.dto';
import { Product } from '../schemas/product.schema';
import { FileUploadDto } from '../dto/file-upload.dto';
import { RateDto } from '../dto/rate.dto';

export function ApiCreateProduct() {
  return applyDecorators(
    HttpCode(201),
    ApiOperation({ summary: 'Create new product' }),
    ApiBody({ type: CreateProductDto }),
    ApiSwaggerResponse(Actions.CREATE, EntityType.PRODUCT, Product),
    ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_CATEGORY_MSG }),
    ApiBadRequestResponse({ type: ApiValidationError, description: validationMessage.VALIDATION_ERROR }),
  );
}

export function ApiUpdateProduct() {
  return applyDecorators(
    HttpCode(200),
    ApiOperation({ summary: 'Update product by ID' }),
    ApiParam({ name: 'id', type: String }),
    ApiBody({ type: CreateProductDto }),
    ApiSwaggerResponse(Actions.UPDATE, EntityType.PRODUCT, Product),
    ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_CATEGORY_MSG }),
    ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_PRODUCT_MSG }),
    ApiBadRequestResponse({ type: ApiError, description: exceptionMessages.MONGO_INVALID_ID }),
    ApiBadRequestResponse({ type: ApiValidationError, description: validationMessage.VALIDATION_ERROR }),
  );
}

export function ApiDeleteProduct() {
  return applyDecorators(
    HttpCode(200),
    ApiOperation({ summary: 'Delete product by ID' }),
    ApiParam({ name: '_id', type: String }),
    ApiParam({ name: 'id', type: String }),
    ApiSwaggerResponse(Actions.DELETE, EntityType.PRODUCT, Product),
    ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_PRODUCT_MSG }),
    ApiBadRequestResponse({ type: ApiError, description: exceptionMessages.MONGO_INVALID_ID }),
    ApiBadRequestResponse({ type: ApiValidationError, description: validationMessage.VALIDATION_ERROR }),
  );
}

export function ApiGetOneProduct() {
  return applyDecorators(
    HttpCode(200),
    ApiOperation({ summary: 'Get one product by ID' }),
    ApiParam({ name: 'id', type: String }),
    ApiSwaggerResponse(Actions.GET, EntityType.PRODUCT, Product),
    ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_PRODUCT_MSG }),
    ApiBadRequestResponse({ type: ApiError, description: exceptionMessages.MONGO_INVALID_ID }),
  );
}

export function ApiGetProductList() {
  return applyDecorators(
    HttpCode(200),
    ApiOperation({ summary: 'Get Product list' }),
    ApiQuery({ name: 'category', type: String, required: false }),
    ApiQuery({ name: 'search', type: String, required: false }),
    ApiSwaggerResponse(Actions.GET_LIST, EntityType.PRODUCT, Product),
  );
}

export function ApiUploadPosterProduct() {
  return applyDecorators(
    HttpCode(200),
    ApiOperation({ summary: 'Upload poster to product by ID' }),
    ApiBody({ type: FileUploadDto }),
    ApiParam({ name: 'id', type: String }),
    ApiSwaggerResponse(Actions.ADD_POSTER, EntityType.PRODUCT, Product),
    ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_PRODUCT_MSG }),
    ApiConsumes('multipart/form-data'),
    ApiBadRequestResponse({ type: ApiError, description: exceptionMessages.MONGO_INVALID_ID }),
  );
}

export function ApiAddImageProduct() {
  return applyDecorators(
    HttpCode(200),
    ApiOperation({ summary: 'ADD images to product by ProductID' }),
    ApiBody({ type: FileUploadDto }),
    ApiConsumes('multipart/form-data'),
    ApiParam({ name: 'productId', type: String }),
    ApiSwaggerResponse(Actions.ADD_IMAGE, EntityType.PRODUCT, Product),
    ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_PRODUCT_MSG }),
    ApiBadRequestResponse({ type: ApiError, description: exceptionMessages.MONGO_INVALID_ID }),
    ApiBadRequestResponse({ type: ApiError, description: exceptionMessages.LIMIT_ADD_NEW_IMAGE }),
  );
}

export function ApiDeleteImageProductById() {
  return applyDecorators(
    HttpCode(200),
    ApiOperation({ summary: 'Delete image to product by ImageId' }),
    ApiBody({ type: FileUploadDto }),
    ApiParam({ name: 'productId', type: String }),
    ApiParam({ name: 'imageId', type: String }),
    ApiSwaggerResponse(Actions.DELETE, EntityType.PRODUCT, Product),
    ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_PRODUCT_MSG }),
    ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_IMAGE_BY_IDIMAGE }),
    ApiBadRequestResponse({ type: ApiError, description: exceptionMessages.MONGO_INVALID_ID }),
  );
}

export function ApiRateProduct() {
  return applyDecorators(
    HttpCode(200),
    ApiOperation({ summary: 'Rate product by ID' }),
    ApiBody({ type: RateDto }),
    ApiSwaggerResponse(Actions.RATE, EntityType.PRODUCT, Product),
    ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_PRODUCT_MSG }),
    ApiBadRequestResponse({ type: ApiError, description: exceptionMessages.MONGO_INVALID_ID }),
  );
}

export function ApiSearchProduct() {
  return applyDecorators(
    HttpCode(200),
    ApiOperation({ summary: 'Search product by query' }),
    ApiQuery({ name: 'search', type: String }),
    ApiSwaggerResponse(Actions.GET_LIST, EntityType.PRODUCT, Product),
  );
}
