import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import validationMessage from 'constants/validationMessage';

export class CreateProductDto {
  @ApiProperty({ type: String, default: 'Product title', nullable: false })
  @IsNotEmpty({ message: validationMessage.PRODUCT_TITLE_EMPTY_MSG })
  @IsString({ message: validationMessage.PRODUCT_TITLE_STRING_MSG })
  readonly title: string;

  @ApiProperty({ type: Number, default: 1000, nullable: false })
  @IsNotEmpty({ message: validationMessage.PRODUCT_PRICE_EMPTY_MSG })
  @IsNumber({}, { message: validationMessage.PRODUCT_PRICE_NUMBER_MSG })
  readonly price: number;

  @ApiProperty({ type: String, default: 'category-slug', required: false, nullable: false })
  @IsString({ message: validationMessage.PRODUCT_CATEGORY_STRING_MSG })
  @IsNotEmpty({ message: validationMessage.PRODUCT_CATEGORY_EMPTY_MSG })
  @IsOptional()
  readonly category?: string;
}

export class AddCategoryDto extends PickType(CreateProductDto, ['category'] as const) {}
