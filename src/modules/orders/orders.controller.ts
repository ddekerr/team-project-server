import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiResponse } from 'helpers/ApiResponse';
import { Order, OrderDocument } from './schemas/order.chema';
import { Actions, EntityType } from 'types';
import { ApiSwaggerResponse } from 'helpers/ApiSwaggerResponse';
import { ApiValidationError } from 'helpers/ApiValidationError';
import validationMessage from 'constants/validationMessage';

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
}
