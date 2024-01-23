import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import validationMessage from 'constants/validationMessage';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({ required: false })
  @IsNotEmpty({ message: validationMessage.PRODUCT_IN_STOCK_EMPTY_MSG })
  @IsBoolean({ message: validationMessage.PRODUCT_IN_STOCK_BOOLEAN_MSG })
  @IsOptional()
  inStock?: boolean;
}
