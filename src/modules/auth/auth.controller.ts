import { Body, Controller, Get, HttpCode, Post, Query, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';

import { AuthService } from './auth.service';
import { User } from './../user/schemas/user.schema';
import { CreateUserDto } from '../user/dto/create-user.dto';

import validationMessage from 'constants/validationMessage';
import exceptionMessages from 'constants/exceptionMessages';
import { REFRESH_TOKEN_EXPIRES_IN } from 'constants/tokens';
import { Actions, EntityType } from 'types';
import { Token, UserResponse } from './types';

import { ApiResponse } from 'helpers/ApiResponse';
import { ApiSwaggerResponse } from 'helpers/ApiSwaggerResponse';
import { ApiError } from 'helpers/ApiError';
import { ApiValidationError } from 'helpers/ApiValidationError';
import { GoogleGuard } from './guards/google.guard';
import { HttpService } from '@nestjs/axios';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  private REFRESH_TOKEN_KEY = 'refreshToken';
  constructor(private readonly authService: AuthService, private readonly httpService: HttpService) { }

  // #################### REGISTER NEW USER ####################
  @Post('register')
  @HttpCode(201)
  @ApiOperation({ summary: 'Register new user, send the access token and set cookie with refresh token' })
  @ApiBody({ type: CreateUserDto })
  @ApiSwaggerResponse(Actions.CREATE, EntityType.USER, User)
  @ApiConflictResponse({ type: ApiError, description: exceptionMessages.CONFLICT_EMAIL_MSG })
  @ApiBadRequestResponse({ type: ApiValidationError, description: validationMessage.VALIDATION_ERROR })
  async register(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<ApiResponse<UserResponse>> {
    const { userResponse, refreshToken } = await this.authService.register(createUserDto);
    this.setRefreshTokenToCookies(response, refreshToken);
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
  async login(@Body() dto: CreateUserDto, @Res({ passthrough: true }) response: Response,) {
    const { userResponse, refreshToken } = await this.authService.login(dto);
    this.setRefreshTokenToCookies(response, refreshToken);
    return new ApiResponse(Actions.CREATE, EntityType.USER, userResponse);
  }

  // #################### LOGOUT USER ####################
  @Post('logout')
  @HttpCode(200)
  @UseGuards(AuthGuard('access-strategy'))
  @ApiOperation({ summary: 'Logout user, clear cookies' })
  @ApiSwaggerResponse(Actions.LOGOUT, EntityType.USER, String)
  async logout(@Req() request: Request, @Res() response: Response) {
    // ITS LOGIC HAVE TO BE IN DECORATORS OR OTHER FUNCTION (NEED REFACTOR)
    // Access-stratege push Payload ro request and here we get email from there
    const email: string = request['user']['payload']['email'];

    // check the user is logged in
    const message = await this.authService.logout(email);

    // delete refreshToken from cookies (logged user out)
    response.clearCookie(this.REFRESH_TOKEN_KEY);
    return new ApiResponse(Actions.LOGOUT, EntityType.USER, message);
  }

  // #################### REFRESH USER ####################
  @Post('refresh')
  @HttpCode(200)
  @UseGuards(AuthGuard('access-strategy'))
  @ApiOperation({ summary: 'Refresh access token, refresh cookies' })
  @ApiSwaggerResponse(Actions.REFRESH, EntityType.USER, String)
  async refresh(@Req() request: Request, @Res() response: Response): Promise<ApiResponse<Token>> {
    // ITS LOGIC HAVE TO BE IN DECORATORS OR OTHER FUNCTION (NEED REFACTOR)
    // Access-stratege push Payload ro request and here we get email from there
    const email: string = request['user']['payload']['email'];

    // check the user is logged in
    const { accessToken, refreshToken } = await this.authService.refresh(email);

    // refresh cookies
    this.setRefreshTokenToCookies(response, refreshToken);
    return new ApiResponse(Actions.REFRESH, EntityType.USER, accessToken);
  }

  // #################### ADD COOKIE WITH REFRESH TOKEN IN RESPONSE ####################
  private setRefreshTokenToCookies(response: Response, token: string) {
    response.cookie(this.REFRESH_TOKEN_KEY, token, {
      httpOnly: true,
      expires: new Date(Date.now() + REFRESH_TOKEN_EXPIRES_IN * 1000),
    });
  }

  //Направляє юзера на гугл аутентифікацію, після чого робить запит на "google/callback"
  @HttpCode(200)
  @UseGuards(GoogleGuard)
  @Get('google')
  googleAuth() { }

  @Get('google/callback')
  @UseGuards(GoogleGuard)
  async googleAuthCallback(@Req() req: Request, @Res({ passthrough: true }) response: Response) {
    const token = req.user['accessToken']
    const { userResponse, refreshToken } = await this.authService.googleAuth(token, 'GOOGLE')
    
    this.setRefreshTokenToCookies(response, refreshToken)
    return new ApiResponse(Actions.CREATE, EntityType.USER, userResponse)
  }
}
