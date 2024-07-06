import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesModule } from './files/files.module';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { CronModule } from './cron/cron.module';
import { ReviewsModule } from './reviews/reviews.module';
import { TelegramBotModule } from './telegram-bot/telegram-bot.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION),
    ProductsModule,
    FilesModule,
    CategoriesModule,
    UsersModule,
    AuthModule,
    OrdersModule,
    CronModule,
    ReviewsModule,
    TelegramBotModule,
  ],
})
export class AppModule {}
