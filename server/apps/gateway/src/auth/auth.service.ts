import {Inject, Injectable} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {CreateUserDto, ForgotPasswordDto, LoginDto} from "./dtos";

@Injectable()
export class AuthService {
    constructor(
        @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
    ) {}

    async signup(user: CreateUserDto) {
        return this.authClient.send({ cmd: 'signup' }, { user });
    }

    async login(user: LoginDto) {
        return this.authClient.send({ cmd: 'login' }, { user });
    }

    async logout(token: string) {
        return this.authClient.send({ cmd: 'logout' }, { token });
    }

    async forgotPassword({ email }: ForgotPasswordDto) {
        return this.authClient.send({ cmd: 'forgot-password' }, { email });
    }

    async refresh(token: string) {
        return this.authClient.send({ cmd: 'refresh' }, { token });
    }

    async activateEmail(code: string) {
        return this.authClient.send({ cmd: 'activate-email' }, { code });
    }
}
