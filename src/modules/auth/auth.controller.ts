import { Body, Controller, Get, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

import { Actions, EntityType } from 'types';
import { UserResponseWithRefresh } from './types';

import { ApiResponse } from 'helpers/ApiResponse';
import { SetCookieInterceptor } from './interceptors/setCookie.interceptor';
import { ClearCookieInterceptor } from './interceptors/clearCookie.interceptor';
import { Payload } from './decorators/Payload.decorator';
import { ApiGetMe, ApiLoginUser, ApiLogoutUser, ApiRegisterUser, ApiUpdateMe } from './helpers/ApiAuth.documentation';
import { UpdateUserDto } from 'modules/user/dto/update-user.dto';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // #################### REGISTER NEW USER ####################
  @Post('register')
  @ApiRegisterUser()
  @UseInterceptors(SetCookieInterceptor)
  async register(@Body() createUserDto: CreateUserDto): Promise<ApiResponse<UserResponseWithRefresh>> {
    const userResponse = await this.authService.register(createUserDto);
    return new ApiResponse(Actions.CREATE, EntityType.USER, userResponse);
  }

  // #################### LOGIN USER ####################
  @Post('login')
  @ApiLoginUser()
  @UseInterceptors(SetCookieInterceptor)
  async login(@Body() dto: CreateUserDto): Promise<ApiResponse<UserResponseWithRefresh>> {
    const userResponse = await this.authService.login(dto);
    return new ApiResponse(Actions.CREATE, EntityType.USER, userResponse);
  }

  // #################### LOGOUT USER ####################
  @Post('logout')
  @ApiLogoutUser()
  @UseGuards(AuthGuard('access-strategy'))
  @UseInterceptors(ClearCookieInterceptor)
  async logout(@Payload('email') email: string): Promise<ApiResponse<string>> {
    // check the user is logged in
    await this.authService.logout(email);
    return new ApiResponse(Actions.LOGOUT, EntityType.USER);
  }

  // #################### GET ME ####################
  @Get('me')
  @ApiGetMe()
  @UseGuards(AuthGuard('access-strategy'), AuthGuard('refresh-strategy'))
  @UseInterceptors(SetCookieInterceptor)
  async me(@Payload('email') email: string): Promise<ApiResponse<UserResponseWithRefresh>> {
    // check the user is logged in
    const userResponse = await this.authService.me(email);
    return new ApiResponse(Actions.GET, EntityType.USER, userResponse);
  }

  // #################### UPDATE ME ####################
  @Patch('me')
  @ApiUpdateMe()
  @UseGuards(AuthGuard('access-strategy'), AuthGuard('refresh-strategy'))
  @UseInterceptors(SetCookieInterceptor)
  async update(
    @Payload('email') email: string,
    @Body() dto: UpdateUserDto,
  ): Promise<ApiResponse<UserResponseWithRefresh>> {
    const userResponse = await this.authService.update(email, dto);
    return new ApiResponse(Actions.UPDATE, EntityType.USER, userResponse);
  }
}
