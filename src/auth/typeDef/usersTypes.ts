export const usersTypes = `
    type User {
        _id: ID!
        email: String!
        password: String!
    }
`;

export const usersTypesQueries = `
    getUsers: [User]!
    getUser(id:ID!):User!
`

export const addUserQueries = `
    addUser(email: String!, password: String!):User!
`