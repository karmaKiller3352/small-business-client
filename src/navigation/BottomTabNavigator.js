import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import NotFoundScreen from 'screens/NotFoundScreen';
import { useAxios } from 'hooks/common';
import { useIsFocused } from '@react-navigation/native';
import { useTabNavigationOptions, BOTTOM_TAB_ROUTES } from './helpers';

import PriceStackNavigator from './PriceStackNavigator';
import { Text } from 'react-native';

const ClientScreen = () => {
  const api = useAxios();
  const isFocused = useIsFocused();
  const [clients, setClients] = useState([]);
  console.log('render');
  useEffect(() => {
    const getClients = async () => {
      const res = await api.get('/clients');
      setClients(res);
    };

    if (isFocused) getClients();
  }, [isFocused]);

  return <Text>1</Text>;
};

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
        component={ClientScreen}
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
