import { addUserQueries, usersTypes, usersTypesQueries } from "../auth/typeDef/usersTypes";

const typeDefs = `#graphql   

  ${usersTypes}

  type Query{
    ${usersTypesQueries}
  }

  type Mutation {
    ${addUserQueries}
  }
`;

export default typeDefs;
