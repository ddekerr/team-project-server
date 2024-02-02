import { ApiResponse } from 'helpers/ApiResponse';
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDocument } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import successMessages from 'constants/successMessages';

@Controller('api/categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  // #################### CREATE NEW CATEGORY ####################
  @Post()
  async create(@Body() dto: CreateCategoryDto): Promise<ApiResponse<CategoryDocument>> {
    const category = await this.categoriesService.create(dto);
    return new ApiResponse(HttpStatus.CREATED, category, successMessages.CATEGORY_CREATED_MSG);
  }

  // #################### UPDATE CATEGORY ####################
  @Patch(':slug')
  async update(
    @Param() { slug }: { slug: string },
    @Body() dto: CreateCategoryDto,
  ): Promise<ApiResponse<CategoryDocument>> {
    const category = await this.categoriesService.update(slug, dto);
    return new ApiResponse(HttpStatus.CREATED, category, successMessages.CATEGORY_UPDATED_MSG);
  }

  // #################### DELETE CATEGORY BY SLUG ####################
  @Delete(':slug')
  async delete(@Param() { slug }: { slug: string }): Promise<ApiResponse<CategoryDocument>> {
    const category = await this.categoriesService.delete(slug);
    return new ApiResponse(HttpStatus.OK, category, successMessages.CATEGORY_DELETED_MSG);
  }

  // #################### GET ONE CATEGORY ####################
  @Get(':slug')
  async getOne(@Param() { slug }: { slug: string }): Promise<ApiResponse<CategoryDocument>> {
    const category = await this.categoriesService.getOneBySlug(slug);
    return new ApiResponse(HttpStatus.OK, category);
  }

  // #################### GET CATEGORIES LIST ####################
  @Get()
  async getList(): Promise<ApiResponse<CategoryDocument[]>> {
    const categories = await this.categoriesService.getList();
    return new ApiResponse(HttpStatus.OK, categories);
  }
}
