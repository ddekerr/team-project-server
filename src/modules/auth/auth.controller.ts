import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put } from '@nestjs/common';
import { AuthService } from './auth.service'; 
import { CreateUserDto } from './dto/create-auth.dto';
import { UpdateUserDto } from './dto/update-auth.dto'; 

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: AuthService) { }

  @Post()
  async creauserIdteUser(@Res() response, @Body() createUserDto: CreateUserDto) {
    try {
      const newStudent = await this.userService.createUser(createUserDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'User has been created successfully',
        newStudent,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User not created!',
        error: 'Bad Request'
      });
    }
  }

  @Put('/:id')
  async updateUsers(@Res() response, @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto) {
    try {
      const existingStudent = await this.userService.updateUser(userId, updateUserDto);
      return response.status(HttpStatus.OK).json({
        message: 'User update',
        existingStudent,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }

  }

  @Get()
  async getUsers(@Res() response) {
    try {
      const usersData = await this.userService.getAllUsers();
      return response.status(HttpStatus.OK).json({
        usersData
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/:id')
  async getUser(@Res() response, @Param('id') usersId: string) {
    try {
      const existingUsers = await
        this.userService.getUser(usersId);
      return response.status(HttpStatus.OK).json({
        message: 'User found successfully', existingUsers,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Delete('/:id')
  async deleteUsers(@Res() response, @Param('id') userId: string) {
    try {
      const deletedStudent = await this.userService.deleteUser(userId);
      return response.status(HttpStatus.OK).json({
        message: 'Student deleted successfully',
        deletedStudent,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}

