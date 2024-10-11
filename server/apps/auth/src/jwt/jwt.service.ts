import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService as JWTService } from "@nestjs/jwt";

@Injectable()
export class JwtService {
  constructor(
    private jwtService: JWTService,
    private configService: ConfigService,
  ) {}
  public async generateJWT({
    email,
    refresh,
  }: {
    email: string;
    refresh: boolean;
  }) {
    const access = this.jwtService.sign(
      { email: email },
      {
        expiresIn: this.configService.get("ACCESS_EXPIRES_IN"),
        secret: this.configService.get("JWT_SECRET"),
      },
    );
    if (refresh) {
      const refresh = this.jwtService.sign(
        { email: email },
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
}
