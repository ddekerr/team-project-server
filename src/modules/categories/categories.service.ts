import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import * as slugify from 'slug';

import { CategoriesRepository } from './categories.repository';
import { CategoryDocument } from './schemas/category.schema';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

import exceptionMessages from 'constants/exceptionMessages';
import { ResponseCategory } from './types';
import successMessages from 'constants/successMessages';

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  // #################### CREATE NEW CAREGORY ####################
  async create(dto: CreateCategoryDto): Promise<ResponseCategory> {
    // generate slug from title
    const slug = slugify(dto.title);

    // check is category exist and throw Conflict Exception if so
    await this.checkCategoryNotExist(slug);

    // create new category
    const category = await this.categoriesRepository.create({ ...dto, slug });

    if (dto.parent) {
      // add children to parent category childrens list
      const parent = await this.getOneBySlug(dto.parent);
      parent.children.push(category);
      await parent.save();
    }

    return category;
  }

  // #################### UPDATE CATEGORY BY SLUG ####################
  async update(slug: string, dto: UpdateCategoryDto): Promise<ResponseCategory> {
    let newSlug = slug;

    if (dto.title) {
      // generate slug from title
      newSlug = slugify(dto.title);

      // check is category with newSlug exist and throw Conflict Exception if so
      await this.checkCategoryNotExist(newSlug);
    }

    const category = await this.getOneBySlug(slug);

    // const category = await this.categoriesRepository.update({ slug }, { ...dto, slug: newSlug });
    if (dto.parent) {
      // remove children from old parent category childrens list
      await this.categoriesRepository.update({ slug: category.parent }, { $pull: { children: category._id } });

      // add children to new parent category childrens list
      await this.categoriesRepository.update({ slug: dto.parent }, { $push: { children: category._id } });
    }

    // update category fields
    return await this.categoriesRepository.update({ slug }, { ...dto, slug: newSlug });
  }

  // #################### DELETE CATEGORY BY SLUG ####################
  async delete(slug: string): Promise<string> {
    const category = await this.checkCategoryExist(slug);
    await category.deleteOne();
    return successMessages.CATEGORY_DELETE_MSG;
  }

  // #################### GET ONE CAREGORY BY SLUG ####################
  async getOneBySlug(slug: string): Promise<CategoryDocument> {
    return await this.checkCategoryExist(slug);
  }

  // #################### GET CAREGORY LIST ####################
  async getList(): Promise<CategoryDocument[]> {
    const categories = await this.categoriesRepository.getList({ parent: null });
    return categories;
  }

  // #################### CHECK CATEGORY IS EXIST ####################
  private async checkCategoryExist(slug: string): Promise<CategoryDocument> {
    const category = await this.categoriesRepository.getOne({ slug });
    if (!category) {
      throw new NotFoundException(exceptionMessages.NOT_FOUND_CATEGORY_MSG);
    }
    return category;
  }

  // #################### CHECK CATEGORY IS NOT EXIST ####################
  private async checkCategoryNotExist(slug: string): Promise<void> {
    const category = await this.categoriesRepository.getOne({ slug });
    if (category) {
      throw new ConflictException(exceptionMessages.CONFLICT_CATEGORY_MSG);
    }
  }
}
