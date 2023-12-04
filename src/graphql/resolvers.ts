import {userTypes} from ''
import {inventoryTypes} from ''

const resolvers = {
    Query: {
        
      ...userTypes,
      ...inventoryTypes

  }
  
  export default resolvers;