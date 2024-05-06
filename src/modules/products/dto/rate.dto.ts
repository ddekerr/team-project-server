import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsNumber } from 'class-validator';
import validationMessage from 'constants/validationMessage';

export class RateDto {
  @ApiProperty({ type: String, nullable: false, enum: [1, 2, 3, 4, 5] })
  @IsNotEmpty({ message: validationMessage.PRODUCT_RATE_VALUE_EMPTY_MSG })
  @IsNumber({}, { message: validationMessage.PRODUCT_RATE_VALUE_NUMBER_MSG })
  @IsIn([1, 2, 3, 4, 5], { message: validationMessage.PRODUCT_RATE_VALUE_IN_RANGE_MSG })
  readonly value: number;
}
