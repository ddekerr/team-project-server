import { IsNotEmpty, IsString, IsNumber, IsOptional, IsIn, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import validationMessage from 'constants/validationMessage';
import { Types } from 'mongoose';

export class CreateReviewDto {
  @ApiProperty({ type: Number, nullable: false, enum: [1, 2, 3, 4, 5] })
  @IsNotEmpty({ message: validationMessage.REVIEW_RATING_EMPTY_MSG })
  @IsNumber({}, { message: validationMessage.REVIEW_RATING_NUMBER_MSG })
  @IsIn([1, 2, 3, 4, 5], { message: validationMessage.REVIEW_RATING_IN_RANGE_MSG })
  readonly rating: number;

  @ApiProperty({ type: String, nullable: false })
  @IsNotEmpty({ message: validationMessage.REVIEW_ADVANTAGES_EMPTY_MSG })
  @IsString({ message: validationMessage.REVIEW_ADVANTAGES_STRING_MSG })
  readonly advantages: string;

  @ApiProperty({ type: String, nullable: false })
  @IsNotEmpty({ message: validationMessage.REVIEW_DISADVANTAGES_EMPTY_MSG })
  @IsString({ message: validationMessage.REVIEW_DISADVANTAGES_STRING_MSG })
  readonly disadvantages: string;

  @ApiProperty({ type: String, nullable: true })
  @IsNotEmpty({ message: validationMessage.REVIEW_COMMENT_EMPTY_MSG })
  @IsString({ message: validationMessage.REVIEW_COMMENT_STRING_MSG })
  @IsOptional()
  readonly comment?: string;

  @ApiProperty({ type: String, nullable: false })
  @IsNotEmpty({ message: validationMessage.REVIEW_USER_EMAIL_EMPTY_MSG })
  @IsEmail({}, { message: validationMessage.REVIEW_USER_EMAIL_MSG })
  readonly userEmail: string;

  @ApiProperty({ type: String, nullable: false })
  @IsNotEmpty({ message: validationMessage.REVIEW_PRODUCTID_EMPTY_MSG })
  @IsString({ message: validationMessage.REVIEW_PRODUCTID_STRING_MSG })
  readonly productId: Types.ObjectId;
}
