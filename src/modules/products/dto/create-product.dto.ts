import { ApiProperty } from '@nestjs/swagger';
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
}
