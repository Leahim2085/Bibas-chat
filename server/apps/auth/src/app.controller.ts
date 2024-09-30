import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import {MessagePattern} from "@nestjs/microservices";
import {CreateUserDto, LoginDto} from "./dtos";
import {EmailService} from "./email.service";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService, private readonly emailService: EmailService) {
    }

    @MessagePattern({cmd: 'signup'})
    signup({user}: { user: CreateUserDto }) {
        return this.appService.signup(user);
    }

    @MessagePattern({cmd: 'login'})
    login({user}: { user: LoginDto }) {
        return this.appService.login(user);
    }

    @MessagePattern({cmd: 'refresh'})
    refresh({email}: { email: string }) {
        return this.appService.refresh(email);
    }

    @MessagePattern({cmd: 'activate-email'})
    activateEmail({code}: { code: string }) {
        return this.emailService.activateEmail(code);
    }
}
