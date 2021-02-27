import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { useHistory } from 'react-router';
import { USER_LOGIN } from '../graphql/mutations/login';
import { ME_QUERY } from '../graphql/queries/me';

function Login() {
    const history = useHistory();
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const { loading, data } = useQuery(ME_QUERY)
    useEffect(() => {
    if(!loading && data.me){
         console.log(data)
         history.push('/')
    } 
    },[loading, data, history])
    const onSubmit = (e) => {
        e.preventDefault();
        login()
    }
    const [login] = useMutation(USER_LOGIN, {
        variables: {
            email,
            password
        },
        onCompleted: () => history.push('/')
    })
    return (
        <form onSubmit={onSubmit}>  
         <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />   
         <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} /> 
         <button type="submit">login</button> 
        </form>
    )
}

export default Login
