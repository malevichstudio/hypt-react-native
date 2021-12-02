import { API_WS_HOST } from '../../constants';
import { SecureStore } from '../../services';
import { WebSocketLink } from './web-socket-link';

export const wsLink = new WebSocketLink({
  url: `${API_WS_HOST}/subscriptions`,
  connectionParams: async () => {
    const token = await SecureStore.getValue('token');
    return {
      Authorization: `Bearer ${token}`,
    };
  },
});
