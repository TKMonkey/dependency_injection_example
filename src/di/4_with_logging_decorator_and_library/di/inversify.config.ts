import { Container } from "inversify";
import { IDatabaseProxy } from "../abstractions/i_database_proxy";
import { IHttpRequester } from "../abstractions/i_http_requester";
import { DatabaseProxy } from "../database_proxy_implementations/database_proxy";
import { HttpRequester } from "../http_requester_implementations/http_requester";
import { HttpRequesterLoggerDecorator } from "../http_requester_implementations/http_requester_logger_decorator";
import { LargeProcessing } from "../large_processing";
import { TYPES } from "./inversify.types";

export const container = new Container();

container
  .bind<IDatabaseProxy>(TYPES.IDatabaseProxy)
  .to(DatabaseProxy)
  .inSingletonScope();

container
  .bind<IHttpRequester>(TYPES.BaseHttpRequester)
  .to(HttpRequester)
  .inSingletonScope()
  .whenInjectedInto(HttpRequesterLoggerDecorator);

container
  .bind<IHttpRequester>(TYPES.IHttpRequester)
  .to(HttpRequesterLoggerDecorator)
  .inSingletonScope();

container.bind<LargeProcessing>(TYPES.LargeProcessing).to(LargeProcessing);
