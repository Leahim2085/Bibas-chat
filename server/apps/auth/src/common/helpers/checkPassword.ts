import * as bcrypt from "bcrypt";
import { Exceptions } from "@exceptions";

export async function checkPassword(password: string, hash: string) {
  const compared = await bcrypt.compare(password, hash);
  if (!compared) {
    throw Exceptions.WrongPassword();
  }

  return compared;
}
