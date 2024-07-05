import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, ArrayNotEmpty, IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import validationMessage from 'constants/validationMessage';

export class ChangeRolesDto {
  @ApiProperty({ type: [String] })
  @IsArray({ message: validationMessage.USER_ROLES_ARRAY_MSG })
  @ArrayNotEmpty({ message: validationMessage.USER_ROLES_ARRAY_EMPTY_MSG })
  @ArrayMinSize(1, { message: validationMessage.USER_ROLES_ITEM_EMPTY_MSG })
  @IsString({ each: true, message: validationMessage.USER_ROLES_ITEM_STRING_MSG })
  readonly roles: string[];

  @ApiProperty()
  @IsEmail({}, { message: validationMessage.USER_EMAIL_MSG })
  @IsNotEmpty({ message: validationMessage.USER_EMAIL_EMPTY_MSG })
  readonly email: string;
}
