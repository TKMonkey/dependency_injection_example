import assert from "assert";
import { IDatabaseProxy } from "../../../../di/3_with_logging_decorator/abstractions/i_database_proxy";
import { IHttpRequester } from "../../../../di/3_with_logging_decorator/abstractions/i_http_requester";
import { HttpRequesterLoggerDecorator } from "../../../../di/3_with_logging_decorator/http_requester_implementations/http_requester_logger_decorator";
import { User } from "../../../../di/3_with_logging_decorator/models/user";

class FakeIHttpRequester implements IHttpRequester {
  async requestInfoByUserUrl(url: string): Promise<number> {
    console.log("Request Info by User Url");
    return 1;
  }
}

class FakeDatabaseProxy implements IDatabaseProxy {
  private _loggedUrl?: string;

  getUserByid(userId: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  async saveLog(url: string): Promise<void> {
    this._loggedUrl = url;
  }

  get loggedUrl(): string | undefined {
    return this._loggedUrl;
  }
}

describe("HttpRequesterLoggerDecorator", () => {
  it("should call saveLog with url", async () => {
    // Arrange
    const fakeIHttpRequester = new FakeIHttpRequester();
    const fakeDatabaseProxy = new FakeDatabaseProxy();

    const httpRequesterLoggerDecorator = new HttpRequesterLoggerDecorator(
      fakeIHttpRequester,
      fakeDatabaseProxy
    );

    // Act
    await httpRequesterLoggerDecorator.requestInfoByUserUrl(
      "https:myUrl.com/12345"
    );

    // Assert
    assert.equal(fakeDatabaseProxy.loggedUrl, "https:myUrl.com/12345");
  });
});
