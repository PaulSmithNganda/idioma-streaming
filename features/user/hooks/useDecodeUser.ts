/* eslint-disable @typescript-eslint/no-require-imports */
import { User } from "../types";

export function useDecodeUser(token: string) {
  if (!token) throw new Error("Il y a pas de token");
  const { jwtDecode } = require("jwt-decode");
  const user: User = jwtDecode(token);

  return user;
}
