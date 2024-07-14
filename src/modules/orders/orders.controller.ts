import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order, OrderDocument } from './schemas/order.shema';

import { Actions, EntityType } from 'types';

import { ApiResponse } from 'helpers/ApiResponse';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiCreateOrder, ApiDeleteOrder, ApiGetListOrder, ApiGetOneOrder, ApiUpdateOrder } from './helpers/ApiOrder.documentation';

@ApiTags('Orders')
@Controller('api/orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  // #################### CREATE NEW ORDER ####################
  @Post()
  @ApiCreateOrder()
  async create(@Body() dto: CreateOrderDto): Promise<ApiResponse<OrderDocument>> {
    const order = await this.ordersService.create(dto);
    return new ApiResponse(Actions.CREATE, EntityType.ORDERS, order);
  }

  // #################### GET ORDER LIST ####################
  @Get()
  @ApiGetListOrder()
  async getList(@Query() params): Promise<ApiResponse<OrderDocument[]>> {
    const orders = await this.ordersService.getList(params);
    return new ApiResponse(Actions.GET_LIST, EntityType.ORDERS, orders);
  }

  // #################### GET ONE ORDER BY ORDERCODE ####################
  @Get(':orderCode')
  @ApiGetOneOrder()
  async getOne(@Param('orderCode', ParseIntPipe) orderCode: number): Promise<ApiResponse<OrderDocument>> {
    const order = await this.ordersService.getOneByOrderCode(orderCode);
    return new ApiResponse(Actions.GET, EntityType.ORDERS, order);
  }

  // #################### DELETE ORDER BY ORDERCODE ####################
  @Delete(':orderCode')
  @ApiDeleteOrder()
  async delete(@Param('orderCode', ParseIntPipe) orderCode: number): Promise<ApiResponse<OrderDocument>> {
    const order = await this.ordersService.delete(orderCode);
    return new ApiResponse(Actions.DELETE, EntityType.ORDERS, order);
  }

  // #################### UPDATE ORDER BY ORDERCODE ####################
  @Patch(':orderCode')
  @ApiUpdateOrder()
  async update(@Param('orderCode', ParseIntPipe) orderCode: number, @Body() dto: UpdateOrderDto) {
    const order = await this.ordersService.update(orderCode, dto);
    return new ApiResponse(Actions.UPDATE, EntityType.ORDERS, order);
  }
}
