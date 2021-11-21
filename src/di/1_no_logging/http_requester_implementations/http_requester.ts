import { IHttpRequester } from "../abstractions/i_http_requester";

export class HttpRequester implements IHttpRequester {
  async requestInfoByUserUrl(url: string): Promise<number> {
    console.log(`Will request remote info from url: ${url}`);
    return new Promise<number>((resolve, _) =>
      setTimeout(() => {
        resolve(23);
      }, 5000)
    );
  }
}
