import { usersMutation, usersQueries } from "../auth/queries/usersQueries";
import {
  inventoryMutation,
  inventoryQueries,
} from "../internalRequests/queries/inventoryQueries";
import { statisticQueries } from "../internalRequests/queries/statisticQueries";

const resolvers = {
  Query: {
    ...usersQueries,
    ...inventoryQueries,
    ...statisticQueries,
  },

  Mutation: {
    ...usersMutation,
    ...inventoryMutation,
  },
};

export default resolvers;
