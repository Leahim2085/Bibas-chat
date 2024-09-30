import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsEmail()
    readonly email: string;

    @IsString()
    readonly username: string;

    @IsString()
    @Length(4, 16 )
    readonly password: string;
}
