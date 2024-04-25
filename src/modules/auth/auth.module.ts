import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'modules/user/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ATStrategy } from './strategies/at.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { GoogleGuard } from './guards/google.guard';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [AuthService, ATStrategy, GoogleStrategy ,GoogleGuard],
  controllers: [AuthController],
  imports: [UsersModule, JwtModule.register({}),HttpModule],
})
export class AuthModule {}
