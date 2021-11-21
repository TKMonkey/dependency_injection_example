import { inject, injectable } from "inversify";
import { IDatabaseProxy } from "../abstractions/i_database_proxy";
import { IHttpRequester } from "../abstractions/i_http_requester";
import { TYPES } from "../di/inversify.types";

// Introducimos el patrón decorador, con este podemos guardar el registro de los llamados al servidor HTTP SIN MODIFICAR el código actual.

@injectable()
export class HttpRequesterLoggerDecorator implements IHttpRequester {
  private readonly databaseProxy: IDatabaseProxy;
  private readonly decoratedHttpRequester: IHttpRequester;

  constructor(
    @inject(TYPES.IDatabaseProxy) databaseProxy: IDatabaseProxy,
    @inject(TYPES.BaseHttpRequester) decoratedHttpRequester: IHttpRequester
  ) {
    this.databaseProxy = databaseProxy;
    this.decoratedHttpRequester = decoratedHttpRequester;
  }

  async requestInfoByUserUrl(url: string): Promise<number> {
    this.databaseProxy.saveLog(url);
    return this.decoratedHttpRequester.requestInfoByUserUrl(url);
  }
}
