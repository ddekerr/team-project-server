import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, MaxLength, IsOptional } from 'class-validator';
import validationMessage from 'constants/validationMessage';

export class CreateCategoryDto {
  @ApiProperty()
  @IsNotEmpty({ message: validationMessage.CATEGORY_TITLE_EMPTY_MSG })
  @IsString({ message: validationMessage.CATEGORY_TITLE_STRING_MSG })
  @MinLength(3, { message: validationMessage.CATEGORY_TITLE_MIN_LENGTH_MSG })
  @MaxLength(64, { message: validationMessage.CATEGORY_TITLE_MAX_LENGTH_MSG })
  readonly title: string;

  @ApiProperty({ required: false })
  @IsNotEmpty({ message: validationMessage.CATEGORY_PARENT_EMPTY_MSG })
  @IsString({ message: validationMessage.CATEGORY_PARENT_STRING_MSG })
  @IsOptional()
  readonly parent?: string;

  @ApiProperty({ required: false })
  @IsNotEmpty({ message: validationMessage.CATEGORY_ICON_EMPTY_MSG })
  @IsString({ message: validationMessage.CATEGORY_ICON_STRING_MSG })
  @IsOptional()
  readonly icon?: string;
}
