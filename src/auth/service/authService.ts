import { getAllUsersFromMongoDB, insertUsers } from "../dal/mongose";
import { comparePassword, generateUserPassword } from "../helpers/bcrypt";
import { UserInterface } from "../interface/user";
import { generateAuthToken } from "../model/jwt/jwt";

type UserResult = Promise<UserInterface | null>;

export const getUsers = async () => {
  try {
    const users = await getAllUsersFromMongoDB();
    return users;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const register = async (user: UserInterface): UserResult => {
  try {
    const users = await getUsers();

    const userRegistered = users.find(
      (userInDB) => userInDB.email === user.email
    );

    if (userRegistered) throw new Error("This user is allready registered!");

    user.password = generateUserPassword(user.password);

    await insertUsers(user);

    return user;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
export const login = async (userFromClient: UserInterface) => {
  try {
    const users = await getAllUsersFromMongoDB();

    if (!users)
      throw new Error("Oops... Could not get the users from the Database");
    const userInDB = users.find((user) => userFromClient.email === user.email);

    if (!userInDB) throw new Error("The email or password is incorrect!");
    // const userCopy = { ...userInDB };

    if (!comparePassword(userFromClient.password, userInDB.password))
      throw new Error("The email or password is incorrect!");

    const token = generateAuthToken(userInDB);
    const resInfoObj = { token: token, user: userInDB };

    return { message: "Login successful", resData: resInfoObj };
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
