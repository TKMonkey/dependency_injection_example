import { IDatabaseProxy } from "../abstractions/i_database_proxy";
import { IHttpRequester } from "../abstractions/i_http_requester";

// Introducimos el patrón decorador, con este podemos guardar el registro de los llamados al servidor HTTP SIN MODIFICAR el código actual.

export class HttpRequesterLoggerDecorator implements IHttpRequester {
  private readonly databaseProxy: IDatabaseProxy;
  private readonly decoratedHttpRequester: IHttpRequester;

  constructor(
    decoratedHttpRequester: IHttpRequester,
    databaseProxy: IDatabaseProxy
  ) {
    this.databaseProxy = databaseProxy;
    this.decoratedHttpRequester = decoratedHttpRequester;
  }

  async requestInfoByUserUrl(url: string): Promise<number> {
    this.databaseProxy.saveLog(url);
    return this.decoratedHttpRequester.requestInfoByUserUrl(url);
  }
}
