import { gql } from "@apollo/client";

export const USER_REGISTER = gql `
mutation registerMutation($username: String!, $email: String!, $password: String!){
    register(username: $username, email: $email, password: $password){
        username
        email
    }
}
`