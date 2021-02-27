import React, { useEffect, useState } from 'react'
import { ADD_TODO } from '../graphql/mutations/addTodo'
import { useHistory } from 'react-router';
import { useMutation, useQuery } from '@apollo/client';
import { ME_QUERY } from '../graphql/queries/me';

function AddTodo() {
    const history = useHistory();
    const [ content, setContent ] = useState("")
    const { loading, data } = useQuery(ME_QUERY)
    const [addTodo] = useMutation(ADD_TODO, {
        variables: {
            content
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
