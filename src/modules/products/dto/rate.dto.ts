import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty } from 'class-validator';
import validationMessage from 'constants/validationMessage';

export class RateDto {
  @ApiProperty({ type: Number, default: 'Product rate value', nullable: false })
  @IsNotEmpty({ message: validationMessage.PRODUCT_RATE_VALUE_EMPTY_MSG })
  @IsIn([1, 2, 3, 4, 5], { message: validationMessage.PRODUCT_TITLE_STRING_MSG })
  readonly value: number;
}
