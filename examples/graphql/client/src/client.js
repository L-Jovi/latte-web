import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
export function createFeedClient(token) {
  const endpoint =
    import.meta.env.VITE_GRAPHQL_URL || 'http://127.0.0.1:4000/graphql';
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const socket = createClient({
    url: endpoint.replace(/^http/, 'ws'),
    connectionParams: headers,
    lazy: true,
    retryAttempts: 0,
  });
  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    new GraphQLWsLink(socket),
    new HttpLink({ uri: endpoint, headers }),
  );
  return {
    client: new ApolloClient({ link, cache: new InMemoryCache() }),
    close() {
      socket.dispose();
    },
  };
}
