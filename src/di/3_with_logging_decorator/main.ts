import { DatabaseProxy } from "./database_proxy_implementations/database_proxy";
import { HttpRequester } from "./http_requester_implementations/http_requester";
import { HttpRequesterLoggerDecorator } from "./http_requester_implementations/http_requester_logger_decorator";
import { LargeProcessing } from "./large_processing";

// Es posible notar que solo aquí se depende de las implementaciones. Para el resto del proyecto es indiferente qué implementación llegan.
// Aquí la raíz de composición es la encargada de reusar una misma implementación de databaseProxy (ciclo de vida).
// Aquí la raíz de composición es la encargada de interceptar las implementaciones de la interfaz

//Raiz de composición
const databaseProxy = new DatabaseProxy();
const httpRequester = new HttpRequesterLoggerDecorator(
  new HttpRequester(),
  databaseProxy
);

const diProcessing = new LargeProcessing(httpRequester, databaseProxy);

diProcessing
  .handleUserRequest("myUserId")
  .then((result) => console.log(`El resultado final es: ${result}`));
