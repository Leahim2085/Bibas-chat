import { Controller } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { MessagePattern } from "@nestjs/microservices";
import { CreateUserDto, LoginDto } from "./dtos";
import { EmailService } from "./email/email.service";

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
  ) {}

  @MessagePattern({ cmd: "signup" })
  signup({ user }: { user: CreateUserDto }) {
    return this.authService.signup(user);
  }

  @MessagePattern({ cmd: "login" })
  login({ user }: { user: LoginDto }) {
    return this.authService.login(user);
  }

  @MessagePattern({ cmd: "refresh" })
  refresh({ email }: { email: string }) {
    return this.authService.refresh(email);
  }

  @MessagePattern({ cmd: "activate-email" })
  activateEmail({ code }: { code: string }) {
    return this.emailService.activateEmail(code);
  }
}
