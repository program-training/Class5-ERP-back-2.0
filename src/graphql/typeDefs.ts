import {
  usersTypesMutation,
  usersTypes,
  usersTypesQueries,
} from "../auth/typeDef/usersTypes";
import { statisticQueries } from "../internalRequests/queries/statisticQueries";
import {
  inventoryTypes,
  inventoryTypesMutation,
  inventoryTypesQuery,
} from "../internalRequests/typeDef/inventoryTypes";
import { statisticTypesQuery, statisticsTypes } from "../internalRequests/typeDef/statisticsTypes";

const typeDefs = `#graphql   

  ${usersTypes}
  ${inventoryTypes}
  ${statisticsTypes}

  type Query{
    ${usersTypesQueries}
    ${inventoryTypesQuery}
    ${statisticTypesQuery}
  }

  type Mutation {
    ${usersTypesMutation}
    ${inventoryTypesMutation}
  }
`;

export default typeDefs;
