import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiNotFoundResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { CategoriesService } from './categories.service';
import { Category, CategoryDocument } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

import successMessages from 'constants/successMessages';
import exceptionMessages from 'constants/exceptionMessages';
import validationMessage from 'constants/validationMessage';
import { Actions, EntityType } from 'types';

import { ApiSwaggerArrayResponse } from 'helpers/ApiSwaggerArrayResponse';
import { ApiResponse } from 'helpers/ApiResponse';
import { ApiError } from 'helpers/ApiError';
import { ApiSwaggerResponse } from 'helpers/ApiSwaggerResponse';
import { ApiValidationError } from 'helpers/ApiValidationError';

@ApiTags('Categories')
@Controller('api/categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  // #################### CREATE NEW CATEGORY ####################
  @Post()
  @ApiOperation({ summary: 'Create new category' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiSwaggerResponse(HttpStatus.CREATED, Category, successMessages.CATEGORY_CREATE_MSG)
  @ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_CATEGORY_MSG })
  @ApiBadRequestResponse({ type: ApiValidationError, description: validationMessage.VALIDATION_ERROR })
  async create(@Body() dto: CreateCategoryDto): Promise<ApiResponse<CategoryDocument>> {
    const category = await this.categoriesService.create(dto);
    return new ApiResponse(Actions.CREATE, EntityType.CATEGORY, category);
  }

  // #################### UPDATE CATEGORY BY SLUG ####################
  @Patch(':slug')
  @ApiOperation({ summary: 'Update one category by slug' })
  @ApiParam({ name: 'slug', type: String })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiSwaggerResponse(HttpStatus.OK, Category, successMessages.CATEGORY_UPDATE_MSG)
  @ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_CATEGORY_MSG })
  @ApiBadRequestResponse({ type: ApiValidationError, description: validationMessage.VALIDATION_ERROR })
  async update(
    @Param() { slug }: { slug: string },
    @Body() dto: UpdateCategoryDto,
  ): Promise<ApiResponse<CategoryDocument>> {
    const category = await this.categoriesService.update(slug, dto);
    return new ApiResponse(Actions.UPDATE, EntityType.CATEGORY, category);
  }

  // #################### DELETE CATEGORY BY SLUG ####################
  @Delete(':slug')
  @ApiOperation({ summary: 'Delete one category by slug' })
  @ApiParam({ name: 'slug', type: String })
  @ApiSwaggerResponse(HttpStatus.OK, Category, successMessages.CATEGORY_DELETE_MSG)
  @ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_CATEGORY_MSG })
  async delete(@Param() { slug }: { slug: string }): Promise<ApiResponse<CategoryDocument>> {
    const category = await this.categoriesService.delete(slug);
    return new ApiResponse(Actions.DELETE, EntityType.CATEGORY, category);
  }

  // #################### GET ONE CATEGORY ####################
  @Get(':slug')
  @ApiOperation({ summary: 'Get one category by slug' })
  @ApiParam({ name: 'slug', type: String })
  @ApiSwaggerResponse(HttpStatus.OK, Category)
  @ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_CATEGORY_MSG })
  async getOne(@Param() { slug }: { slug: string }): Promise<ApiResponse<CategoryDocument>> {
    const category = await this.categoriesService.getOneBySlug(slug);
    return new ApiResponse(Actions.GET, EntityType.CATEGORY, category);
  }

  // #################### GET CATEGORIES LIST ####################
  @Get()
  @ApiOperation({ summary: 'Get list of all categories' })
  @ApiSwaggerArrayResponse(HttpStatus.OK, Category)
  @ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_CATEGORY_MSG })
  async getList(): Promise<ApiResponse<CategoryDocument[]>> {
    const categories = await this.categoriesService.getList();
    return new ApiResponse(Actions.GET, EntityType.CATEGORY, categories);
  }
}
