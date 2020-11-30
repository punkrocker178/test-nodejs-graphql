import {
    ApolloClient,
    gql,
    NormalizedCacheObject
  } from '@apollo/client';
  import { cache } from './cache';
  
  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    uri: 'http://localhost:8888/graphql'
  });

  // ...ApolloClient instantiated here...

client
.query({
  query: gql`
    query TestQuery {
      launch(id: 56) {
        id
        mission {
          name
        }
      }
    }
  `
})
.then(result => console.log(result));
