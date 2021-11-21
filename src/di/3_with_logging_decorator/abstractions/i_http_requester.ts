export interface IHttpRequester {
  requestInfoByUserUrl(url: string): Promise<number>;
}
