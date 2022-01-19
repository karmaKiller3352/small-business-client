import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import Pricelist from 'screens/Pricelist';
import { PRICE_STACK_ROUTES, useStackNavigationOptions } from './helpers';

const Stack = createStackNavigator();

function PriceStackNavigator() {
  const { t } = useTranslation();

  const stackScreenOptions = useStackNavigationOptions();

  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen
        options={{
          title: t('menu.pricelist.list'),
        }}
        headerTitle={t('menu.pricelist.list')}
        name={PRICE_STACK_ROUTES.PRICELISTS}
        component={Pricelist.List}
      />
      <Stack.Screen
        options={{
          title: t('menu.pricelist.details'),
        }}
        name={PRICE_STACK_ROUTES.PRODUCT_LIST}
        component={Pricelist.ProductList}
      />
      <Stack.Screen
        options={{
          title: t('menu.pricelist.product'),
        }}
        name={PRICE_STACK_ROUTES.PRODUCT}
        component={Pricelist.Product}
      />
    </Stack.Navigator>
  );
}

export default PriceStackNavigator;
