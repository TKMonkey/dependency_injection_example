/// Recibe una llamada, consulta la base de datos la url del usuario con el id recibido, hace un procesamiento interno y luego devuelve un resultado.

import { IDatabaseProxy } from "./abstractions/i_database_proxy";
import { IHttpRequester } from "./abstractions/i_http_requester";

// Al tener una raíz de composición, si una de las implementaciones de las dependencias cambia (HttpRequester) solo cambia a raíz de composición. DE CARA AL CONSUMIDOR NADA CAMBIA.
// Pero el código de la implementación actual SÍ cambia. Aunque funciona, es posible que agregue errores.

export class DIProcessing {
  private readonly httpRequester: IHttpRequester;
  private readonly databaseProxy: IDatabaseProxy;

  constructor(httpRequester: IHttpRequester, databaseProxy: IDatabaseProxy) {
    this.httpRequester = httpRequester;
    this.databaseProxy = databaseProxy;
  }

  async handleUserRequest(userId: string): Promise<number> {
    const user = await this.databaseProxy.getUserByid(userId);
    console.log(`User is: ${user}`);
    const userInfo = await this.httpRequester.requestInfoByUserUrl(user.url);
    console.log(`User info is: ${userInfo}`);

    return userInfo / 2;
  }
}

/**
 * ¿Qué está mejor?
 * (X) Código áltamente acoplado
 * (X) Si cambio el código de la clase HTTP o DB puedo dañar la compatibilidad con la clase NoDIProcessing. Un cambio en una clase me genera cambios que se esparcen en la aplicación.
 * Si quiero llevar un registro de todos los llamados a DB o al servidor http debo modificar el código actual. (Posibilidad de introducir errores).
 * Si quiero manejar errores en la comunicación (circuit breaker), debo modificar el código actual. (Posibilidad de introducir errores).
 * (X) No puedo reemplazar si quiero usar otra forma de comunicarme con la db local o el servidor remoto debo cambiar las clases e instanciarlas de nuevo en la clase NoDIProcessing.
 * (X) Si quiero hacer pruebas unitarias de NoDIProcessing no es fácil hacerlo y seguramente deba configurar el servidor y la db antes de hacerlo (No son pruebas unitarias).
 */
