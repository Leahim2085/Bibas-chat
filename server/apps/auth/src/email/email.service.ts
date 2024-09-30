import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "@entities";
import { Repository } from "typeorm";
import { Exceptions } from "@exceptions";
import { MailerService } from "@nestjs-modules/mailer";
import * as path from "path";

@Injectable()
export class EmailService {
  transporter: nodemailer.Transporter;

  constructor(
    private configService: ConfigService,
    @InjectRepository(User) private usersRepository: Repository<User>,
    private mailerService: MailerService,
  ) {
    this.transporter = nodemailer.createTransport({
      host: configService.get("SMTP_HOST"),
      port: configService.get("SMTP_PORT"),
      secure: false,
      auth: {
        user: configService.get("SMTP_USER"),
        pass: configService.get("SMTP_PASS"),
      },
    });
  }

  public async sendActivateLink(to: string, activateLink) {
    return await this.mailerService.sendMail({
      to,
      subject: "Активация аккаунта в Bibas Chat",
      template: path.resolve("./src/common/templates/activate-email.hbs"),
      context: {
        activateLink,
      },
    });
  }

  public async activateEmail(code: string) {
    const user = await this.usersRepository.findOne({
      where: { emailCode: code },
    });

    if (!user) {
      throw Exceptions.UserNotFound();
    }

    user.emailCode = null;
    user.isActivatedEmail = true;

    return await this.usersRepository.save(user);
  }
}
