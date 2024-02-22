import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @Length(4,30)
    readonly email: string;

    @IsString()
    @Length(2,30)
    readonly first_name:string;

    @IsString()
    @Length(2,30)
    readonly last_name:string;

    @IsString()
    @IsNotEmpty()
    @Length(4,30)
    readonly password:string;

    @IsString()
    @Length(0,15)
    @IsOptional()
    readonly phone_number:string;

    @IsString()
    @Length(0,30)
    @IsOptional()
    readonly address:string;
}
