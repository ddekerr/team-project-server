import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { User } from './../user/schemas/user.schema';
import { CreateUserDto } from '../user/dto/create-user.dto';

import validationMessage from 'constants/validationMessage';
import exceptionMessages from 'constants/exceptionMessages';
import { Actions, EntityType } from 'types';
import { UserResponse } from './types';

import { ApiResponse } from 'helpers/ApiResponse';
import { ApiSwaggerResponse } from 'helpers/ApiSwaggerResponse';
import { ApiError } from 'helpers/ApiError';
import { ApiValidationError } from 'helpers/ApiValidationError';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // #################### REGISTER NEW USER ####################
  @Post('register')
  @HttpCode(201)
  @ApiOperation({ summary: 'Register new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiSwaggerResponse(Actions.CREATE, EntityType.USER, User)
  @ApiConflictResponse({ type: ApiError, description: exceptionMessages.CONFLICT_EMAIL_MSG })
  @ApiBadRequestResponse({ type: ApiValidationError, description: validationMessage.VALIDATION_ERROR })
  async register(@Body() createUserDto: CreateUserDto): Promise<ApiResponse<UserResponse>> {
    const newUser = await this.authService.register(createUserDto);
    return new ApiResponse(Actions.CREATE, EntityType.USER, newUser);
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
