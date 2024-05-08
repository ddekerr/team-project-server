import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ReviewsRepository } from './reviews.repository';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { Review, ReviewSchema } from './schemas/review.schema';

import { UsersModule } from 'modules/user/users.module';
import { ProductsModule } from 'modules/products/products.module';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService, ReviewsRepository],
  imports: [MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]), UsersModule, ProductsModule],
  exports: [ReviewsService],
})
export class ReviewsModule {}
