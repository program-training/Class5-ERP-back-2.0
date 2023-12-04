import { getAllUsersFromMongoDB } from "./mongose";
import { User } from "../model/mongose/userSchema";

describe("getAllUsersFromMongoDB", () => {
  it("should return all users on success", async () => {
    const users = [
      {
        email: "1234",
        password: "John",
      },
      {
        email: "5678",
        password: "Jane",
      },
    ];

    jest.spyOn(User, "find").mockResolvedValueOnce(users);

    const result = await getAllUsersFromMongoDB();

    expect(User.find).toHaveBeenCalled();
    expect(result).toEqual(users);
  });

  it("should return rejected promise on error", async () => {
    jest.spyOn(User, "find").mockRejectedValueOnce(new Error("Oops"));

    await expect(getAllUsersFromMongoDB()).rejects.toThrow("Oops");
  });
});
