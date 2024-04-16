import { IsEmail, IsNotEmpty, IsNumber, IsOptional, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import validationMessage from 'constants/validationMessage';
import { AddressDto } from 'modules/user/dto/create-user.dto';

export class CreateOrderDto {
  @ApiProperty({ required: false })
  @IsEmail({}, { message: validationMessage.ORDER_CUSTOMER_EMAIL_MSG })
  @IsNotEmpty({ message: validationMessage.ORDER_CUSTOMER_EMAIL_EMPTY_MSG })
  @IsOptional()
  readonly customer_email: string;

  @ApiProperty()
  @IsNumber({}, { message: validationMessage.ORDER_TOTAL_NUMBER_MSG })
  @Min(0, { message: validationMessage.ORDER_TOTAL_MIN_MSG })
  @IsNotEmpty({ message: validationMessage.ORDER_TOTAL_EMPTY_MSG })
  readonly total: number;

  @ApiProperty({ required: false })
  @ValidateNested()
  @Type(() => AddressDto)
  @IsOptional()
  readonly delivery_address: AddressDto;

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => OrderedProducts)
  readonly products: OrderedProducts[];
}

class OrderedProducts {
  @ApiProperty()
  @IsNumber({}, { message: validationMessage.ORDER_PRODUCT_ID_NUMBER_MSG })
  @Min(1, { message: validationMessage.ORDER_PRODUCT_ID_MIN_MSG })
  @IsNotEmpty({ message: validationMessage.ORDER_PRODUCT_ID_EMPTY_MSG })
  readonly product_id: number;

  @ApiProperty()
  @IsNumber({}, { message: validationMessage.ORDER_QUANTITY_NUMBER_MSG })
  @Min(1, { message: validationMessage.ORDER_QUANTITY_MIN_MSG })
  @IsNotEmpty({ message: validationMessage.ORDER_QUANTITY_EMPTY_MSG })
  readonly quantity: number;
}
