import React from 'react';

import { Customer as CustomerType } from '../graphql/generated';
import { AsyncStore } from '../services';

type AsyncStoreDataType = {
  isAsyncStoreLoaded: boolean;
  authKey: string | null;
  customer: null | CustomerType;
  orderData: string | null;
  orderId: string | null;
};

export const useAsyncStore = () => {
  const [data, setData] = React.useState<AsyncStoreDataType>({
    isAsyncStoreLoaded: false,
    authKey: null,
    customer: null,
    orderData: null,
    orderId: null,
  });

  React.useEffect(() => {
    (async () => {
      const authKey = await AsyncStore.getValue('authKey');
      const customer = await AsyncStore.getValue('customer');
      const orderData = await AsyncStore.getValue('orderData');
      const orderId = await AsyncStore.getValue('orderId');
      setData({
        isAsyncStoreLoaded: true,
        authKey,
        customer: customer ? JSON.parse(customer) : null,
        orderData,
        orderId,
      });
    })();
  }, []);

  return data;
};
