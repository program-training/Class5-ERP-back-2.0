export const usersTypes = `
    type User {
        _id: ID!
        email: String!
        password: String!
    }

    type UserResponse {
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

    input UserInput {
        email: String!
        password: String!
    }
`;

export const usersTypesQueries = `
    getUsers: [User]!
    getUser(id:ID!):User!
`

export const usersTypesMutation = `
    registerUser(input: UserInput!):UserResponse!
    loginUser(input: UserInput!):LoginPayload
`