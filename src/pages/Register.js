import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { useHistory } from 'react-router';
import { USER_REGISTER } from '../graphql/mutations/register';
import { ME_QUERY } from '../graphql/queries/me';

function Register() {
    const history = useHistory();
    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const { loading, data } = useQuery(ME_QUERY)
    const onSubmit = (e) => {
        e.preventDefault();
        register()
    }
    const [register] = useMutation(USER_REGISTER, {
        variables: {
            username,
            email,
            password
        },
        onCompleted: () => history.push('/login'),
    })
    
    useEffect(() => {
     if(!loading && data.me){
         history.push('/')
     } 
    },[loading, data, history])
    return (
        <form onSubmit={onSubmit}>
         <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} />   
         <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />   
         <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} /> 
         <button type="submit">register</button> 
        </form>
    )
}

export default Register
