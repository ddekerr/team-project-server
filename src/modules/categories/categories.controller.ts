import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CategoriesService } from './categories.service';
import { Category, CategoryDocument } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

import { Actions, EntityType } from 'types';
import { ResponseCategory } from './types';

import { ApiResponse } from 'helpers/ApiResponse';
import { ApiCreateCategory, ApiDeleteCategory, ApiGetListCategory, ApiUpdateCategory } from './helpers/ApiCategories.documentation';

@ApiTags('Categories')
@Controller('api/categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  // #################### CREATE NEW CATEGORY ####################
  @Post()
  @ApiCreateCategory()
  async create(@Body() dto: CreateCategoryDto): Promise<ApiResponse<ResponseCategory>> {
    const category = await this.categoriesService.create(dto);
    return new ApiResponse(Actions.CREATE, EntityType.CATEGORY, category);
  }

  // #################### UPDATE CATEGORY BY SLUG ####################
  @Patch(':slug')
  @ApiUpdateCategory()
  async update(
    @Param() { slug }: { slug: string },
    @Body() dto: UpdateCategoryDto,
  ): Promise<ApiResponse<ResponseCategory>> {
    const category = await this.categoriesService.update(slug, dto);
    return new ApiResponse(Actions.UPDATE, EntityType.CATEGORY, category);
  }

  // #################### DELETE CATEGORY BY SLUG ####################
  @Delete(':slug')
  @ApiDeleteCategory()
  async delete(@Param() { slug }: { slug: string }): Promise<ApiResponse<string>> {
    const successMessage = await this.categoriesService.delete(slug);
    return new ApiResponse(Actions.DELETE, EntityType.CATEGORY, successMessage);
  }

  // #################### GET ONE CATEGORY ####################
  // @Get(':slug')
  // @ApiOperation({ summary: 'Get one category by slug' })
  // @ApiParam({ name: 'slug', type: String })
  // @ApiSwaggerResponse(Actions.GET, EntityType.CATEGORY, Category)
  // @ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_CATEGORY_MSG })
  // async getOne(@Param() { slug }: { slug: string }): Promise<ApiResponse<CategoryDocument>> {
  //   const category = await this.categoriesService.getOneBySlug(slug);
  //   return new ApiResponse(Actions.GET, EntityType.CATEGORY, category);
  // }

  // #################### GET CATEGORIES LIST ####################
  @Get()
  @ApiGetListCategory()
  async getList(): Promise<ApiResponse<CategoryDocument[]>> {
    const categories = await this.categoriesService.getList();
    return new ApiResponse(Actions.GET, EntityType.CATEGORY, categories);
  }
}
