import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  ArrayMinSize,
  IsArray,
  ArrayNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import validationMessage from 'constants/validationMessage';

class CharacteristicsDto {
  @ApiProperty({ type: String })
  @IsNotEmpty({ message: validationMessage.CHARACTERISTIC_NAME_EMPTY_MSG })
  @IsString({ message: validationMessage.CHARACTERISTIC_NAME_STRING_MSG })
  readonly name: string;

  @ApiProperty({ type: [String] })
  @IsNotEmpty({ message: validationMessage.CHARACTERISTIC_DESCRIPTION_EMPTY_MSG })
  @IsArray({ message: validationMessage.CHARACTERISTIC_DESCRIPTION_ARRAY_MSG })
  @ArrayNotEmpty({ message: validationMessage.CHARACTERISTIC_DESCRIPTION_NOT_EMPTY_MSG })
  @ArrayMinSize(1, { message: validationMessage.CHARACTERISTIC_DESCRIPTION_MIN_SIZE_MSG })
  @IsString({ each: true, message: validationMessage.CHARACTERISTIC_DESCRIPTION_STRING_MSG })
  readonly description: string[];
}

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

  @ApiProperty({ type: [CharacteristicsDto], required: false })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CharacteristicsDto)
  readonly characteristics?: CharacteristicsDto[];
}

// export class AddCategoryDto extends PickType(CreateProductDto, ['category'] as const) {}
