import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "@entities";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { Exceptions } from "@exceptions";
import { CreateUserDto, LoginDto } from "./dtos";
import { v4 as uuid } from "uuid";
import { EmailService } from "./email/email.service";
import { JwtService } from "./jwt/jwt.service";
import { CryptoService } from "./crypto/crypto.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
    private readonly cryptoService: CryptoService,
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

    const userJWTS = await this.jwtService.generateJWT({
      email,
      refresh: true,
    });

    const activateCode = uuid();
    const activateLink = `http://localhost:5173/activate-email/${activateCode}`;

    await this.emailService.sendActivateLink(email, activateLink);

    const newUser = new User();

    newUser.id = uuid();
    newUser.email = email;
    newUser.username = username;
    newUser.password = await this.cryptoService.hashPassword(password);
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

    await this.cryptoService.checkPassword(password, user.password);

    const userJWTS = await this.jwtService.generateJWT({
      email,
      refresh: true,
    });

    return userJWTS;
  }

  public async refresh(email: string) {
    const { access } = await this.jwtService.generateJWT({
      email,
      refresh: false,
    });
    return { access };
  }
}
