import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from "@nestjs/config";
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {Logger} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get('RABBITMQ_URL') as string],
      queue: 'messages_queue',
      queueOptions: {
        durable: true,
      },
    },
  });

  app.startAllMicroservices().then(() => Logger.log('Messages service is listening'));
}
bootstrap();
