import { ApolloServer } from "apollo-server-express";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import { decode } from "jsonwebtoken";

const context = async ({ req }: any) => {
  const token = req.headers.authorization || "";
  const userInfo = decode(token);
  return {
    userInfo,
    token,
  };
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

export default server;
