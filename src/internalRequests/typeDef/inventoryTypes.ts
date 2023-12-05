export const inventoryTypes = `
    type Product {
        id: ID
        name: String
        salePrice: Int
        quantity : Int
        description : String
        category: String
        discountPercentage: Int
        imageUrl: String
        imageAlt: String
        isForSale: Boolean
        costPrice: Int
        supplier: String
        createdBy: String
    }
`;

export const inventoryTypesQuery = `
    getProducts:[Product!]!
`
