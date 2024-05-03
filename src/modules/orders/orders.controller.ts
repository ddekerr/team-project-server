import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order, OrderDocument } from './schemas/order.chema';

import { Actions, EntityType } from 'types';
import validationMessage from 'constants/validationMessage';

import { ApiResponse } from 'helpers/ApiResponse';
import { ApiSwaggerArrayResponse } from 'helpers/ApiSwaggerArrayResponse';
import { ApiSwaggerResponse } from 'helpers/ApiSwaggerResponse';
import { ApiValidationError } from 'helpers/ApiValidationError';

@ApiTags('Orders')
@Controller('api/orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create new order' })
  @ApiBody({ type: CreateOrderDto })
  @ApiSwaggerResponse(Actions.CREATE, EntityType.ORDERS, Order)
  @ApiBadRequestResponse({ type: ApiValidationError, description: validationMessage.VALIDATION_ERROR })
  async create(@Body() dto: CreateOrderDto): Promise<ApiResponse<OrderDocument>> {
    const order = await this.ordersService.create(dto);
    return new ApiResponse(Actions.CREATE, EntityType.ORDERS, order);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get orders list' })
  @ApiSwaggerArrayResponse(Actions.GET_LIST, EntityType.ORDERS, Order)
  async getList(): Promise<ApiResponse<OrderDocument[]>> {
    const orders = await this.ordersService.getList();
    return new ApiResponse(Actions.GET_LIST, EntityType.ORDERS, orders);
  }
}
