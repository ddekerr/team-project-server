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
  UsePipes,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { ProductsService } from './products.service';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
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
import { Params, Rating } from './types';
import { MongooseIdValidationPipe } from './dto/mongoID.dto';
// import { Types } from 'mongoose';

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
  @Patch(':_id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update product by ID' })
  @ApiParam({ name: '_id', type: String })
  @ApiBody({ type: CreateProductDto })
  @ApiSwaggerResponse(Actions.UPDATE, EntityType.PRODUCT, Product)
  @ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_PRODUCT_MSG })
  @ApiBadRequestResponse({ type: ApiValidationError, description: validationMessage.VALIDATION_ERROR })
  async update(@Param('_id') _id: string, @Body() dto: UpdateProductDto) {
    const product = await this.productsService.update(_id, dto);
    return new ApiResponse(Actions.UPDATE, EntityType.PRODUCT, product);
  }

  // #################### DELETE PRODUCT BY ID ####################
  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete product by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiSwaggerResponse(Actions.DELETE, EntityType.PRODUCT, Product)
  @ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_PRODUCT_MSG })
  async delete(@Param('id') id: string): Promise<ApiResponse<ProductDocument>> {
    const product = await this.productsService.delete(id);
    return new ApiResponse(Actions.DELETE, EntityType.PRODUCT, product);
  }

  // #################### GET ONE PRODUCT BY ID ####################
  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get one product by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiSwaggerResponse(Actions.GET, EntityType.PRODUCT, Product)
  @ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_PRODUCT_MSG })
  @UsePipes(new MongooseIdValidationPipe())
  async getOne(@Param() id: string) {
    const product = await this.productsService.getOneById(id);
    return new ApiResponse(Actions.GET, EntityType.PRODUCT, product);
  }

  // #################### GET PRODUCTS LIST ####################
  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get Product list' })
  @ApiQuery({ name: 'category', type: String, required: false })
  @ApiSwaggerArrayResponse(Actions.GET_LIST, EntityType.PRODUCT, Product)
  async getList(@Query() params: Params): Promise<ApiResponse<ProductDocument[]>> {
    const filter = this.productsService.setFilter(params);
    const products = await this.productsService.getList(filter);
    return new ApiResponse(Actions.GET, EntityType.PRODUCT, products);
  }

  // #################### ADD POSTER TO PRODUCT ####################
  @Patch(':_id/upload-poster')
  @HttpCode(200)
  @ApiOperation({ summary: 'Upload poster to product by ID' })
  @ApiBody({ type: FileUploadDto })
  @ApiSwaggerResponse(Actions.ADD_POSTER, EntityType.PRODUCT, Product)
  @ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_PRODUCT_MSG })
  @UseInterceptors(FileInterceptor('poster'))
  @ApiConsumes('multipart/form-data')
  @UsePipes(new MongooseIdValidationPipe())
  async uploadPoster(
    @Param('id') id: string,
    @UploadedFile() poster: Express.Multer.File,
  ): Promise<ApiResponse<ProductDocument>> {
    const product = await this.productsService.uploadPoster(id, poster);
    return new ApiResponse(Actions.ADD_POSTER, EntityType.PRODUCT, product);
  }

  // #################### RATE PRODUCT ####################
  @Patch(':_id/rate')
  @HttpCode(200)
  @ApiOperation({ summary: 'Rate product by ID' })
  @ApiBody({ type: RateDto })
  @ApiSwaggerResponse(Actions.RATE, EntityType.PRODUCT, Product)
  @ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_PRODUCT_MSG })
  @ApiBadRequestResponse({ type: ApiValidationError, description: validationMessage.VALIDATION_ERROR })
  @UsePipes(new MongooseIdValidationPipe())
  async rateProduct(@Param('id') id: string, @Body() dto: RateDto): Promise<ApiResponse<Rating>> {
    const rating = await this.productsService.updateRating(id, dto.value);
    return new ApiResponse(Actions.RATE, EntityType.PRODUCT, rating);
  }
}
