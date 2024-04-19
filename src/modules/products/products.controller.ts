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
  UseInterceptors,
  UploadedFile,
  HttpCode,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { ProductsService } from './products.service';
import { Product, ProductDocument } from './schemas/product.schema';
import { AddCategoryDto, CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileUploadDto } from './dto/file-upload.dto';
import { RateDto } from './dto/rate.dto';

import exceptionMessages from 'constants/exceptionMessages';
import validationMessage from 'constants/validationMessage';
import { Actions, EntityType } from 'types';

import { ApiError } from 'helpers/ApiError';
import { ApiResponse } from 'helpers/ApiResponse';
import { ApiValidationError } from 'helpers/ApiValidationError';
import { ApiSwaggerResponse } from 'helpers/ApiSwaggerResponse';
import { ApiSwaggerArrayResponse } from 'helpers/ApiSwaggerArrayResponse';

@ApiTags('Products')
@Controller('api/products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  // #################### CREATE NEW PRODUCT ####################
  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create new product' })
  @ApiBody({ type: CreateProductDto })
  @ApiSwaggerResponse(Actions.CREATE, EntityType.PRODUCT, Product)
  @ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_CATEGORY_MSG })
  @ApiBadRequestResponse({ type: ApiValidationError, description: validationMessage.VALIDATION_ERROR })
  async create(@Body() dto: CreateProductDto): Promise<ApiResponse<ProductDocument>> {
    const product = await this.productsService.create(dto);
    return new ApiResponse(Actions.CREATE, EntityType.PRODUCT, product);
  }

  // #################### UPDATE PRODUCT BY ID ####################
  @Patch(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update product by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: CreateProductDto })
  @ApiSwaggerResponse(Actions.UPDATE, EntityType.PRODUCT, Product)
  @ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_PRODUCT_MSG })
  @ApiBadRequestResponse({ type: ApiValidationError, description: validationMessage.VALIDATION_ERROR })
  async update(@Param('id') id: number, @Body() dto: UpdateProductDto) {
    const product = await this.productsService.update(id, dto);
    return new ApiResponse(Actions.UPDATE, EntityType.PRODUCT, product);
  }

  // #################### DELETE PRODUCT BY ID ####################
  @Delete(':id')
  @HttpCode(200)
  @ApiParam({ name: 'id', type: Number })
  @ApiOperation({ summary: 'Delete product by ID' })
  @ApiSwaggerResponse(Actions.DELETE, EntityType.PRODUCT, Product)
  @ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_PRODUCT_MSG })
  async delete(@Param('id') id: number): Promise<ApiResponse<ProductDocument>> {
    const product = await this.productsService.delete(id);
    return new ApiResponse(Actions.DELETE, EntityType.PRODUCT, product);
  }

  // #################### GET ONE PRODUCT BY ID ####################
  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get one product by ID' })
  @ApiSwaggerResponse(Actions.GET, EntityType.PRODUCT, Product)
  @ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_PRODUCT_MSG })
  async getOne(@Param('id') id: number): Promise<ApiResponse<ProductDocument>> {
    const product = await this.productsService.getOneById(id);
    return new ApiResponse(Actions.GET, EntityType.PRODUCT, product);
  }

  // #################### GET PRODUCTS LIST ####################
  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get Product list' })
  @ApiSwaggerArrayResponse(Actions.GET_LIST, EntityType.PRODUCT, Product)
  async getList(): Promise<ApiResponse<ProductDocument[]>> {
    const products = await this.productsService.getList();
    return new ApiResponse(Actions.GET, EntityType.PRODUCT, products);
  }

  // #################### ADD POSTER TO PRODUCT ####################
  @Patch(':id/upload-poster')
  @HttpCode(200)
  @ApiOperation({ summary: 'Upload poster to product by ID' })
  @ApiSwaggerResponse(Actions.ADD_POSTER, EntityType.PRODUCT, Product)
  @ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_PRODUCT_MSG })
  @UseInterceptors(FileInterceptor('poster'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FileUploadDto })
  async uploadPoster(
    @Param('id') id: number,
    @UploadedFile() poster: Express.Multer.File,
  ): Promise<ApiResponse<ProductDocument>> {
    const product = await this.productsService.uploadPoster(id, poster);
    return new ApiResponse(Actions.ADD_POSTER, EntityType.PRODUCT, product);
  }

  // #################### ADD CATEGORY TO PRODUCT ####################
  @Patch(':id/add-category')
  @HttpCode(200)
  @ApiOperation({ summary: 'Add category to product by ID' })
  @ApiSwaggerResponse(Actions.ADD_CATEGORY, EntityType.PRODUCT, Product)
  @ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_PRODUCT_MSG })
  @ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_CATEGORY_MSG })
  @ApiBadRequestResponse({ type: ApiValidationError, description: validationMessage.VALIDATION_ERROR })
  async addCategory(@Param('id') id: number, @Body() dto: AddCategoryDto): Promise<ApiResponse<ProductDocument>> {
    const product = await this.productsService.addCategories(id, dto.category);
    return new ApiResponse(Actions.ADD_CATEGORY, EntityType.PRODUCT, product);
  }

  // #################### RATE PRODUCT ####################
  @Patch(':id/rate')
  @HttpCode(200)
  @ApiOperation({ summary: 'Rate product by ID' })
  @ApiSwaggerResponse(Actions.RATE, EntityType.PRODUCT, Product)
  @ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_PRODUCT_MSG })
  @ApiBadRequestResponse({ type: ApiValidationError, description: validationMessage.VALIDATION_ERROR })
  async rateProduct(@Param('id') id: number, @Body() dto: RateDto): Promise<ApiResponse<number>> {
    const rating = await this.productsService.updateRating(id, dto.value);
    return new ApiResponse(Actions.RATE, EntityType.PRODUCT, rating);
  }
}
