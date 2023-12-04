import { userAdd, usersQueries } from "../auth/queries/usersQueries";


const resolvers = {
  Query: {
      ...usersQueries,
  },

  Mutation:{
    ...userAdd,
  }
}
  
export default resolvers;