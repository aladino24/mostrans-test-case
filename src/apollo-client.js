import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    HttpLink,
    from,
  } from "@apollo/client";
  import { onError } from "@apollo/client/link/error";
  
  // Error handling
  const errorLink = onError(({ graphqlErrors, networkError }) => {
    if (graphqlErrors) {
      graphqlErrors.map(({ message, location, path }) => {
        alert(`GraphQL error ${message}`);
        return null;
      });
    }
    if (networkError) {
      console.log(`Network error: ${networkError}`);
    }
  });
  
  // HTTP connection to the API
  const httpLink = new HttpLink({
    uri: "https://rickandmortyapi.com/graphql",  
  });
  

  const client = new ApolloClient({
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache(),
  });
  
  export default client;
  