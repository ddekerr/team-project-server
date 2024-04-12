import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }


    @Post()
    async createUser(@Res() response, @Body() createUserDto: CreateUserDto) {
        try {
            const newUser = await this.userService.createUser(createUserDto)
            return response.status(HttpStatus.CREATED).json({
                message: 'User has been created successfully',
                newUser,
            });
        } catch {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: User not created!',
                error: 'Bad Request'
            });
        }
    }

    @Put('/:id')
    async updateStudent(@Res() response, @Param('id') userId: string,
        @Body() updateuserDto: UpdateUserDto) {
        try {
            const existingStudent = await this.userService.updateUser(userId, updateuserDto);

            return response.status(HttpStatus.OK).json({
                message: 'User has been successfully updated',
                existingStudent,
            });

        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: User not find!',
                error: 'Bad Request'
            });;
        }
    }
    
    @Get('/:id')
    async getUser(@Res() response, @Param('id') userId: string) {
        try {
            const existingUser = await this.userService.getUser(userId);
            return response.status(HttpStatus.OK).json({
                message: 'User found successfully', existingUser,
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: User not found!',
                error: 'Bad Request'
            });
        }
    }

    @Delete('/:id')
    async deleteUser(@Res() response, @Param('id') userId: string) {
        try {
            const deletedUser = await this.userService.deleteUser(userId);
            return response.status(HttpStatus.OK).json({
                message: deletedUser
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: User not found!',
                error: 'Bad Request'
            });
        }

    }
}
