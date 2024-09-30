import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreateUserDto, LoginDto } from "./dtos";

@Injectable()
export class AuthService {
  constructor(
    @Inject("AUTH_SERVICE") private readonly authClient: ClientProxy,
  ) {}

  async signup(user: CreateUserDto) {
    return this.authClient.send({ cmd: "signup" }, { user });
  }

  async login(user: LoginDto) {
    return this.authClient.send({ cmd: "login" }, { user });
  }

  async refresh(email: string) {
    return this.authClient.send({ cmd: "refresh" }, { email });
  }

  async activateEmail(code: string) {
    return this.authClient.send({ cmd: "activate-email" }, { code });
  }
}
