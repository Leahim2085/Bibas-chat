import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import { AuthModule } from './auth/auth.module';
import { RoomsModule } from './rooms/rooms.module';
import { MessagesModule } from './messages/messages.module';
import { PaymentsModule } from './payments/payments.module';
import { UsersModule } from './users/users.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      validationSchema: Joi.object({
        GATEWAY_PORT: Joi.number().required(),
        RABBITMQ_URL: Joi.string().required(),
      }),
    }),
    AuthModule,
    RoomsModule,
    MessagesModule,
    PaymentsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
