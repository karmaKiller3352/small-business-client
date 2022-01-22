import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import Auth from '../screens/Auth';
import { AUTH_STACK_ROUTES, useStackNavigationOptions } from './helpers';

const Stack = createStackNavigator();

function AuthStackNavigator() {
  const { t } = useTranslation();

  const stackScreenOptions = useStackNavigationOptions();

  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen
        options={{
          title: t('screen.auth.signin'),
          headerLeft: null,
        }}
        name={AUTH_STACK_ROUTES.SIGN_IN}
        component={Auth.SignIn}
      />
      <Stack.Screen
        options={{
          title: t('screen.auth.signup'),
        }}
        name={AUTH_STACK_ROUTES.SIGN_UP}
        component={Auth.SignUp}
      />

      <Stack.Screen
        options={{
          title: t('screen.auth.restore_password'),
        }}
        name={AUTH_STACK_ROUTES.PASSWORD_RESTORE}
        component={Auth.PasswordRestore}
      />
    </Stack.Navigator>
  );
}

export default AuthStackNavigator;
