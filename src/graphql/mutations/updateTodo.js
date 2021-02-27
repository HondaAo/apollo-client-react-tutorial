import { gql } from '@apollo/client'

export const UPDATE_TODO = gql `
 mutation updateTodoMutation($id: Int!, $content: String!){
    updateTodo(id: $id, content: $content){
        id
        content
    }
 }
`