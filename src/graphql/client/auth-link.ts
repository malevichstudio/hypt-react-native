import { setContext } from '@apollo/client/link/context';

import { SecureStore } from '../../services';

export const authLink = setContext(async (_, { headers }) => {
  const token = await SecureStore.getValue('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
