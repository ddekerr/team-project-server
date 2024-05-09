import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import validationMessage from 'constants/validationMessage';

export class QueryParamsDto {
  @ApiProperty({ type: String })
  @IsNotEmpty({ message: validationMessage.REVIEW_PARAMS_PRODUCTID_EMPTY_MSG })
  @IsOptional()
  readonly productId?: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: validationMessage.REVIEW_PARAMS_USERID_EMPTY_MSG })
  @IsOptional()
  readonly userId?: string;
}
