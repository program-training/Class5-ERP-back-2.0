import { usersMutation, usersQueries } from "../auth/queries/usersQueries";
import { inventoryQueries } from "../internalRequests/queries/inventoryQueries";


const resolvers = {
  Query: {
      ...usersQueries,
      ...inventoryQueries,
  },

  Mutation:{
    ...usersMutation,
  }
}
  
export default resolvers;