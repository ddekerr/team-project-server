import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { ApiSwaggerResponse } from 'helpers/ApiSwaggerResponse';
import success from 'constants/successMessages';
import exceptionMessages from 'constants/exceptionMessages';
import { ApiResponse } from 'helpers/ApiResponse';
import { ApiValidationError } from 'helpers/ApiValidationError';
import { ApiSwaggerArrayResponse } from 'helpers/ApiSwaggerArrayResponse';

@ApiTags('Products')
@Controller('api/products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  // ########## CREATE NEW PRODUCT ##########
  @Post()
  @ApiSwaggerResponse(HttpStatus.CREATED, Product, success.PRODUCT_CREATED_MSG)
  @ApiUnprocessableEntityResponse({
    description: exceptionMessages.VALIDATION_MESSAGE,
    type: ApiValidationError,
  })
  async create(
    @Body() dto: CreateProductDto,
  ): Promise<ApiResponse<ProductDocument>> {
    const product = await this.productsService.create(dto);
    return new ApiResponse(
      HttpStatus.CREATED,
      product,
      success.PRODUCT_CREATED_MSG,
    );
  }

  // ########## UPDATE PRODUCT BY ID ##########
  @Patch(':id')
  @ApiSwaggerResponse(HttpStatus.OK, Product, success.PRODUCT_UPDATED_MSG)
  @ApiUnprocessableEntityResponse({
    description: exceptionMessages.VALIDATION_MESSAGE,
    type: ApiValidationError,
  })
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateProductDto,
  ): Promise<ApiResponse<ProductDocument>> {
    const product = await this.productsService.update(id, dto);
    return new ApiResponse(HttpStatus.OK, product, success.PRODUCT_UPDATED_MSG);
  }

  // ########## DELETE PRODUCT BY ID ##########
  @Delete(':id')
  @ApiSwaggerResponse(HttpStatus.OK, Product, success.PRODUCT_DELETED_MSG)
  async delete(@Param('id') id: number): Promise<ApiResponse<ProductDocument>> {
    const product = await this.productsService.delete(id);
    return new ApiResponse(HttpStatus.OK, product, success.PRODUCT_DELETED_MSG);
  }

  // ########## GET ONE PRODUCT BY ID ##########
  @Get(':id')
  @ApiSwaggerResponse(HttpStatus.OK, Product)
  async getOne(@Param('id') id: number): Promise<ApiResponse<ProductDocument>> {
    const product = await this.productsService.getOne(id);
    return new ApiResponse(HttpStatus.OK, product);
  }

  // ########## GET PRODUCTS LIST ##########
  @Get()
  @ApiSwaggerArrayResponse(HttpStatus.OK, Product)
  async getList(): Promise<ApiResponse<ProductDocument[]>> {
    const products = await this.productsService.getList();
    return new ApiResponse(HttpStatus.OK, products);
  }
}
