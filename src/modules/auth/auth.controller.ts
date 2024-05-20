import { Body, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

import { Actions, EntityType } from 'types';
import { UserResponseWithRefresh } from './types';

import { ApiResponse } from 'helpers/ApiResponse';
import { SetCookieInterceptor } from './interceptors/setCookie.interceptor';
import { ClearCookieInterceptor } from './interceptors/clearCookie.interceptor';
import { Payload } from './decorators/Payload.decorator';
import { ApiGetMe, ApiLoginUser, ApiLogoutUser, ApiRegisterUser } from './helpers/ApiAuth.documentation';

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
