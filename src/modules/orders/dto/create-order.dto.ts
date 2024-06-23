import { IsArray, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import validationMessage from 'constants/validationMessage';
import { AddressDto } from 'modules/user/dto/create-user.dto';

class OrderedProductDto {
  @ApiProperty()
  @IsString({ message: validationMessage.ORDER_PRODUCT_ID_STRING_MSG })
  @IsNotEmpty({ message: validationMessage.ORDER_PRODUCT_ID_EMPTY_MSG })
  readonly productId: string;

  @ApiProperty()
  @IsNumber({}, { message: validationMessage.ORDER_QUANTITY_NUMBER_MSG })
  @Min(1, { message: validationMessage.ORDER_QUANTITY_MIN_MSG })
  @IsNotEmpty({ message: validationMessage.ORDER_QUANTITY_EMPTY_MSG })
  readonly quantity: number;
}

class RecepientDto {
  @ApiProperty()
  @IsString({ message: validationMessage.ORDER_RECEPIENT_NAME_STRING_MSG })
  @IsNotEmpty({ message: validationMessage.ORDER_RECEPIENT_NAME_EMPTY_MSG })
  readonly name: string;

  @ApiProperty()
  @IsPhoneNumber('UA', { message: validationMessage.ORDER_RECEPIENT_PHONE_MSG })
  @IsNotEmpty({ message: validationMessage.ORDER_RECEPIENT_PHONE_EMPTY_MSG })
  readonly phone: string;
}

export class CreateOrderDto {
  readonly email: string;

  readonly orderStatus: string;

  @ApiProperty()
  @IsPhoneNumber('UA', { message: validationMessage.ORDER_CUSTOMER_PHONE_MSG })
  @IsNotEmpty({ message: validationMessage.ORDER_CUSTOMER_PHONE_EMPTY_MSG })
  readonly customerPhone: string;

  @ApiProperty()
  @IsNumber({}, { message: validationMessage.ORDER_TOTAL_PRICE_NUMBER_MSG })
  @Min(0.01, { message: validationMessage.ORDER_TOTAL_PRICE_MIN_MSG })
  @IsNotEmpty({ message: validationMessage.ORDER_TOTAL_PRICE_EMPTY_MSG })
  readonly totalPrice: number;

  @ApiProperty()
  @IsString({ message: validationMessage.ORDER_PAYMENT_STATUS_STRING_MSG })
  @IsNotEmpty({ message: validationMessage.ORDER_PAYMENT_STATUS_EMPTY_MSG })
  readonly paymentStatus: string;

  @ApiProperty()
  @IsString({ message: validationMessage.ORDER_PAYMENT_METHOD_STRING_MSG })
  @IsNotEmpty({ message: validationMessage.ORDER_PAYMENT_METHOD_EMPTY_MSG })
  readonly paymentMethod: string;

  @ApiProperty()
  @IsArray()
  @ValidateNested()
  @Type(() => OrderedProductDto)
  readonly products: OrderedProductDto[];

  @ApiProperty()
  @ValidateNested()
  @Type(() => RecepientDto)
  readonly recepient: RecepientDto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => AddressDto)
  readonly deliveryAddress: AddressDto;
}
