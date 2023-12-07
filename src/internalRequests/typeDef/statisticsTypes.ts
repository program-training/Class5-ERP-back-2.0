export const statisticsTypes = `
    type ProductStatistics {
        product_id: String
        action: String
        quantity_changed: Int
        current_quantity: Int
        changed_on: String
    }
    
`;

export const statisticTypesQuery = `
    getProductStatistics(id: String!):[ProductStatistics]
`