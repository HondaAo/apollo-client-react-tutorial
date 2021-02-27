import { gql } from '@apollo/client'

export const ADD_TODO = gql `
 mutation addTodoMutation($content: String!){
    addTodo(content: $content){
        id
        content
    }
 }
`