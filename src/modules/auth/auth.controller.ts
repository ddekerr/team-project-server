import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { User } from './../user/schemas/user.schema';
import { CreateUserDto } from '../user/dto/create-user.dto';

import validationMessage from 'constants/validationMessage';
import exceptionMessages from 'constants/exceptionMessages';
import { Actions, EntityType } from 'types';
import { Tokens, UserResponse } from './types';

import { ApiResponse } from 'helpers/ApiResponse';
import { ApiSwaggerResponse } from 'helpers/ApiSwaggerResponse';
import { ApiError } from 'helpers/ApiError';
import { ApiValidationError } from 'helpers/ApiValidationError';
import { Response } from 'express';
import { REFRESH_TOKEN_EXPIRES_IN } from 'constants/tokens';
//import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  private REFRESH_TOKEN_KEY = 'refreshToken';
  constructor(private readonly authService: AuthService) {}

  // #################### REGISTER NEW USER ####################
  @Post('register')
  @HttpCode(201)
  @ApiOperation({ summary: 'Register new user' })
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

  @Post('login')
  async login(@Body() dto: CreateUserDto, @Res() res: Response) {
    const tokens = await this.authService.login(dto);
    console.log(tokens);

    this.setRefreshTokenToCookies(res, tokens.refreshToken);
  }
  // #################### ADD COOKIE WITH REFRESH TOKEN IN RESPONSE ####################
  private setRefreshTokenToCookies(response: Response, token: string) {
    response.cookie(this.REFRESH_TOKEN_KEY, token, {
      httpOnly: true,
      expires: new Date(Date.now() + REFRESH_TOKEN_EXPIRES_IN * 1000),
    });
  }

  // @Put('/:id')
  // async updateStudent(@Res() response, @Param('id') userId: string, @Body() updateuserDto: UpdateUserDto) {
  //   try {
  //     const existingStudent = await this.userService.updateUser(userId, updateuserDto);

  //     return response.status(HttpStatus.OK).json({
  //       message: 'User has been successfully updated',
  //       existingStudent,
  //     });
  //   } catch (err) {
  //     return response.status(HttpStatus.BAD_REQUEST).json({
  //       statusCode: 400,
  //       message: 'Error: User not find!',
  //       error: 'Bad Request',
  //     });
  //   }
  // }

  // @Get('/:id')
  // async getUser(@Res() response, @Param('id') userId: string) {
  //   try {
  //     const existingUser = await this.userService.getUser(userId);
  //     return response.status(HttpStatus.OK).json({
  //       message: 'User found successfully',
  //       existingUser,
  //     });
  //   } catch (err) {
  //     return response.status(HttpStatus.BAD_REQUEST).json({
  //       statusCode: 400,
  //       message: 'Error: User not found!',
  //       error: 'Bad Request',
  //     });
  //   }
  // }

  // @Delete('/:id')
  // async deleteUser(@Res() response, @Param('id') userId: string) {
  //   try {
  //     const deletedUser = await this.userService.deleteUser(userId);
  //     return response.status(HttpStatus.OK).json({
  //       message: deletedUser,
  //     });
  //   } catch (err) {
  //     return response.status(HttpStatus.BAD_REQUEST).json({
  //       statusCode: 400,
  //       message: 'Error: User not found!',
  //       error: 'Bad Request',
  //     });
  //   }
  // }
}
