import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

export function generateJWT({
  jwtService,
  configService,
  email,
  refresh,
}: {
  email: string;
  refresh: boolean;
  jwtService: JwtService;
  configService: ConfigService;
}) {
  const access = jwtService.sign(
    { email: email },
    {
      expiresIn: configService.get("ACCESS_EXPIRES_IN"),
      secret: configService.get("JWT_SECRET"),
    },
  );
  if (refresh) {
    const refresh = jwtService.sign(
      { email: email },
      {
        expiresIn: configService.get("REFRESH_EXPIRES_IN"),
        secret: configService.get("JWT_SECRET"),
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
