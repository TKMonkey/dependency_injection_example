import { IDatabaseProxy } from "./abstractions/i_database_proxy";
import { IHttpRequester } from "./abstractions/i_http_requester";

// Implementamos el patrón decorador como IHttpRequester, seguimos sin modificar el código actual para recibir dependencias con implementaciones diferentes.
// Adicional a esto, habilitamos la posibilidad de adicionar funcionalidades en el código sin modificar el código actual.

// Podemos verificar que estamos programando contra interfaces y no contra implementaciones.
// Podemos verificar la juntura (seam): el constructor de LargeProcessing recibe una interfaz. No una implementación particular.
//
// SOLID:
// Cada clase es se enfoca en una funcionalidad. (S)
// Habilitamos cambiar funcionalidades en el software sin modificar el código existente (Adaptación al futuro). (O)
// Podemos usar diferentes implementaciones de las interfaces y NO hay que cambiar el código de los consumidores. (L)
// I (No aplica en este caso, pero no va en nada de lo que hicmos lo impide). (I)
// Estamos invirtiendo las dependencias. Ahora las abstracciones no dependen de los detalles, en cambio, los detalles (implementaciones) dependen de abstracciones. (D)
//
// Una vez definidas las interfaces, es posible paralelizar el trabajo. Por un lado crear una implementación de la interfaz, por otro crear módulos/clases que dependan de esa interfaz. Siempre programando contra la abstracción.
// NO SE USA SERVICE LOCATOR EN NINGÚN LADO

export class LargeProcessing {
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
 * (X) quiero llevar un registro de todos los llamados a DB o al servidor http debo modificar el código actual. (Posibilidad de introducir errores).
 * (X) Si quiero manejar errores en la comunicación (circuit breaker), debo modificar el código actual. (Posibilidad de introducir errores).
 * (X) No puedo reemplazar si quiero usar otra forma de comunicarme con la db local o el servidor remoto debo cambiar las clases e instanciarlas de nuevo en la clase NoDIProcessing.
 * (X) Si quiero hacer pruebas unitarias de NoDIProcessing no es fácil hacerlo y seguramente deba configurar el servidor y la db antes de hacerlo (No son pruebas unitarias).
 */
