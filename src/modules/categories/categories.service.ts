import { Injectable, NotFoundException } from '@nestjs/common';
import * as slugify from 'slug';

import { CategoriesRepository } from './categories.repository';
import { CategoryDocument } from './schemas/category.schema';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

import exceptionMessages from 'constants/exceptionMessages';

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  // #################### CREATE NEW CAREGORY ####################
  async create(dto: CreateCategoryDto): Promise<CategoryDocument> {
    // generate slug from title
    const slug = slugify(dto.title);

    if (dto.parent) {
      // add parent field to new category
      const parent = await this.getOneBySlug(dto.parent);
      return await this.categoriesRepository.create({ ...dto, slug, parent });
    }

    return await this.categoriesRepository.create({ ...dto, slug });
  }

  // #################### UPDATE CATEGORY BY SLUG ####################
  async update(slug: string, dto: UpdateCategoryDto): Promise<CategoryDocument> {
    return await this.categoriesRepository.update({ slug }, dto);
  }

  // #################### DELETE CATEGORY BY SLUG ####################
  async delete(slug: string): Promise<CategoryDocument> {
    return await this.categoriesRepository.delete({ slug });
  }

  // #################### GET ONE CAREGORY BY SLUG ####################
  async getOneBySlug(slug: string): Promise<CategoryDocument> {
    const category = await this.categoriesRepository.getOne({ slug });

    if (!category) {
      throw new NotFoundException(exceptionMessages.NOT_FOUND_CATEGORY_MSG);
    }

    return category;
  }

  // #################### GET CAREGORY LIST ####################
  async getList(): Promise<CategoryDocument[]> {
    const categories = await this.categoriesRepository.getList({});
    if (!categories.length) {
      throw new NotFoundException(exceptionMessages.NOT_FOUND_CATEGORY_MSG);
    }

    return categories;
  }
}
