export const statisticsTypes = `
    type ProductStatistics {
        action: String
        quantity_changed: Int
        current_quantity: Int
        changed_on: 
    }
`;

export const inventoryTypesQuery = `
    getProductStatistic(id: ID!):ProductStatistics!
`