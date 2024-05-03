import { Controller, Get, UseGuards, HttpCode, Req, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { GoogleGuard } from './guards/google.guard';
import { ApiResponse } from 'helpers/ApiResponse';
import { Actions, EntityType } from 'types';
import { GoogleAuthService } from './google-auth.service';
import { SetCookieInterceptor } from './interceptors/setCookie.interceptor';

@ApiTags('Auth')
@Controller('api/google')
export class GoogleAuthController {
  constructor(private googleAuthService: GoogleAuthService) {}

  // Redirect user to Google login page via GoogleGuard
  @Get()
  @HttpCode(200)
  @UseGuards(GoogleGuard)
  googleAuth() {}

  // if Google logged in route here
  @Get('callback')
  @HttpCode(200)
  @UseGuards(GoogleGuard)
  @UseInterceptors(SetCookieInterceptor)
  async googleAuthCallback(@Req() req: Request) {
    const googleAccessToken = req.user['googleAccessToken'];
    const userResponse = await this.googleAuthService.googleAuth(googleAccessToken);
    return new ApiResponse(Actions.LOGIN, EntityType.USER, userResponse);
  }
}
