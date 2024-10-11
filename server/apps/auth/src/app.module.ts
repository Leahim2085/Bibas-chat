import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as Joi from "joi";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@entities";
import { JwtModule } from "@nestjs/jwt";
import { EmailService } from "./email/email.service";
import { MailerModule } from "@nestjs-modules/mailer";
import * as path from "path";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { JwtService } from "./jwt/jwt.service";
import { CryptoService } from "./crypto/crypto.service";

@Module({
  imports: [
    JwtModule.register({
      secret: new ConfigService().get("JWT_SECRET") as string,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBITMQ_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        ACCESS_EXPIRES_IN: Joi.string().required(),
        REFRESH_EXPIRES_IN: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USERNAME: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        SMTP_HOST: Joi.string().required(),
        SMTP_PORT: Joi.number().required(),
        SMTP_USER: Joi.string().required(),
        SMTP_PASS: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: "localhost",
        port: configService.get("POSTGRES_PORT"),
        username: configService.get("POSTGRES_USERNAME"),
        password: configService.get("POSTGRES_PASSWORD"),
        database: configService.get("POSTGRES_DATABASE"),
        entities: [User],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([User]),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get("SMTP_HOST"),
          port: configService.get("SMTP_PORT"),
          auth: {
            user: configService.get("SMTP_USER"),
            pass: configService.get("SMTP_PASS"),
          },
        },
        defaults: {
          from: `Bibas Chat <hello@example.com>`,
        },
        template: {
          dir: path.resolve("./src/common/templates/activate-email.hbs"),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, EmailService, JwtService, CryptoService],
})
export class AppModule {}
