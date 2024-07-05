import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiResponse } from 'helpers/ApiResponse';
import { Actions, EntityType } from 'types';
import { ChangeRolesDto } from './dto/change-role.dto';
import { UserDocument } from './schemas/user.schema';

@Controller('api/users')
export class UserController {
  constructor(private userService: UsersService) {}

  @Get()
  async getList(): Promise<ApiResponse<UserDocument[]>> {
    const users = await this.userService.getList();
    return new ApiResponse(Actions.GET_LIST, EntityType.USER, users);
  }

  @Post('changeRoles')
  async changeRoles(@Body() dto: ChangeRolesDto): Promise<ApiResponse<UserDocument>> {
    const userResponse = await this.userService.changeRoles(dto);
    return new ApiResponse(Actions.CHANGE_ROLE, EntityType.USER, userResponse);
  }
}
