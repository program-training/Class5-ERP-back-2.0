export const usersTypes = `
    type User {
        _id: ID!
        email: String!
        password: String!
    }

    type ResData {
        token: String!
        user: User!
    }

    type LoginPayload {
        message: String!
        resData: ResData!   
    }

    input LoginInput {
        email: String!
        password: String!
    }
`;

export const usersTypesQueries = `
    getUsers: [User]!
    getUser(id:ID!):User!
`

export const usersTypesMutation = `
    addUser(email: String!, password: String!):User!
    loginUser(input: LoginInput!):LoginPayload
`