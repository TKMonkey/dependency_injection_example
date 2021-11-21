import { strict as assert } from "assert";
import { IDatabaseProxy } from "../../../di/1_no_logging/abstractions/i_database_proxy";
import { IHttpRequester } from "../../../di/1_no_logging/abstractions/i_http_requester";
import { DIProcessing } from "../../../di/1_no_logging/di_no_logging";
import { User } from "../../../di/1_no_logging/models/user";

class FakeDatabaseProxy implements IDatabaseProxy {
  private readonly userToReturn: User;

  constructor(userToReturn: User) {
    this.userToReturn = userToReturn;
  }

  async getUserByid(userId: string): Promise<User> {
    return this.userToReturn;
  }
  saveLog(url: string): Promise<void> {
    throw new Error("Method not implemented.");
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
