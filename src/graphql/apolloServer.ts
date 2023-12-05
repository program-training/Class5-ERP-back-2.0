import { ApolloServer } from "@apollo/server";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import { requireAuth } from "../middleware/auth";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export default server;
