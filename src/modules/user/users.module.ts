import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { UsersRepository } from './users.repository';

@Module({
  providers: [UsersService, UsersRepository],
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  exports: [UsersService],
})
export class UsersModule {}
