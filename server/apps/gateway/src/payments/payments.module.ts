import { Module } from "@nestjs/common";
import { PaymentsController } from "./payments.controller";
import { PaymentsService } from "./payments.service";
import { ConfigService } from "@nestjs/config";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";

@Module({
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    {
      provide: "PAYMENTS_SERVICE",
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get("RABBITMQ_URL")],
            queue: "payments_queue",
            queueOptions: {
              durable: true,
            },
          },
        });
      },
    },
  ],
})
export class PaymentsModule {}
