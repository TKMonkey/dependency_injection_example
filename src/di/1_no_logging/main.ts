import { DatabaseProxy } from "./database_proxy_implementations/database_proxy";
import { DIProcessing } from "./di_no_logging";
import { HttpRequester } from "./http_requester_implementations/http_requester";

//Raiz de composición
const databaseProxy = new DatabaseProxy();
const httpRequester = new HttpRequester();

const diProcessing = new DIProcessing(httpRequester, databaseProxy);

diProcessing
  .handleUserRequest("myUserId")
  .then((result) => console.log(`El resultado final es: ${result}`));
