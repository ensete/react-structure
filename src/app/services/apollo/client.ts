import { ApolloClient, InMemoryCache } from '@apollo/client';
import ENV from "src/app/configs/env";

export const client = new ApolloClient({
  uri: ENV.URLS.GRAPHQL,
  cache: new InMemoryCache()
})