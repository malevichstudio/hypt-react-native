import 'react-native-gesture-handler';

import { ApolloProvider } from '@apollo/client';
import { registerRootComponent } from 'expo';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { LogBox, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AlertProvider } from './context/alert-context';
import { AuthProvider } from './context/auth-context/auth-context';
import { IntlProvider } from './context/intl-context';
import { NavigationProvider } from './context/navigation-context';
import { ShoppingCartProvider } from './context/shopping-cart-context';
import { SubscriptionNotificationsProvider } from './context/subscription-notifications-context';
import { ToastProvider } from './context/toast-context';
import { client } from './graphql/client/client';
import { theme } from './theme';

const config = {
  dependencies: {
    // eslint-disable-next-line
    'linear-gradient': require('expo-linear-gradient').LinearGradient,
  },
};

function App() {
  LogBox.ignoreLogs([
    'Require cycle:',
    'NativeBase: The contrast ratio',
    'forwardRef render',
  ]);

  return (
    <IntlProvider>
      <ToastProvider>
        <ApolloProvider client={client}>
          <SafeAreaProvider>
            <NativeBaseProvider theme={theme} config={config}>
              <AlertProvider>
                <AuthProvider>
                  <ShoppingCartProvider>
                    <SubscriptionNotificationsProvider>
                      <NavigationProvider />
                    </SubscriptionNotificationsProvider>
                  </ShoppingCartProvider>
                </AuthProvider>
              </AlertProvider>
              <StatusBar barStyle='light-content' />
            </NativeBaseProvider>
          </SafeAreaProvider>
        </ApolloProvider>
      </ToastProvider>
    </IntlProvider>
  );
}

export default registerRootComponent(App);
