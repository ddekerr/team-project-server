import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import validationMessage from 'constants/validationMessage';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty({ message: validationMessage.PRODUCT_TITLE_EMPTY_MSG })
  @IsString({ message: validationMessage.PRODUCT_TITLE_STRING_MSG })
  readonly title: string;

  @ApiProperty()
  @IsNotEmpty({ message: validationMessage.PRODUCT_PRICE_EMPTY_MSG })
  @IsNumber({}, { message: validationMessage.PRODUCT_PRICE_NUMBER_MSG })
  readonly price: number;

  @ApiProperty()
  @IsString({ message: validationMessage.PRODUCT_CATEGORY_STRING_MSG })
  @IsNotEmpty({ message: validationMessage.PRODUCT_CATEGORY_EMPTY_MSG })
  readonly category: string;
}

export class AddCategoryDto extends PickType(CreateProductDto, ['category'] as const) {}
