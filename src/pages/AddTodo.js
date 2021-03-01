import React, { useEffect, useState } from 'react'
import { ADD_TODO } from '../graphql/mutations/addTodo'
import { useHistory } from 'react-router';
import { gql, useMutation, useQuery } from '@apollo/client';
import { ME_QUERY } from '../graphql/queries/me';
import { GET_TODOS } from '../graphql/queries/listingTodo';

function AddTodo() {
    const history = useHistory();
    const [ content, setContent ] = useState("")
    const { loading, data } = useQuery(ME_QUERY)
    const [addTodo] = useMutation(ADD_TODO, {
        variables: {
            content
        },
        update: (store, { data }) => {
            const  todos  =  store.readQuery({
                query: GET_TODOS
            });
            store.writeQuery({
                query: GET_TODOS,
                data: {
                  listing:  [ ...todos.listing, data.addTodo ]
                  
                }
            });
        },
        onCompleted: () => {
            history.push('/')
        }
    })
    const onSubmit = (e) => {
        e.preventDefault();
        addTodo();
    }
    useEffect(() => {
        if(!loading && !data.me){
            history.push('/login')
        }
    },[loading, data, history])
    return (
        <form onSubmit={onSubmit}>
          <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />  
          <button type="submit">ADD TODO</button>
        </form>
    )
}

export default AddTodo
