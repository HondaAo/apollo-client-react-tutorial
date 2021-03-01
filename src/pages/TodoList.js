import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { GET_TODOS } from '../graphql/queries/listingTodo';
import { DELETE_TODO } from '../graphql/mutations/deleteTodo';
import { UPDATE_TODO } from '../graphql/mutations/updateTodo';
import { ME_QUERY } from '../graphql/queries/me';

function TodoListing() {
    const { loading, error, data } = useQuery(GET_TODOS)
    const [ deleteTodo ] = useMutation(DELETE_TODO)
    const [ updateTodo ] = useMutation(UPDATE_TODO)
    const { loading: meLoading, data: meData } = useQuery(ME_QUERY)
    const [ todo, setTodo ] = useState("")
    if( loading | meLoading ){
        return (
            <p>Loading....</p>
        )
    }
    if( error ){
        return (
            <p>Something went wrong!!</p>
        )
    }
    return (
        <div>
         {data.listing.map(({id, content})=> {
             return (
                 <>
                 <div key={id}>
                 <form>
                 <p>{id}</p>
                 <p>{content}</p>
                 { meData.me && (
                <>
                 <div>
                     <label>編集</label>
                     <input type="text" onChange={(e) => setTodo(e.target.value) } />
                     <button onClick={() => {
                     updateTodo({
                         variables: {
                             id: parseInt(id),
                             content: todo
                         },
                         update: (store) => {
                            const  todos  =  store.readQuery({
                                query: GET_TODOS
                            });
                            // eslint-disable-next-line array-callback-return
                            const updateTodoListing = todos.listing.map(pickedTodo => {
                                if(pickedTodo.id ===  parseInt(id)){
                                    return {
                                        ...pickedTodo,
                                        content: todo
                                    }
                                }
                                return pickedTodo
                            })
                            store.writeQuery({
                                query: GET_TODOS,
                                data: {
                                    listing: updateTodoListing
                                }
                            });
                         }
                     })
                     setTodo("")
                    }
                    }
                    type="submit">アップデート</button>
                 </div>
                 <p>
                 <button onClick={() => {
                    deleteTodo({ 
                        variables: { id: parseInt(id) }
                    })
                 }}>削除</button></p>
                </>
                 )}
                 </form>
                 </div>
                 </>
             )
         })}    
        </div>
    )
}

export default TodoListing