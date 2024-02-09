import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './schemas/category.schema';
import { CategoriesRepository } from './categories.repository';

@Module({
  providers: [CategoriesService, CategoriesRepository],
  controllers: [CategoriesController],
  imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])],
  exports: [CategoriesService],
})
export class CategoriesModule {}
