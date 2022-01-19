import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AppDrawlerNavigation from './AppDrawlerNavigation';
import { ROOT_ROUTES } from './helpers';

const Stack = createStackNavigator();

const Auth = () => null;

function RootNavigator() {
  const user = true;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={ROOT_ROUTES.APPLICATION}
        component={AppDrawlerNavigation}
      />
      <Stack.Screen name={ROOT_ROUTES.AUTH} component={Auth} />
    </Stack.Navigator>
  );
}

export default RootNavigator;
