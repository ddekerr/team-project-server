import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'modules/user/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ATStrategy } from './strategies/at.strategy';

@Module({
  providers: [AuthService, ATStrategy],
  controllers: [AuthController],
  imports: [UsersModule, JwtModule.register({})],
})
export class AuthModule {}
