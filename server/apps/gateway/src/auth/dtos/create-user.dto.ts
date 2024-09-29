import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsEmail()
    readonly email: string;

    @IsString()
    @IsEmail()
    readonly userName: string;

    @IsString()
    @Length(4, 16 )
    readonly password: string;
}