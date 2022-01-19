import React from 'react';
import { useTranslation } from 'react-i18next';
import { createDrawerNavigator } from '@react-navigation/drawer';
import NotFoundScreen from 'screens/NotFoundScreen';
import RightMenu from 'screens/RightMenu';
import BottomTabNavigator from './BottomTabNavigator';
import { useDrawlerNavigationOptions, APP_DRAWLER_ROUTES } from './helpers';

const Drawler = createDrawerNavigator();

const AppDrawlerNavigation = () => {
  const { t } = useTranslation();
  const drawlerScreenOptions = useDrawlerNavigationOptions();

  return (
    <Drawler.Navigator
      initialRouteName="BottomMenu"
      drawerType="back"
      screenOptions={drawlerScreenOptions}
      drawerPosition="left"
      drawerContent={props => <RightMenu.Content {...props} />}>
      <Drawler.Screen
        options={{ headerShown: false }}
        name={APP_DRAWLER_ROUTES.BOTTOM_MENU}
        component={BottomTabNavigator}
      />
      <Drawler.Screen
        name="Profile"
        options={{ title: t('menu.drawer.profile') }}
        component={NotFoundScreen}
      />
      <Drawler.Screen
        name={APP_DRAWLER_ROUTES.SETTINGS}
        options={{ title: t('menu.drawer.settings') }}
        component={RightMenu.Settings}
      />
      <Drawler.Screen
        name={APP_DRAWLER_ROUTES.PAYMENT}
        options={{ title: t('menu.drawer.payment') }}
        component={NotFoundScreen}
      />
      <Drawler.Screen
        name={APP_DRAWLER_ROUTES.REPORTS}
        options={{ title: t('menu.drawer.reports') }}
        component={NotFoundScreen}
      />
    </Drawler.Navigator>
  );
};

export default AppDrawlerNavigation;
