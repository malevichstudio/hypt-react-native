import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

import { ROUTES } from '../../constants';
import { MainNavigator } from '../main-navigator';
import { DrawerContent } from './drawer-content';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        swipeEdgeWidth: 0,
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name={ROUTES.mainNavigator} component={MainNavigator} />
    </Drawer.Navigator>
  );
};
