import { Body, Controller, HttpCode, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { User } from './../user/schemas/user.schema';
import { CreateUserDto } from '../user/dto/create-user.dto';

import validationMessage from 'constants/validationMessage';
import exceptionMessages from 'constants/exceptionMessages';
import { Actions, EntityType } from 'types';
import { UserResponseWithRefresh } from './types';

import { ApiResponse } from 'helpers/ApiResponse';
import { ApiSwaggerResponse } from 'helpers/ApiSwaggerResponse';
import { ApiError } from 'helpers/ApiError';
import { ApiValidationError } from 'helpers/ApiValidationError';
import { SetCookieInterceptor } from './interceptors/setCookie.interceptor';
import { ClearCookieInterceptor } from './interceptors/clearCookie.interceptor';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  private REFRESH_TOKEN_KEY = 'refreshToken';
  constructor(private readonly authService: AuthService) {}

  // #################### REGISTER NEW USER ####################
  @Post('register')
  @HttpCode(201)
  @ApiOperation({ summary: 'Register new user, send the access token and set cookie with refresh token' })
  @ApiBody({ type: CreateUserDto })
  @ApiSwaggerResponse(Actions.CREATE, EntityType.USER, User)
  @ApiConflictResponse({ type: ApiError, description: exceptionMessages.CONFLICT_EMAIL_MSG })
  @ApiBadRequestResponse({ type: ApiValidationError, description: validationMessage.VALIDATION_ERROR })
  @UseInterceptors(SetCookieInterceptor)
  async register(@Body() createUserDto: CreateUserDto): Promise<ApiResponse<UserResponseWithRefresh>> {
    const userResponse = await this.authService.register(createUserDto);
    return new ApiResponse(Actions.CREATE, EntityType.USER, userResponse);
  }

  // #################### LOGIN USER ####################
  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login user, send the access token and set cookie with refresh token' })
  @ApiBody({ type: CreateUserDto })
  @ApiSwaggerResponse(Actions.CREATE, EntityType.USER, User)
  @ApiUnauthorizedResponse({ type: ApiError, description: exceptionMessages.UNAUTHORIZED_PASSWORD_MSG })
  @ApiBadRequestResponse({ type: ApiValidationError, description: validationMessage.VALIDATION_ERROR })
  @UseInterceptors(SetCookieInterceptor)
  async login(@Body() dto: CreateUserDto): Promise<ApiResponse<UserResponseWithRefresh>> {
    const userResponse = await this.authService.login(dto);
    return new ApiResponse(Actions.CREATE, EntityType.USER, userResponse);
  }

  // #################### LOGOUT USER ####################
  @Post('logout')
  @HttpCode(200)
  @UseGuards(AuthGuard('access-strategy'))
  @ApiOperation({ summary: 'Logout user, clear cookies' })
  @ApiSwaggerResponse(Actions.LOGOUT, EntityType.USER, String)
  @UseInterceptors(ClearCookieInterceptor)
  async logout(@Req() request: Request) {
    // ITS LOGIC HAVE TO BE IN DECORATORS OR OTHER FUNCTION (NEED REFACTOR)
    // Access-stratege push Payload ro request and here we get email from there
    const email: string = request['user']['payload']['email'];

    // check the user is logged in
    const message = await this.authService.logout(email);
    return new ApiResponse(Actions.LOGOUT, EntityType.USER, message);
  }

// #################### GET ME ####################
  @Get('me')
  @HttpCode(200)
  @ApiSwaggerResponse(Actions.GET, EntityType.USER, String)
  async me(@Req() request: Request) {
    const email: string = request['user']['payload']['email'];
    const userResponse = await this.authService.me(email);
    return new ApiResponse(Actions.GET, EntityType.USER, userResponse);
  }

  // // #################### REFRESH USER ####################
  // @Post('refresh')
  // @HttpCode(200)
  // @UseGuards(AuthGuard('access-strategy'))
  // @ApiOperation({ summary: 'Refresh access token, refresh cookies' })
  // @ApiSwaggerResponse(Actions.REFRESH, EntityType.USER, String)
  // @UseInterceptors(SetCookieInterceptor)
  // async refresh(@Req() request: Request): Promise<ApiResponse<Tokens>> {
  //   // ITS LOGIC HAVE TO BE IN DECORATORS OR OTHER FUNCTION (NEED REFACTOR)
  //   // Access-stratege push Payload ro request and here we get email from there
  //   const email: string = request['user']['payload']['email'];

  //   // check the user is logged in and get new tokens
  //   const response = await this.authService.refresh(email);

  //   return new ApiResponse(Actions.REFRESH, EntityType.USER, response);
  // }
}
