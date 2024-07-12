import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import validationMessage from 'constants/validationMessage';

class PersonalAddressDto {
  @ApiProperty()
  @IsString({ message: validationMessage.USER_STREET_STRING_MSG })
  @Length(3, 40, { message: validationMessage.USER_STREET_LENGTH_MSG })
  @IsNotEmpty({ message: validationMessage.USER_STREET_EMPTY_MSG })
  readonly street: string;

  @ApiProperty()
  @IsString({ message: validationMessage.USER_HOUSE_STRING_MSG })
  @Length(1, 5, { message: validationMessage.USER_HOUSE_LENGTH_MSG })
  @IsNotEmpty({ message: validationMessage.USER_HOUSE_EMPTY_MSG })
  readonly house: string;

  @ApiProperty({ required: false })
  @IsNumber({}, { message: validationMessage.USER_APARTMENT_NUMBER_MSG })
  @Min(1, { message: validationMessage.USER_APARTMENT_MIN_MSG })
  @Max(999, { message: validationMessage.USER_APARTMENT_MAX_MSG })
  @IsNotEmpty({ message: validationMessage.USER_APARTMENT_EMPTY_MSG })
  @IsOptional()
  readonly apartment?: number;
}

export class AddressDto {
  @ApiProperty()
  @IsString({ message: validationMessage.USER_CITY_STRING_MSG })
  @Length(3, 40, { message: validationMessage.USER_CITY_LENGTH_MSG })
  @IsNotEmpty({ message: validationMessage.USER_CITY_EMPTY_MSG })
  readonly city: string;

  @ApiProperty()
  @IsString({ message: validationMessage.USER_POSTAL_OPERATOR_STRING_MSG })
  @IsNotEmpty({ message: validationMessage.USER_CITY_EMPTY_MSG })
  readonly postalOperator?: string;

  @ApiProperty()
  @IsString({ message: validationMessage.USER_POSTAL_OPERATOR_STRING_MSG })
  @IsNotEmpty({ message: validationMessage.USER_CITY_EMPTY_MSG })
  readonly postalDepartment?: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => PersonalAddressDto)
  @IsOptional()
  readonly personalAddress?: PersonalAddressDto;
}

export class CreateUserDto {
  @ApiProperty({ required: false })
  @IsString({ message: validationMessage.USER_NAME_STRING_MSG })
  @Length(3, 70, { message: validationMessage.USER_NAME_LENGTH_MSG })
  @IsNotEmpty({ message: validationMessage.USER_NAME_EMPTY_MSG })
  @IsOptional()
  readonly first_name?: string;

  @ApiProperty({ required: false })
  @IsString({ message: validationMessage.USER_NAME_STRING_MSG })
  @Length(3, 70, { message: validationMessage.USER_NAME_LENGTH_MSG })
  @IsNotEmpty({ message: validationMessage.USER_NAME_EMPTY_MSG })
  @IsOptional()
  readonly last_name?: string;

  @ApiProperty()
  @IsEmail({}, { message: validationMessage.USER_EMAIL_MSG })
  @IsNotEmpty({ message: validationMessage.USER_EMAIL_EMPTY_MSG })
  readonly email: string;

  @ApiProperty()
  @IsString({ message: validationMessage.USER_PASSWORD_STRING_MSG })
  @Length(4, 32, { message: validationMessage.USER_PASSWORD_LENGTH_MSG })
  @IsNotEmpty({ message: validationMessage.USER_PASSWORD_EMPTY_MSG })
  readonly password: string;

  @ApiProperty({ required: false })
  @IsPhoneNumber('UA', { message: validationMessage.USER_PHONE_MSG })
  @IsNotEmpty({ message: validationMessage.USER_PHONE_EMPTY_MSG })
  @IsOptional()
  readonly phone_number?: string;

  @ApiProperty({ required: false })
  @ValidateNested()
  @Type(() => AddressDto)
  @IsOptional()
  readonly address?: AddressDto;
}
