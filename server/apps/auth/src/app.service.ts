import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "@entities";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { Exceptions } from "@exceptions";
import * as bcrypt from "bcrypt";
import { CreateUserDto, LoginDto } from "./dtos";
import { v4 as uuid } from "uuid";
import { EmailService } from "./email.service";

@Injectable()
export class AppService {
  constructor(
    private readonly emailService: EmailService,
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  public async signup({ email, username, password }: CreateUserDto) {
    const checkEmail = await this.usersRepository.findOne({ where: { email } });
    const checkUsername = await this.usersRepository.findOne({
      where: { username },
    });

    if (checkEmail || checkUsername) {
      throw Exceptions.UserExist();
    }

    const userJWTS = this.generateJWT({ email, refresh: true });

    const activateCode = uuid();
    const activateLink = `http://localhost:5173/activate-email/${activateCode}`;

    await this.emailService.sendActivateLink(email, activateLink);

    const newUser = new User();

    newUser.id = uuid();
    newUser.email = email;
    newUser.username = username;
    newUser.password = bcrypt.hashSync(password, 3);
    newUser.emailCode = activateCode;

    await this.usersRepository.save(newUser);

    return userJWTS;
  }

  public async login({ email, password }: LoginDto) {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw Exceptions.UserNotFound();
    } else if (!user.isActivatedEmail) {
      throw Exceptions.AccountNotActivated();
    }

    await this.checkPassword(password, user.password);

    const userJWTS = this.generateJWT({ email, refresh: true });

    return userJWTS;
  }

  public async refresh(email: string) {
    const { access } = this.generateJWT({ email, refresh: false });
    return { access };
  }

  private generateJWT(options: { email: string; refresh: boolean }) {
    const access = this.jwtService.sign(
      { email: options.email },
      {
        expiresIn: this.configService.get("ACCESS_EXPIRES_IN"),
        secret: this.configService.get("JWT_SECRET"),
      },
    );
    if (options.refresh) {
      const refresh = this.jwtService.sign(
        { email: options.email },
        {
          expiresIn: this.configService.get("REFRESH_EXPIRES_IN"),
          secret: this.configService.get("JWT_SECRET"),
        },
      );

      return {
        access,
        refresh,
      };
    } else {
      return {
        access,
      };
    }
  }

  private async checkPassword(password: string, hash: string) {
    const compared = await bcrypt.compare(password, hash);
    if (!compared) {
      throw Exceptions.WrongPassword();
    }

    return compared;
  }
}
