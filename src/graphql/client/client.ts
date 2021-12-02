import { ApolloClient, ApolloLink, InMemoryCache, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

import { authLink } from './auth-link';
import { errorLink } from './error-link';
import { httpLink } from './http-link';
import { paginationMerge } from './pagination-merge';
import { wsLink } from './ws-link';

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink as ApolloLink,
  httpLink,
);

export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, splitLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        fields: {
          ...paginationMerge('getArticles'),
          ...paginationMerge('getEvents'),
          // ...paginationMerge('getVenues'),
        },
      },
    },
  }),
});
