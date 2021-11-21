import { injectable } from "inversify";
import { IDatabaseProxy } from "../abstractions/i_database_proxy";
import { User } from "../models/user";

@injectable()
export class DatabaseProxy implements IDatabaseProxy {
  async getUserByid(userId: string): Promise<User> {
    console.log(`Will request local info for userId: ${userId}`);

    return new Promise<User>((resolve, _) =>
      setTimeout(() => {
        resolve(
          new User(
            userId,
            `username for id: ${userId}`,
            `htps://urlforid.com/${userId}`
          )
        );
      }, 2000)
    );
  }

  async saveLog(userId): Promise<void> {
    console.log(`Will save a log for request made by userId: ${userId}`);
    return new Promise<void>((resolve, _) =>
      setTimeout(() => {
        resolve();
      }, 2000)
    );
  }
}
