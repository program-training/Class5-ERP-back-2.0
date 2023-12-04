const typeDefs = `#graphql   

  ${"userTypes"}
  ${"inventoryTypes"}


  type Query{
    ${"userTypesQueries"}
  ${"inventoryTypesQueries"}
} 
  
   `;

export default typeDefs;
