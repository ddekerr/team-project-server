import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  // ########## CREATE NEW PRODUCT ##########
  async create(dto: CreateProductDto): Promise<ProductDocument> {
    return await this.productsRepository.create(dto);
  }

  // ########## UPDATE PRODUCT BY ID ##########
  async update(id: number, dto: UpdateProductDto): Promise<ProductDocument> {
    return await this.productsRepository.update({ id }, dto);
  }

  // ########## DELETE PRODUCT BY ID ##########
  async delete(id: number): Promise<ProductDocument> {
    return await this.productsRepository.delete({ id });
  }

  // ########## GET ONE PRODUCT BY ID ##########
  async getOne(id: number): Promise<ProductDocument> {
    return await this.productsRepository.getOne({ id });
  }

  // ########## GET PRODUCT LIST ##########
  async getList(): Promise<ProductDocument[]> {
    return await this.productsRepository.getList({});
  }
}
