import { strict as assert } from "assert";
import { IDatabaseProxy } from "../../../di/2_logging_no_decorator/abstractions/i_database_proxy";
import { IHttpRequester } from "../../../di/2_logging_no_decorator/abstractions/i_http_requester";
import { DIProcessing } from "../../../di/2_logging_no_decorator/di_logging_no_decorator";
import { HttpRequester } from "../../../di/2_logging_no_decorator/http_requester_implementations/http_requester";
import { User } from "../../../di/2_logging_no_decorator/models/user";

class FakeDatabaseProxy implements IDatabaseProxy {
  private readonly userToReturn: User;
  private _savedLogUrl;

  constructor(userToReturn: User) {
    this.userToReturn = userToReturn;
  }

  async getUserByid(userId: string): Promise<User> {
    return this.userToReturn;
  }
  async saveLog(url: string): Promise<void> {
    console.log("En el saveLog: ", url);
    this._savedLogUrl = url;
  }

  get savedUrl(): string | undefined {
    return this._savedLogUrl;
  }
}

class FakeHttpRequester implements IHttpRequester {
  private _receivedUrl?: string;
  private userInfoToReturn: number;

  constructor(userInfoToReturn: number) {
    this.userInfoToReturn = userInfoToReturn;
  }

  async requestInfoByUserUrl(url: string): Promise<number> {
    this._receivedUrl = url;
    return this.userInfoToReturn;
  }

  get receivedUrl(): string | undefined {
    return this._receivedUrl;
  }
}

describe("DIProcessing", () => {
  it("should request user info with user url", async () => {
    // Arrange
    const fakeHttpRequester = new FakeHttpRequester(55);
    const userToReturn = new User(
      "userId",
      "my test 1 user",
      "https://test.com"
    );
    const fakeDatabaseProxy = new FakeDatabaseProxy(userToReturn);

    const diProcessing = new DIProcessing(fakeHttpRequester, fakeDatabaseProxy);
    // Act
    await diProcessing.handleUserRequest("userId");

    // Assert
    assert.equal(fakeHttpRequester.receivedUrl, "https://test.com");
  });

  it("should return data from http request / 2", async () => {
    // Arrange
    const fakeHttpRequester = new FakeHttpRequester(55);
    const userToReturn = new User(
      "userId",
      "my test 1 user",
      "https://test.com"
    );
    const fakeDatabaseProxy = new FakeDatabaseProxy(userToReturn);

    const diProcessing = new DIProcessing(fakeHttpRequester, fakeDatabaseProxy);
    // Act
    const result = await diProcessing.handleUserRequest("userId");

    // Assert
    assert.equal(result, 55 / 2);
  });
});

describe("HttpRequester", function () {
  this.timeout(10000);
  it("should log http requests with user url", async () => {
    // Arrange
    const userToReturn = new User(
      "userId",
      "my test 1 user",
      "https://test.com"
    );
    const fakeDatabaseProxy = new FakeDatabaseProxy(userToReturn);
    const httpRequester = new HttpRequester(fakeDatabaseProxy);

    const diProcessing = new DIProcessing(httpRequester, fakeDatabaseProxy);
    // Act
    await diProcessing.handleUserRequest("userId");

    // Assert
    assert.equal(fakeDatabaseProxy.savedUrl, "https://test.com");
  });
});
