import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import {JwtModule} from "@nestjs/jwt";

@Module({
    imports: [
        JwtModule.register({
            secret: new ConfigService().get("JWT_SECRET") as string,
        })
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        {
            provide: 'AUTH_SERVICE',
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return ClientProxyFactory.create({
                    transport: Transport.RMQ,
                    options: {
                        urls: [configService.get('RABBITMQ_URL')],
                        queue: 'auth_queue',
                        queueOptions: {
                            durable: true,
                        },
                    },
                });
            },
        },
    ]
})
export class AuthModule {
}
