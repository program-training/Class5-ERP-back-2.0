import { ApolloServer } from "@apollo/server";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import apolloLogger from "../logger/apollo";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [apolloLogger],
});

export default server;
