import { IDatabaseProxy } from "../abstractions/i_database_proxy";
import { IHttpRequester } from "../abstractions/i_http_requester";

export class HttpRequester implements IHttpRequester {
  private readonly databaseProxy: IDatabaseProxy;

  constructor(databaseProxy: IDatabaseProxy) {
    this.databaseProxy = databaseProxy;
  }

  async requestInfoByUserUrl(url: string): Promise<number> {
    console.log(`Will request remote info from url: ${url}`);
    await this.databaseProxy.saveLog(url);
    return new Promise<number>((resolve, _) =>
      setTimeout(() => {
        resolve(23);
      }, 5000)
    );
  }
}
