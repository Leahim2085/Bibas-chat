import {Body, Controller, Post, UseGuards, Request, Query} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {JwtAuthGuard} from "./guards/jwt-auth.guard";
import {CreateUserDto, ForgotPasswordDto, LoginDto} from "./dtos";

@Controller('auth')
export class AuthController {
    authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    @Post('/signup')
    async signup(@Body() user: CreateUserDto) {
        return await this.authService.signup(user);
    }

    @Post('/login')
    async login(@Body() user: LoginDto) {
        return await this.authService.login(user);
    }

    @Post('/logout')
    @UseGuards(JwtAuthGuard)
    async logout(@Request() { token }) {
        return await this.authService.logout(token);
    }

    @Post('/forgot-password')
    async forgotPassword(@Body() info: ForgotPasswordDto) {
        return await this.authService.forgotPassword(info);
    }

    @Post('/refresh')
    @UseGuards(JwtAuthGuard)
    async refresh(@Request() { token }) {
        return await this.authService.refresh(token);
    }

    @Post('/activate-email')
    async activateEmail(@Query("code") code: string) {
        return await this.authService.activateEmail(code);
    }
}
