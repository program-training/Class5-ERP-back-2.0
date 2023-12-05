import { getAllUsersFromMongoDB, insertUsers } from "../dal/mongose";
import userValidation from "../model/joi/userValidertion";
import { login } from "../service/authService";

export const getUsers = async () => {
    try{
        const users = await getAllUsersFromMongoDB();
        return users;
    }catch (error) {
        console.log(error);
        return null;
    }
};

interface UserId {
  id: string;
}

export const getUser = async (_: any, { id }: UserId) => {
  try {
    const users = await getAllUsersFromMongoDB();
    const user = users.find((u) => u._id.toString() == id);
    if (user) return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

interface UserAdd {
  email: string;
  password: string;
}
export const addUser = async (_: any, { email, password }: UserAdd) => {
  try {
    const newUser = insertUsers({ email, password });
    return newUser;
  } catch (error) {
    console.log(error);
    return null;
  }
};


export const loginUser = async (_:any, args:any) => {
  try {
    const {email, password} = args.input
    const { error } = userValidation({ email, password });
    if (error?.details[0].message) throw new Error(error?.details[0].message); 

    const token = await login({ email, password });
    return token;
  } catch (error) {
    console.log(error);
    return null;
  }
}