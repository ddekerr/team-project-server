import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesModule } from './files/files.module';
import { CategoriesModule } from './categories/categories.module';
import { UserService } from './user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION),
    ProductsModule,
    FilesModule,
    CategoriesModule,
  ],
  providers: [UserService],
})
export class AppModule {}
