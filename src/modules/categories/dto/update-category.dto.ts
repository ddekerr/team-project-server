import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import validationMessage from 'constants/validationMessage';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiProperty({ required: false })
  @IsNotEmpty({ message: validationMessage.CATEGORY_ORDER_EMPTY_MSG })
  @IsNumber({}, { message: validationMessage.CATEGORY_ORDER_NUMBER_MSG })
  @IsOptional()
  readonly order?: number;
}
