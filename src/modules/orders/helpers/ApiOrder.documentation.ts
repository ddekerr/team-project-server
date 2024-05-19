import { applyDecorators, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiBadRequestResponse, ApiNotFoundResponse, ApiParam } from '@nestjs/swagger';
import validationMessage from 'constants/validationMessage';
import { ApiSwaggerResponse } from 'helpers/ApiSwaggerResponse';
import { ApiValidationError } from 'helpers/ApiValidationError';
import { Actions, EntityType } from 'types';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from '../schemas/order.shema';
import { ApiSwaggerArrayResponse } from 'helpers/ApiSwaggerArrayResponse';
import { ApiError } from 'helpers/ApiError';
import exceptionMessages from 'constants/exceptionMessages';
import { UpdateOrderDto } from '../dto/update-order.dto';

export function CreateOrder() {
  return applyDecorators(
    HttpCode(201),
    ApiOperation({ summary: 'Create new order' }),
    ApiBody({ type: CreateOrderDto }),
    ApiBadRequestResponse({ type: ApiValidationError, description: validationMessage.VALIDATION_ERROR }),
    ApiSwaggerResponse(Actions.CREATE, EntityType.ORDERS, Order),
  );
}

export function GetListOrder() {
  return applyDecorators(
    HttpCode(200),
    ApiOperation({ summary: 'Get orders list' }),
    ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_ORDER_MSG }),
    ApiSwaggerArrayResponse(Actions.GET_LIST, EntityType.ORDERS, Order),
  );
}

export function GetOneOrder() {
  return applyDecorators(
    HttpCode(200),
    ApiOperation({ summary: 'Get one orders by OrderCode' }),
    ApiParam({ name: 'orderCode', type: Number }),
    ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_ORDER_MSG }),
    ApiBadRequestResponse({ type: ApiValidationError, description: validationMessage.VALIDATION_ERROR }),
    ApiSwaggerResponse(Actions.GET, EntityType.ORDERS, Order),
  );
}

export function DeleteOrder() {
  return applyDecorators(
    HttpCode(200),
    ApiOperation({ summary: 'Delete order by OrderCode' }),
    ApiParam({ name: 'orderCode', type: Number }),
    ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_ORDER_MSG }),
    ApiBadRequestResponse({ type: ApiValidationError, description: validationMessage.VALIDATION_ERROR }),
    ApiSwaggerResponse(Actions.DELETE, EntityType.ORDERS, Order),
  );
}

export function UpdateOrder() {
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
