import { IsEmail, IsString, Length } from "class-validator";

export class LoginDto {
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  @Length(4, 16)
  readonly password: string;
}
