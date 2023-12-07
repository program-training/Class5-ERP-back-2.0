export const inventoryTypes = `#graphql
    type Product {
        id: ID
        name: String
        salePrice: Float
        quantity: Int
        description: String
        category: String
        discountPercentage: Int
        imageUrl: String
        imageAlt: String
        isForSale: Boolean
        costPrice: Float
        supplier: String
        createdBy: String
    }

    input addProductInput {
        name: String
        salePrice: Float
        quantity: Int
        description: String
        category: String
        discountPercentage: Int
        imageUrl: String
        imageAlt: String
        isForSale: Boolean
        costPrice: Float
        supplier: String
        createdBy: String
    }

    input updateProductInput {
        id: String
        product: addProductInput
    }

    input deleteProductInput {
        id: String
    }
`;

export const inventoryTypesQuery = `
    getProducts:[Product!]!
    getProduct(id: ID!):Product!
`;

export const inventoryTypesMutation = `
    addProduct(input: addProductInput!):Product!
    updateProduct(input: updateProductInput):Product!
    deleteProduct(input: deleteProductInput):Product!
`;