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
import { checkPassword, generateJWT } from "@helpers";

@Injectable()
export class AuthService {
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

    const userJWTS = generateJWT({
      email,
      refresh: true,
      jwtService: this.jwtService,
      configService: this.configService,
    });

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

    await checkPassword(password, user.password);

    const userJWTS = generateJWT({
      email,
      refresh: true,
      jwtService: this.jwtService,
      configService: this.configService,
    });

    return userJWTS;
  }

  public async refresh(email: string) {
    const { access } = generateJWT({
      email,
      refresh: false,
      jwtService: this.jwtService,
      configService: this.configService,
    });
    return { access };
  }
}
