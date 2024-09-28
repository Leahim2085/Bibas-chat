import {Module} from '@nestjs/common';
import {RoomsController} from './rooms.controller';
import {RoomsService} from './rooms.service';
import {ConfigService} from "@nestjs/config";
import {ClientProxyFactory, Transport} from "@nestjs/microservices";

@Module({
    controllers: [RoomsController],
    providers: [
        RoomsService,
        {
            provide: 'ROOMS_SERVICE',
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return ClientProxyFactory.create({
                    transport: Transport.RMQ,
                    options: {
                        urls: [configService.get('RABBITMQ_URL')],
                        queue: 'rooms_queue',
                        queueOptions: {
                            durable: true,
                        },
                    },
                });
            },
        },
    ]
})
export class RoomsModule {
}
