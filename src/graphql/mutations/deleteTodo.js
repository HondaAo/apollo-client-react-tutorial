import { gql } from '@apollo/client'

export const DELETE_TODO = gql `
 mutation deleteTodoMutation($id: Int!){
    deleteTodo(id: $id)
 }
`