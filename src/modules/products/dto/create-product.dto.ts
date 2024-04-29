import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, ArrayMinSize, IsArray } from 'class-validator';
import validationMessage from 'constants/validationMessage';

export class CreateProductDto {
  @ApiProperty({ type: String })
  @IsNotEmpty({ message: validationMessage.PRODUCT_TITLE_EMPTY_MSG })
  @IsString({ message: validationMessage.PRODUCT_TITLE_STRING_MSG })
  readonly title: string;

  @ApiProperty({ type: Number })
  @IsNotEmpty({ message: validationMessage.PRODUCT_PRICE_EMPTY_MSG })
  @IsNumber({}, { message: validationMessage.PRODUCT_PRICE_NUMBER_MSG })
  readonly price: number;

  @ApiProperty({ type: [String] })
  @IsArray({ message: validationMessage.PRODUCT_CATEGORIES_ARRAY_MSG })
  @ArrayMinSize(1, { message: validationMessage.PRODUCT_CATEGORIES_ARRAY_EMPTY_MSG })
  @IsString({ each: true, message: validationMessage.PRODUCT_CATEGORIES_ITEM_STRING_MSG })
  @IsNotEmpty({ each: true, message: validationMessage.PRODUCT_CATEGORIES_ITEM_EMPTY_MSG })
  readonly categories: string[];
}

// export class AddCategoryDto extends PickType(CreateProductDto, ['category'] as const) {}
