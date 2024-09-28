import {Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {ConfigService} from "@nestjs/config";
import {ClientProxyFactory, Transport} from "@nestjs/microservices";

@Module({
    controllers: [UsersController],
    providers: [
        UsersService,
        {
            provide: 'USERS_SERVICE',
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return ClientProxyFactory.create({
                    transport: Transport.RMQ,
                    options: {
                        urls: [configService.get('RABBITMQ_URL')],
                        queue: 'users_queue',
                        queueOptions: {
                            durable: true,
                        },
                    },
                });
            },
        },
    ]
})
export class UsersModule {
}
