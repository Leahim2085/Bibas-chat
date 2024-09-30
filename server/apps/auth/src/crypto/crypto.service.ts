import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { Exceptions } from "@exceptions";

@Injectable()
export class CryptoService {
  public async checkPassword(password: string, hash: string) {
    const compared = await bcrypt.compare(password, hash);
    if (!compared) {
      throw Exceptions.WrongPassword();
    }

    return compared;
  }

  public async hashPassword(password: string) {
    return bcrypt.hashSync(password, 3);
  }
}
