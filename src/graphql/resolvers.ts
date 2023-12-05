import { usersMutation, usersQueries } from "../auth/queries/usersQueries";
import {
  inventoryMutation,
  inventoryQueries,
} from "../internalRequests/queries/inventoryQueries";

const resolvers = {
  Query: {
    ...usersQueries,
    ...inventoryQueries,
  },

  Mutation: {
    ...usersMutation,
    ...inventoryMutation,
  },
};

export default resolvers;
