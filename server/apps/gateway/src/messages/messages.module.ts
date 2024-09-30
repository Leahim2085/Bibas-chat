import { Module } from "@nestjs/common";
import { MessagesController } from "./messages.controller";
import { MessagesService } from "./messages.service";
import { ConfigService } from "@nestjs/config";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";

@Module({
  controllers: [MessagesController],
  providers: [
    MessagesService,
    {
      provide: "MESSAGES_SERVICE",
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get("RABBITMQ_URL")],
            queue: "messages_queue",
            queueOptions: {
              durable: true,
            },
          },
        });
      },
    },
  ],
})
export class MessagesModule {}
