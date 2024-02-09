import { Module } from '@nestjs/common';
import { Connection } from 'mongoose';
import * as AutoIncrementFactory from 'mongoose-sequence';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';

import { Product, ProductSchema } from './schemas/product.schema';
import { FilesModule } from 'modules/files/files.module';
import { CategoriesModule } from 'modules/categories/categories.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsRepository, ProductsService],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Product.name,
        useFactory: async (connection: Connection) => {
          const schema = ProductSchema;
          const AutoIncrement = AutoIncrementFactory(connection);
          schema.plugin(AutoIncrement, { inc_field: 'id' });
          return schema;
        },
        inject: [getConnectionToken()],
      },
    ]),
    FilesModule,
    CategoriesModule,
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
