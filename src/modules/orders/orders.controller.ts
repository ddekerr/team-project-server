import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiNotFoundResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order, OrderDocument } from './schemas/order.shema';

import { Actions, EntityType } from 'types';
import validationMessage from 'constants/validationMessage';

import { ApiResponse } from 'helpers/ApiResponse';
import { ApiSwaggerArrayResponse } from 'helpers/ApiSwaggerArrayResponse';
import { ApiSwaggerResponse } from 'helpers/ApiSwaggerResponse';
import { ApiValidationError } from 'helpers/ApiValidationError';
import { ApiError } from 'helpers/ApiError';
import exceptionMessages from 'constants/exceptionMessages';
import { UpdateOrderDto } from './dto/update-order.dto';

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

  // #################### GET ORDER LIST ####################
  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get orders list' })
  @ApiSwaggerArrayResponse(Actions.GET_LIST, EntityType.ORDERS, Order)
  async getList(): Promise<ApiResponse<OrderDocument[]>> {
    const orders = await this.ordersService.getList();
    return new ApiResponse(Actions.GET_LIST, EntityType.ORDERS, orders);
  }

  // #################### GET ONE ORDER BY ORDERCODE ####################
  @Get(':orderCode')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get one orders by OrderCode' })
  @ApiSwaggerResponse(Actions.GET, EntityType.ORDERS, Order)
  @ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_ORDER_MSG })
  async getOne(@Param('orderCode', ParseIntPipe) orderCode: number): Promise<ApiResponse<OrderDocument>> {
    const order = await this.ordersService.getOneByOrderCode(orderCode);
    return new ApiResponse(Actions.GET, EntityType.ORDERS, order);
  }

  // #################### DELETE ORDER BY ORDERCODE ####################
  @Delete(':orderCode')
  @HttpCode(200)
  @ApiParam({ name: 'orderCode', type: Number })
  @ApiOperation({ summary: 'Delete order by OrderCode' })
  @ApiSwaggerResponse(Actions.DELETE, EntityType.ORDERS, Order)
  async delete(@Param('orderCode', ParseIntPipe) orderCode: number): Promise<ApiResponse<OrderDocument>> {
    const order = await this.ordersService.delete(orderCode);
    return new ApiResponse(Actions.DELETE, EntityType.ORDERS, order);
  }

  // #################### UPDATE ORDER BY ORDERCODE ####################
  @Patch(':orderCode')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update order by orderCode' })
  @ApiParam({ name: 'orderCode', type: Number })
  @ApiBody({ type: CreateOrderDto })
  @ApiSwaggerResponse(Actions.UPDATE, EntityType.ORDERS, Order)
  @ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_ORDER_MSG })
  @ApiBadRequestResponse({ type: ApiValidationError, description: validationMessage.VALIDATION_ERROR })
  async update(@Param('orderCode', ParseIntPipe) orderCode: number, @Body() dto: UpdateOrderDto) {
    const order = await this.ordersService.update(orderCode, dto);
    return new ApiResponse(Actions.UPDATE, EntityType.ORDERS, order);
  }
}
