import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import NotFoundScreen from 'screens/NotFoundScreen';
import { useTabNavigationOptions, BOTTOM_TAB_ROUTES } from './helpers';

import PriceStackNavigator from './PriceStackNavigator';

const TabNavigator = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { t } = useTranslation();
  const tabScreenOptions = useTabNavigationOptions();

  const newMessageCount = 6;
  const newOrderCount = 4;
  // TO DO: Add fetching of count unhandled messages and orders

  return (
    <TabNavigator.Navigator screenOptions={tabScreenOptions}>
      <TabNavigator.Screen
        options={{
          title: t('menu.bottom.home'),
        }}
        name={BOTTOM_TAB_ROUTES.HOME}
        component={NotFoundScreen}
      />
      <TabNavigator.Screen
        options={{
          headerShown: false,
          title: t('menu.bottom.pricelist'),
        }}
        name={BOTTOM_TAB_ROUTES.PRICELIST}
        component={PriceStackNavigator}
      />
      <TabNavigator.Screen
        options={{
          title: t('menu.bottom.clients'),
        }}
        name={BOTTOM_TAB_ROUTES.CLIENTS}
        component={NotFoundScreen}
      />
      <TabNavigator.Screen
        options={{
          tabBarBadge: newMessageCount,
          title: t('menu.bottom.messages'),
        }}
        name={BOTTOM_TAB_ROUTES.MESSAGES}
        component={NotFoundScreen}
      />
      <TabNavigator.Screen
        options={{
          tabBarBadge: newOrderCount,
          title: t('menu.bottom.orders'),
        }}
        name={BOTTOM_TAB_ROUTES.ORDERS}
        component={NotFoundScreen}
      />
    </TabNavigator.Navigator>
  );
};

export default BottomTabNavigator;
