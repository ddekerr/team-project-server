import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiResponse } from 'helpers/ApiResponse';
import { Actions, EntityType } from 'types';
import { ChangeRolesDto } from './dto/change-role.dto';
import { UserDocument } from './schemas/user.schema';

@Controller('api/user')
export class UserController {
  constructor(private userService: UsersService) {}

  @Post('changeRoles')
  async changeRoles(@Body() dto: ChangeRolesDto): Promise<ApiResponse<UserDocument>> {
    const userResponse = await this.userService.changeRoles(dto);
    return new ApiResponse(Actions.CHANGE_ROLE, EntityType.USER, userResponse);
  }
}
