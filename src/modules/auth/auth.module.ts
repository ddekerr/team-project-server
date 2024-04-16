import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'modules/user/users.module';
import { JwtModule } from '@nestjs/jwt';
import { TokenSchema } from './schema/token.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [UsersModule,
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: 'Token', schema: TokenSchema }])],
})
export class AuthModule { }
