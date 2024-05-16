import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';

import { AuthController } from './auth.controller';
import { GoogleAuthController } from './google-auth.controller';

import { AuthService } from './auth.service';

import { UsersModule } from 'modules/user/users.module';

import { ATStrategy } from './strategies/at.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { GoogleGuard } from './guards/google.guard';
import { GoogleAuthService } from './google-auth.service';
import { TokensService } from './tokens.service';
import { RTStrategy } from './strategies/rt.strategy';

@Module({
  providers: [AuthService, GoogleAuthService, TokensService, ATStrategy, RTStrategy, GoogleStrategy, GoogleGuard],
  controllers: [AuthController, GoogleAuthController],
  imports: [UsersModule, JwtModule.register({}), HttpModule],
})
export class AuthModule {}
