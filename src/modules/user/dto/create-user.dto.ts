import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, ValidateNested } from "class-validator";

class AddressDto {
    @IsString()
    city: string;

    @IsString()
    address: string;
}


export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @Length(4, 30)
    readonly email: string;

    @IsString()
    @Length(2, 30)
    readonly first_name: string;

    @IsString()
    @Length(2, 30)
    readonly last_name: string;

    @IsString()
    @IsNotEmpty()
    @Length(4, 30)
    readonly password: string;

    @IsString()
    @Length(0, 15)
    @IsOptional()
    readonly phone_number: string;

    @ValidateNested()
    @Type(() => AddressDto)
    addresses: AddressDto[];
}
