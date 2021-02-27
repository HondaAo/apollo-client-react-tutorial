import { gql } from "@apollo/client";

export const USER_LOGIN = gql `
 mutation loginMutation($email: String!, $password: String!){
     login(email: $email, password: $password){
         username
         email
     }
 }
`