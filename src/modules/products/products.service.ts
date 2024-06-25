import { Express } from 'express';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { ProductsRepository } from './products.repository';
import { CategoriesService } from './../categories/categories.service';
import { FileType, FilesService } from 'modules/files/files.service';

import { ImageProduct, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import exceptionMessages from 'constants/exceptionMessages';
import { Filter, Params, Rating, Sort, SortParams } from './types';

const limitImages = 10;

@Injectable()
export class ProductsService {
  constructor(
    private productsRepository: ProductsRepository,
    private categoriesService: CategoriesService,
    private filesService: FilesService,
  ) {}

  // #################### CREATE NEW PRODUCT ####################
  async create(dto: CreateProductDto): Promise<ProductDocument> {
    await this.checkingCategories(dto.categories);
    return await this.productsRepository.create(dto);
  }

  // #################### UPDATE PRODUCT BY ID ####################
  async update(_id: string, dto: UpdateProductDto): Promise<ProductDocument> {
    if ('categories' in dto) {
      await this.checkingCategories(dto.categories);
    }
    return await this.productsRepository.update({ _id }, dto);
  }

  // #################### DELETE PRODUCT BY ID ####################
  async delete(_id: string): Promise<ProductDocument> {
    return await this.productsRepository.delete({ _id });
  }

  // #################### GET ONE PRODUCT BY ID ####################
  async getOneById(id: string): Promise<ProductDocument> {
    const product = await this.productsRepository.getById(id);
    if (!product) {
      throw new NotFoundException(exceptionMessages.NOT_FOUND_PRODUCT_MSG);
    }
    return product;
  }

  // #################### GET PRODUCT LIST ####################
  async getList(params?: Params, page?: number): Promise<ProductDocument[]> {
    const filter = this.setFilter(params);
    const sort = this.setSort(params.sort);
    return await this.productsRepository.getList(filter, page, sort);
  }

  private setSort(sortParam: string): Sort {
    if (sortParam === SortParams.DATEASC) {
      return { updatedAt: 1 };
    }

    if (sortParam === SortParams.DATEDESC) {
      return { updatedAt: -1 };
    }

    if (sortParam === SortParams.PRICEASC) {
      return { price: 1 };
    }

    if (sortParam === SortParams.PRICEDESC) {
      return { price: -1 };
    }
  }

  // #################### SET FILTER ####################
  private setFilter(params: Params): Filter {
    const filter = Object.entries(params).reduce((prev, [param, valueOfParam]) => {
      switch (param) {
        case 'search':
          prev['title'] = new RegExp(valueOfParam, 'i');

        case 'category':
          prev['categories'] = valueOfParam;

        case 'minPrice':
          prev['price'] = { $gte: Number(valueOfParam) };

        case 'maxPrice':
          prev['price'] = { $lte: Number(valueOfParam) };

        case 'sort':

        default:
          prev[param] = valueOfParam;
          break;
      }

      return prev;
    }, {});

    return filter;
  }

  // #################### UPLOAD POSTER TO PRODUCT ####################
  async uploadPoster(_id: string, poster: Express.Multer.File): Promise<ProductDocument> {
    // check product exist
    const product = await this.getOneById(_id);

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

  async uploadImage(id: string, image: Express.Multer.File[]) {
    const limitImages = 10; // Максимальна кількість картинок на продукт

    //Пошук продукту
    const product = await this.getOneById(id);

    //Чи не перевищений ліміт кількості зображень для продукту
    if (product.images.length + image.length > limitImages) {
      throw new ForbiddenException(exceptionMessages.LIMIT_ADD_NEW_IMAGE);
    }

    //Визначаємо порядок id, який присвоємо до зображення
    const { images } = product;

    for (let i = 0; i < image.length; i++) {
      const imageId = this.determineNextID(images);

      const filePath = await this.filesService.uploadFile(FileType.IMAGES, image[i]);

      images.push({ imageId, url: filePath });
    }

    product.images = images;

    return await product.save();
  }

  private determineNextID(images: ImageProduct[]): number {
    const idImage = images.map((image) => image.imageId).sort((a, b) => a - b);

    for (let i = 1; i <= limitImages; i++) {
      if (!idImage.includes(i)) {
        return i;
      }
    }

    throw new ForbiddenException(exceptionMessages.LIMIT_ADD_NEW_IMAGE);
  }

  private removeItemById(images: ImageProduct[], idToRemove: number): ImageProduct[] {
    return images.filter((item) => item.imageId != idToRemove);
  }

  async deleteImage(productId: string, imageId: number) {
    //Пошук продукту
    const product = await this.getOneById(productId);

    //Пошук зображення по переданому idImage та його видалення
    const { images } = product;

    const image = images.find((item) => item.imageId == imageId);

    if (!image) {
      throw new NotFoundException(exceptionMessages.NOT_FOUND_IMAGE_BY_IDIMAGE);
    }

    const { url } = image;
    await this.filesService.removeFile(url);

    // видалення обєкту з масиву
    const newImages = this.removeItemById(images, imageId);

    product.images = newImages;
    return await product.save();
  }

  // #################### RATE PRODUCT ####################
  async updateRating(_id: string, value: number): Promise<Rating> {
    const product = await this.getOneById(_id);

    // change product rating by star value
    product.rating[value] += 1;
    await product.save();

    // count product rating
    let votes = 0;
    let sumOfValues = 0;
    for (let prop = 1; prop <= 5; prop += 1) {
      votes += product.rating[prop];
      sumOfValues += product.rating[prop] * prop;
    }
    const rating = sumOfValues / votes;

    return { rating };
  }

  // #################### CHECKING CATEGORY BY SLUG ####################
  private async checkingCategories(categories: string[]): Promise<void> {
    for (let i = 0; i < categories.length; i++) {
      await this.categoriesService.getOneBySlug(categories[i]);
    }
  }
}
