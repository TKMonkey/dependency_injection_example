import "reflect-metadata";

import { DatabaseProxy } from "./database_proxy_implementations/database_proxy";
import { container } from "./di/inversify.config";
import { TYPES } from "./di/inversify.types";
import { HttpRequester } from "./http_requester_implementations/http_requester";
import { HttpRequesterLoggerDecorator } from "./http_requester_implementations/http_requester_logger_decorator";
import { LargeProcessing } from "./large_processing";

// Es posible notar que solo aquí se depende de las implementaciones. Para el resto del proyecto es indiferente qué implementación llegan.
// Aquí la raíz de composición es la encargada de reusar una misma implementación de databaseProxy (ciclo de vida).
// Aquí la raíz de composición es la encargada de interceptar las implementaciones de la interfaz

//Raiz de composición
// const databaseProxy = new DatabaseProxy();
// const httpRequester = new HttpRequesterLoggerDecorator(
//   databaseProxy,
//   new HttpRequester()
// );

const diProcessing = container.get<LargeProcessing>(TYPES.LargeProcessing); //new LargeProcessing(httpRequester, databaseProxy);

diProcessing
  .handleUserRequest("myUserId")
  .then((result) => console.log(`El resultado final es: ${result}`));
