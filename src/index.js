
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {　ApolloProvider,　ApolloClient,　createHttpLink,　InMemoryCache } from '@apollo/client';
// import ApolloClient from 'apollo-boost'
// import { ApolloProvider } from 'react-apollo'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: "include"
});


const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});


ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);