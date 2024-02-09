import { CategoriesService } from './../categories/categories.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileType, FilesService } from 'modules/files/files.service';
import exceptionMessages from 'constants/exceptionMessages';

@Injectable()
export class ProductsService {
  constructor(
    private productsRepository: ProductsRepository,
    private categoriesService: CategoriesService,
    private filesService: FilesService,
  ) {}

  // #################### CREATE NEW PRODUCT ####################
  async create(dto: CreateProductDto): Promise<ProductDocument> {
    if (dto.category) {
      const category = await this.categoriesService.getOneBySlug(dto.category);
      return await this.productsRepository.create({ ...dto, category });
    }
    return await this.productsRepository.create(dto);
  }

  // #################### UPDATE PRODUCT BY ID ####################
  async update(id: number, dto: UpdateProductDto): Promise<ProductDocument> {
    return await this.productsRepository.update({ id }, dto);
  }

  // #################### DELETE PRODUCT BY ID ####################
  async delete(id: number): Promise<ProductDocument> {
    return await this.productsRepository.delete({ id });
  }

  // #################### GET ONE PRODUCT BY ID ####################
  async getOneById(id: number): Promise<ProductDocument> {
    const product = await this.productsRepository.getOne({ id });
    if (!product) {
      throw new NotFoundException(exceptionMessages.NOT_FOUND_PRODUCT_MSG);
    }

    return product;
  }

  // #################### GET PRODUCT LIST ####################
  async getList(): Promise<ProductDocument[]> {
    return await this.productsRepository.getList({});
  }

  // #################### UPLOAD POSTER TO PRODUCT ####################
  async uploadPoster(id: number, poster: Express.Multer.File): Promise<ProductDocument> {
    // check product exist
    const product = await this.getOneById(id);

    // check product already have poster
    if (product.poster) {
      // remove old poster from cloud service
      await this.filesService.removeFile(product.poster);
    }

    // upload new posetr to cloud service
    const filePath = await this.filesService.uploadFile(FileType.POSTERS, poster);

    // save path to poster in DB
    product.poster = filePath;
    return await product.save();
  }

  // #################### ADD CATEGORIES TO PRODUCT ####################
  async addCategories(id: number, categorySlug: string): Promise<ProductDocument> {
    const product = await this.getOneById(id);
    const category = await this.categoriesService.getOneBySlug(categorySlug);

    product.category = category;
    return await product.save();
  }
}
