import { usersTypesMutation, usersTypes, usersTypesQueries } from "../auth/typeDef/usersTypes";
import { inventoryTypes, inventoryTypesQuery } from "../internalRequests/typeDef/inventoryTypes";

const typeDefs = `#graphql   

  ${usersTypes}
  ${inventoryTypes}

  type Query{
    ${usersTypesQueries}
    ${inventoryTypesQuery}
  }

  type Mutation {
    ${usersTypesMutation}
  }
`;

export default typeDefs;
