import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuthContext } from 'providers/AuthProvider';
import AppDrawlerNavigation from './AppDrawlerNavigation';
import { ROOT_ROUTES } from './helpers';
import AuthStackNavigator from './AuthStackNavigation';

const Stack = createStackNavigator();

function RootNavigator() {
  const { hasAuth } = useAuthContext();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {hasAuth ? (
        <Stack.Screen
          name={ROOT_ROUTES.APPLICATION}
          component={AppDrawlerNavigation}
        />
      ) : (
        <Stack.Screen name={ROOT_ROUTES.AUTH} component={AuthStackNavigator} />
      )}
    </Stack.Navigator>
  );
}

export default RootNavigator;
