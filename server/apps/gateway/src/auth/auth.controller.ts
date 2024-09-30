import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Query,
  Res,
  HttpStatus,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { CreateUserDto, LoginDto } from "./dtos";
import { JWT_PROPS } from "@enums";

@Controller("auth")
export class AuthController {
  authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  @Post("/signup")
  async signup(
    @Body() user: CreateUserDto,
    @Res({ passthrough: true }) response,
  ) {
    const result = await this.authService.signup(user);

    response.cookie("refresh", result[JWT_PROPS.refresh], {
      expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
      sameSite: "strict",
      httpOnly: true,
    });

    return result;
  }

  @Post("/login")
  async login(@Body() user: LoginDto, @Res({ passthrough: true }) response) {
    const result = await this.authService.login(user);

    response.cookie("refresh", result[JWT_PROPS.refresh], {
      expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
      sameSite: "strict",
      httpOnly: true,
    });

    return result;
  }

  @Post("/logout")
  @UseGuards(JwtAuthGuard)
  async logout(@Request() { user }, @Res({ passthrough: true }) response) {
    response.clearCookie("refresh");
    return HttpStatus.OK;
  }

  @Post("/refresh")
  @UseGuards(JwtAuthGuard)
  async refresh(@Request() { user }) {
    return await this.authService.refresh(user.email);
  }

  @Post("/activate-email")
  async activateEmail(@Query("code") code: string) {
    return await this.authService.activateEmail(code);
  }
}
