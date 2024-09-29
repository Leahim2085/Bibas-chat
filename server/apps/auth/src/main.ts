import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {Logger} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get('RABBITMQ_URL') as string],
      queue: 'auth_queue',
      queueOptions: {
        durable: true,
      },
    },
  });

  app.startAllMicroservices().then(() => Logger.log('Auth service is listening'));
}
bootstrap();
