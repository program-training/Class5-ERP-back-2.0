import { addUser, getUser, getUsers } from "../resolvers/usersResolvers";

export const usersQueries = {
    getUsers,
    getUser,
};

export const userAdd = {
    addUser,
}