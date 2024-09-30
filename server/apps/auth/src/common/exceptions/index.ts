import { HttpException, HttpStatus } from "@nestjs/common";

export class Exceptions {
  public static Exception(message: string, statusCode: number) {
    return new HttpException(message, statusCode);
  }

  public static UserExist() {
    return this.Exception("User is already exist", HttpStatus.CONFLICT);
  }

  public static WrongFormat() {
    return this.Exception("Wrong info format", HttpStatus.CONFLICT);
  }

  public static UserNotFound() {
    return this.Exception("User not found", HttpStatus.NOT_FOUND);
  }

  public static WrongPassword() {
    return this.Exception("Wrong password provided", HttpStatus.UNAUTHORIZED);
  }

  public static AccountNotActivated() {
    return this.Exception("Account not activated", HttpStatus.UNAUTHORIZED);
  }
}
