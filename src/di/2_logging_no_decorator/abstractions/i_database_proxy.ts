import { User } from "../models/user";

export interface IDatabaseProxy {
  getUserByid(userId: string): Promise<User>;
  saveLog(url: string): Promise<void>;
}
