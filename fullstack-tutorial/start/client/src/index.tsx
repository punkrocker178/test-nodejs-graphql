import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider
} from '@apollo/client';
import { cache } from './cache';
import React from 'react';
import ReactDOM from 'react-dom';
import Pages from './pages';
import injectStyles from './styles';
  
  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    uri: 'http://localhost:8888/graphql'
  });

  // ...ApolloClient instantiated here...

  injectStyles();

  // Pass the ApolloClient instance to the ApolloProvider component
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Pages />
    </ApolloProvider>,
    document.getElementById('root')
  );
