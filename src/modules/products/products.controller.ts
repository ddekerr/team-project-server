import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOperation, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';

import { ProductsService } from './products.service';
import { Product, ProductDocument } from './schemas/product.schema';
import { AddCategoryDto, CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import success from 'constants/successMessages';
import exceptionMessages from 'constants/exceptionMessages';
import successMessages from 'constants/successMessages';

import { ApiResponse } from 'helpers/ApiResponse';
import { ApiValidationError } from 'helpers/ApiValidationError';
import { ApiSwaggerResponse } from 'helpers/ApiSwaggerResponse';
import { ApiSwaggerArrayResponse } from 'helpers/ApiSwaggerArrayResponse';
import { ApiError } from 'helpers/ApiError';

@ApiTags('Products')
@Controller('api/products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  // #################### CREATE NEW PRODUCT ####################
  @Post()
  @ApiOperation({ description: 'Create new product' })
  @ApiSwaggerResponse(HttpStatus.CREATED, Product, success.PRODUCT_CREATED_MSG)
  @ApiUnprocessableEntityResponse({
    description: exceptionMessages.VALIDATION_MESSAGE,
    type: ApiValidationError,
  })
  async create(@Body() dto: CreateProductDto): Promise<ApiResponse<ProductDocument>> {
    const product = await this.productsService.create(dto);
    return new ApiResponse(HttpStatus.CREATED, product, success.PRODUCT_CREATED_MSG);
  }

  // #################### UPDATE PRODUCT BY ID ####################
  @Patch(':id')
  @ApiOperation({ description: 'Update product by ID' })
  @ApiSwaggerResponse(HttpStatus.OK, Product, success.PRODUCT_UPDATED_MSG)
  @ApiUnprocessableEntityResponse({
    description: exceptionMessages.VALIDATION_MESSAGE,
    type: ApiValidationError,
  })
  async update(@Param('id') id: number, @Body() dto: UpdateProductDto) {
    const product = await this.productsService.update(id, dto);
    return new ApiResponse(HttpStatus.OK, product, success.PRODUCT_UPDATED_MSG);
  }

  // #################### DELETE PRODUCT BY ID ####################
  @Delete(':id')
  @ApiOperation({ description: 'Delete product by ID' })
  @ApiSwaggerResponse(HttpStatus.OK, Product, success.PRODUCT_DELETED_MSG)
  async delete(@Param('id') id: number): Promise<ApiResponse<ProductDocument>> {
    const product = await this.productsService.delete(id);
    return new ApiResponse(HttpStatus.OK, product, success.PRODUCT_DELETED_MSG);
  }

  // #################### GET ONE PRODUCT BY ID ####################
  @Get(':id')
  @ApiOperation({ description: 'Get one product by ID' })
  @ApiSwaggerResponse(HttpStatus.OK, Product)
  async getOne(@Param('id') id: number): Promise<ApiResponse<ProductDocument>> {
    const product = await this.productsService.getOneById(id);
    return new ApiResponse(HttpStatus.OK, product);
  }

  // #################### GET PRODUCTS LIST ####################
  @Get()
  @ApiOperation({ description: 'Get Product list' })
  @ApiSwaggerArrayResponse(HttpStatus.OK, Product)
  async getList(): Promise<ApiResponse<ProductDocument[]>> {
    const products = await this.productsService.getList();
    return new ApiResponse(HttpStatus.OK, products);
  }

  // #################### ADD POSTER TO PRODUCT ####################
  @Patch(':id/upload-poster')
  @ApiOperation({ description: 'Upload poster to product by ID' })
  @ApiSwaggerResponse(HttpStatus.OK, Product, successMessages.PRODUCT_POSTER_ADD_MSG)
  @ApiNotFoundResponse({
    description: exceptionMessages.NOT_FOUND_PRODUCT_MSG,
    type: ApiError,
  })
  @UseInterceptors(FileInterceptor('poster'))
  async uploadPoster(
    @Param('id') id: number,
    @UploadedFile() poster: Express.Multer.File,
  ): Promise<ApiResponse<ProductDocument>> {
    const product = await this.productsService.uploadPoster(id, poster);
    return new ApiResponse(HttpStatus.OK, product, successMessages.PRODUCT_POSTER_ADD_MSG);
  }

  // #################### ADD CATEGORY TO PRODUCT ####################
  @Patch(':id/add-category')
  @ApiOperation({ description: 'Add category to product by ID' })
  @ApiSwaggerResponse(HttpStatus.OK, Product, successMessages.PRODUCT_CATEGORY_ADD_MSG)
  @ApiNotFoundResponse({
    description: exceptionMessages.NOT_FOUND_PRODUCT_MSG,
    type: ApiError,
  })
  @ApiNotFoundResponse({
    description: exceptionMessages.NOT_FOUND_CATEGORY_MSG,
    type: ApiError,
  })
  async addCategory(@Param('id') id: number, @Body() dto: AddCategoryDto): Promise<ApiResponse<ProductDocument>> {
    const product = await this.productsService.addCategories(id, dto.category);
    return new ApiResponse(HttpStatus.OK, product, successMessages.PRODUCT_CATEGORY_ADD_MSG);
  }
}
