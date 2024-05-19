import { applyDecorators, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiBadRequestResponse, ApiNotFoundResponse, ApiParam } from '@nestjs/swagger';

import { ApiSwaggerResponse } from 'helpers/ApiSwaggerResponse';
import { ApiValidationError } from 'helpers/ApiValidationError';
import { ApiSwaggerArrayResponse } from 'helpers/ApiSwaggerArrayResponse';
import { ApiError } from 'helpers/ApiError';

import { UpdateOrderDto } from '../dto/update-order.dto';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Actions, EntityType } from 'types';
import { Order } from '../schemas/order.shema';
import validationMessage from 'constants/validationMessage';
import exceptionMessages from 'constants/exceptionMessages';

export function ApiCreateOrder() {
  return applyDecorators(
    HttpCode(201),
    ApiOperation({ summary: 'Create new order' }),
    ApiBody({ type: CreateOrderDto }),
    ApiBadRequestResponse({ type: ApiValidationError, description: validationMessage.VALIDATION_ERROR }),
    ApiBadRequestResponse({ 
      status: 404, 
      description: exceptionMessages.NOT_FOUND_PRODUCT_MSG,
      type: ApiValidationError,
    }),    
    ApiSwaggerResponse(Actions.CREATE, EntityType.ORDERS, Order),
  );
}

export function ApiGetListOrder() {
  return applyDecorators(
    HttpCode(200),
    ApiOperation({ summary: 'Get orders list' }),
    ApiSwaggerArrayResponse(Actions.GET_LIST, EntityType.ORDERS, Order),
  );
}

export function ApiGetOneOrder() {
  return applyDecorators(
    HttpCode(200),
    ApiOperation({ summary: 'Get one orders by OrderCode' }),
    ApiParam({ name: 'orderCode', type: Number }),
    ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_ORDER_MSG }),
    ApiBadRequestResponse({ type: ApiValidationError, description: validationMessage.VALIDATION_ERROR }),
    ApiSwaggerResponse(Actions.GET, EntityType.ORDERS, Order),
  );
}

export function ApiDeleteOrder() {
  return applyDecorators(
    HttpCode(200),
    ApiOperation({ summary: 'Delete order by OrderCode' }),
    ApiParam({ name: 'orderCode', type: Number }),
    ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_ORDER_MSG }),
    ApiBadRequestResponse({ type: ApiValidationError, description: validationMessage.VALIDATION_ERROR }),
    ApiSwaggerResponse(Actions.DELETE, EntityType.ORDERS, Order),
  );
}

export function ApiUpdateOrder() {
  return applyDecorators(
    HttpCode(200),
    ApiOperation({ summary: 'Update order by orderCode' }),
    ApiParam({ name: 'orderCode', type: Number }),
    ApiBody({ type: UpdateOrderDto }),
    ApiSwaggerResponse(Actions.UPDATE, EntityType.ORDERS, Order),
    ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_ORDER_MSG }),
    ApiBadRequestResponse({ type: ApiValidationError, description: validationMessage.VALIDATION_ERROR }),
  );
}
