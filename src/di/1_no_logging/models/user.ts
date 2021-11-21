export class User {
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
