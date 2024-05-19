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
import { CreateOrder, DeleteOrder, GetListOrder, GetOneOrder, UpdateOrder } from './helpers/ApiOrder.documentation';

@ApiTags('Orders')
@Controller('api/orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  // #################### CREATE NEW ORDER ####################
  @Post()
  @CreateOrder()
  async create(@Body() dto: CreateOrderDto): Promise<ApiResponse<OrderDocument>> {
    const order = await this.ordersService.create(dto);
    return new ApiResponse(Actions.CREATE, EntityType.ORDERS, order);
  }

  // #################### GET ORDER LIST ####################
  @Get()
  @GetListOrder()
  async getList(): Promise<ApiResponse<OrderDocument[]>> {
    const orders = await this.ordersService.getList();
    return new ApiResponse(Actions.GET_LIST, EntityType.ORDERS, orders);
  }

  // #################### GET ONE ORDER BY ORDERCODE ####################
  @Get(':orderCode')
  @GetOneOrder()
  async getOne(@Param('orderCode', ParseIntPipe) orderCode: number): Promise<ApiResponse<OrderDocument>> {
    const order = await this.ordersService.getOneByOrderCode(orderCode);
    return new ApiResponse(Actions.GET, EntityType.ORDERS, order);
  }

  // #################### DELETE ORDER BY ORDERCODE ####################
  @Delete(':orderCode')
  @DeleteOrder()
  async delete(@Param('orderCode', ParseIntPipe) orderCode: number): Promise<ApiResponse<OrderDocument>> {
    const order = await this.ordersService.delete(orderCode);
    return new ApiResponse(Actions.DELETE, EntityType.ORDERS, order);
  }

  // #################### UPDATE ORDER BY ORDERCODE ####################
  @Patch(':orderCode')
  @UpdateOrder()
  async update(@Param('orderCode', ParseIntPipe) orderCode: number, @Body() dto: UpdateOrderDto) {
    const order = await this.ordersService.update(orderCode, dto);
    return new ApiResponse(Actions.UPDATE, EntityType.ORDERS, order);
  }
}
