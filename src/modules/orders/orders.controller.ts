import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order, OrderDocument } from './schemas/order.shema';

import { Actions, EntityType } from 'types';
import validationMessage from 'constants/validationMessage';

import { ApiResponse } from 'helpers/ApiResponse';
import { ApiSwaggerArrayResponse } from 'helpers/ApiSwaggerArrayResponse';
import { ApiSwaggerResponse } from 'helpers/ApiSwaggerResponse';
import { ApiValidationError } from 'helpers/ApiValidationError';

@ApiTags('Orders')
@Controller('api/orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) { }

  // #################### CREATE NEW ORDER ####################
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

  // #################### DELETE ORDER BY ID ####################
  @Delete(':orderCode')
  @HttpCode(200)
  @ApiParam({ name: 'orderCode', type: Number })
  @ApiOperation({ summary: 'Delete order by OrderCode' })
  @ApiSwaggerResponse(Actions.DELETE, EntityType.ORDERS, Order)
  async delete(@Param('orderCode', ParseIntPipe) orderCode: number): Promise<ApiResponse<OrderDocument>> {
    const order = await this.ordersService.delete(orderCode);
    return new ApiResponse(Actions.DELETE, EntityType.ORDERS, order);
  }
}
