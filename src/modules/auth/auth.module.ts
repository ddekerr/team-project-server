import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'modules/user/users.module';
import { JwtModule } from '@nestjs/jwt';
import { STRATEGY } from './strategies';
//import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  providers: [AuthService, ...STRATEGY],
  controllers: [AuthController],
  imports: [UsersModule,
    JwtModule.register({}),
  ],
})
export class AuthModule { }
