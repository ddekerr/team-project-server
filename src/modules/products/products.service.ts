import { ConflictException, Injectable } from '@nestjs/common';
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
    private filesService: FilesService,
  ) {}

  // #################### CREATE NEW PRODUCT ####################
  async create(dto: CreateProductDto): Promise<ProductDocument> {
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
  async getOne(id: number): Promise<ProductDocument> {
    return await this.productsRepository.getOne({ id });
  }

  // #################### GET PRODUCT LIST ####################
  async getList(): Promise<ProductDocument[]> {
    return await this.productsRepository.getList({});
  }

  // #################### UPLOAD POSTER TO PRODUCT ####################
  async uploadPoster(
    id: number,
    poster: Express.Multer.File,
  ): Promise<ProductDocument> {
    // check product exist
    const candidate = await this.productsRepository.getOne({ id });
    if (!candidate) {
      throw new ConflictException(exceptionMessages.NOT_FOUND_PRODUCT_MSG);
    }

    // check product already have poster
    if (candidate.poster) {
      // remove old poster from cloud service
      await this.filesService.removeFile(candidate.poster);
    }

    // upload new posetr to cloud service
    const filePath = await this.filesService.uploadFile(
      FileType.POSTERS,
      poster,
    );

    // save path to poster in DB
    candidate.poster = filePath;
    return await candidate.save();
  }
}
