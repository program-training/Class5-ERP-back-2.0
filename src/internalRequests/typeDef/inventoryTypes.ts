export const inventoryTypes = `
    type Product {
        id: ID
        name: String
        salePrice: Float
        quantity : Int
        description : String
        category: String
        discountPercentage: Int
        imageUrl: String
        imageAlt: String
        isForSale: Boolean
        costPrice: Float
        supplier: String
        createdBy: String
    }
`;

export const inventoryTypesQuery = `
    getProducts:[Product!]!
    getProduct(id: ID!):Product!
`
