import { ApolloError } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import create from 'zustand';

export const errorLink = onError(({ networkError, graphQLErrors }) => {
  if (networkError || graphQLErrors) {
    useErrorsStore.setState({
      hasError: true,
      error: networkError || graphQLErrors,
      date: Date.now(),
    });
  }
});

type ErrorType = {
  hasError: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: ApolloError | any;
  date: number | undefined;
};

export const useErrorsStore = create<ErrorType>(() => ({
  hasError: false,
  error: undefined,
  date: undefined,
}));
