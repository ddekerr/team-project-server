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
  Query,
  UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ProductsService } from './products.service';
import { ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { RateDto } from './dto/rate.dto';

import { Actions, EntityType } from 'types';

import { ApiResponse } from 'helpers/ApiResponse';
import { Params, Rating } from './types';
import { MongooseIdValidationPipe } from './dto/mongoID.dto';
import {
  ApiCreateProduct,
  ApiDeleteProduct,
  ApiGetOneProduct,
  ApiGetProductList,
  ApiRateProduct,
  ApiSearchProduct,
  ApiUploadPosterProduct,
} from './helpers/ApiSerch.documentation';
import { ApiUpdateCategory } from 'modules/categories/helpers/ApiCategories.documentation';
// import { Types } from 'mongoose';

@ApiTags('Products')
@Controller('api/products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  // #################### SERCH PRODUCT ####################
  @Get('search')
  @ApiSearchProduct()
  async searchProduct(@Query('search') searchQuery: string): Promise<ApiResponse<ProductDocument[]>> {
    const procducts = await this.productsService.searchProduct(searchQuery);
    return new ApiResponse(Actions.GET_LIST, EntityType.PRODUCT, procducts);
  }

  // #################### CREATE NEW PRODUCT ####################
  @Post()
  @ApiCreateProduct()
  async create(@Body() dto: CreateProductDto): Promise<ApiResponse<ProductDocument>> {
    const product = await this.productsService.create(dto);
    return new ApiResponse(Actions.CREATE, EntityType.PRODUCT, product);
  }

  // #################### UPDATE PRODUCT BY ID ####################
  @Patch(':id')
  @ApiUpdateCategory()
  @UsePipes(new MongooseIdValidationPipe())
  async update(@Param('id') _id: string, @Body() dto: UpdateProductDto) {
    const product = await this.productsService.update(_id, dto);
    return new ApiResponse(Actions.UPDATE, EntityType.PRODUCT, product);
  }

  // #################### DELETE PRODUCT BY ID ####################
  @Delete(':id')
  @ApiDeleteProduct()
  @UsePipes(new MongooseIdValidationPipe())
  async delete(@Param('id') id: string): Promise<ApiResponse<ProductDocument>> {
    const product = await this.productsService.delete(id);
    return new ApiResponse(Actions.DELETE, EntityType.PRODUCT, product);
  }

  // #################### GET ONE PRODUCT BY ID ####################
  @Get(':id')
  @ApiGetOneProduct()
  @UsePipes(new MongooseIdValidationPipe())
  async getOne(@Param() id: string) {
    const product = await this.productsService.getOneById(id);
    return new ApiResponse(Actions.GET, EntityType.PRODUCT, product);
  }

  // #################### GET PRODUCTS LIST ####################
  @Get()
  @ApiGetProductList()
  async getList(@Query() params: Params): Promise<ApiResponse<ProductDocument[]>> {
    const filter = this.productsService.setFilter(params);
    const products = await this.productsService.getList(filter);
    return new ApiResponse(Actions.GET_LIST, EntityType.PRODUCT, products);
  }

  // #################### ADD POSTER TO PRODUCT ####################
  @Patch(':id/upload-poster')
  @ApiUploadPosterProduct()
  @UsePipes(new MongooseIdValidationPipe())
  @UseInterceptors(FileInterceptor('poster'))
  async uploadPoster(
    @Param('id') _id: string,
    @UploadedFile() poster: Express.Multer.File,
  ): Promise<ApiResponse<ProductDocument>> {
    const product = await this.productsService.uploadPoster(_id, poster);
    return new ApiResponse(Actions.ADD_POSTER, EntityType.PRODUCT, product);
  }

  // #################### RATE PRODUCT ####################
  @Patch(':id/rate')
  @ApiRateProduct()
  @UsePipes(new MongooseIdValidationPipe())
  async rateProduct(@Param('id') _id: string, @Body() dto: RateDto): Promise<ApiResponse<Rating>> {
    const rating = await this.productsService.updateRating(_id, dto.value);
    return new ApiResponse(Actions.RATE, EntityType.PRODUCT, rating);
  }
}
