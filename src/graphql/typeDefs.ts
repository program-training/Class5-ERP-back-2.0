import {
  usersTypesMutation,
  usersTypes,
  usersTypesQueries,
} from "../auth/typeDef/usersTypes";
import {
  inventoryTypes,
  inventoryTypesMutation,
  inventoryTypesQuery,
} from "../internalRequests/typeDef/inventoryTypes";

const typeDefs = `#graphql   

  ${usersTypes}
  ${inventoryTypes}

  type Query{
    ${usersTypesQueries}
    ${inventoryTypesQuery}
  }

  type Mutation {
    ${usersTypesMutation}
    ${inventoryTypesMutation}
  }
`;

export default typeDefs;
