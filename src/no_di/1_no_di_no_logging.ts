/// Recibe una llamada, consulta la base de datos la url del usuario con el id recibido, hace un procesamiento interno y luego devuelve un resultado.

export class NoDIProcessing {
  private readonly httpRequester = new HttpRequester();
  private readonly databaseProxy = new DatabaseProxy();

  async handleUserRequest(userId: string): Promise<number> {
    const user = await this.databaseProxy.getUserByid(userId);
    console.log(`User is: ${user}`);
    const userInfo = await this.httpRequester.requestInfoByUserUrl(user.url);
    console.log(`User info is: ${userInfo}`);

    return userInfo / 2;
  }
}

class User {
  readonly id: string;
  readonly username: string;
  readonly url: string;

  constructor(id: string, username: string, url: string) {
    this.id = id;
    this.username = username;
    this.url = url;
  }

  toString(): string {
    return `{
          id: ${this.id},
          username: ${this.username},
          url: ${this.url}
      }`;
  }
}

class DatabaseProxy {
  async getUserByid(userId: string): Promise<User> {
    console.log(`Will request local info for userId: ${userId}`);

    return new Promise<User>((resolve, _) =>
      setTimeout(() => {
        resolve(
          new User(
            userId,
            `username for id: ${userId}`,
            `htps://urlforid.com/${userId}`
          )
        );
      }, 2000)
    );
  }

  async saveLog(userId): Promise<void> {
    console.log(`Will save a log for request made by userId: ${userId}`);
    return new Promise<void>((resolve, _) =>
      setTimeout(() => {
        resolve();
      }, 2000)
    );
  }
}

class HttpRequester {
  async requestInfoByUserUrl(url: string): Promise<number> {
    console.log(`Will request remote info from url: ${url}`);
    return new Promise<number>((resolve, _) =>
      setTimeout(() => {
        resolve(23);
      }, 5000)
    );
  }
}

const noDIProcessing = new NoDIProcessing();

noDIProcessing
  .handleUserRequest("myUserId")
  .then((result) => console.log(`El resultado final es: ${result}`));

/**
 * ¿Qué no está bien?
 * Código áltamente acoplado
 * Si cambio el código de la clase HTTP o DB puedo dañar la compatibilidad con la clase NoDIProcessing. Un cambio en una clase me genera cambios que se esparcen en la aplicación.
 * Si quiero llevar un registro de todos los llamados a DB o al servidor http debo modificar el código actual. (Posibilidad de introducir errores).
 * Si quiero manejar errores en la comunicación (circuit breaker), debo modificar el código actual. (Posibilidad de introducir errores).
 * No puedo reemplazar si quiero usar otra forma de comunicarme con la db local o el servidor remoto debo cambiar las clases e instanciarlas de nuevo en la clase NoDIProcessing.
 * Si quiero hacer pruebas unitarias de NoDIProcessing no es fácil hacerlo y seguramente deba configurar el servidor y la db antes de hacerlo (No son pruebas unitarias).
 */
