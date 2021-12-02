import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { ROUTES, SCREEN_BACKGROUND } from '../constants';
import { Login } from '../screens/login/login.screen';
import { NewPassword } from '../screens/new-password/new-password.screen';
import { Registration } from '../screens/registration/registration.screen';
import { ResetPassword } from '../screens/reset-password/reset-password.screen';
import { SocialAuth } from '../screens/social-auth/social-auth.screen';
import { Welcome } from '../screens/welcome/welcome.screen';
import { SocialsTypes } from '../types';

export type AuthStackParamList = {
  [ROUTES.welcome]: undefined;
  [ROUTES.login]: undefined;
  [ROUTES.newPassword]: {
    passwordResetToken: string;
  };
  [ROUTES.resetPassword]: undefined;
  [ROUTES.registration]: undefined;
  [ROUTES.socialAuth]: {
    name: SocialsTypes;
  };
};

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: SCREEN_BACKGROUND },
        headerShown: false,
      }}
    >
      <Stack.Screen name={ROUTES.welcome} component={Welcome} />
      <Stack.Screen name={ROUTES.login} component={Login} />
      <Stack.Screen name={ROUTES.resetPassword} component={ResetPassword} />
      <Stack.Screen name={ROUTES.newPassword} component={NewPassword} />
      <Stack.Screen name={ROUTES.registration} component={Registration} />
      <Stack.Screen name={ROUTES.socialAuth} component={SocialAuth} />
    </Stack.Navigator>
  );
};
