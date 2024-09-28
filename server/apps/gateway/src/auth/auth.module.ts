import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
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
