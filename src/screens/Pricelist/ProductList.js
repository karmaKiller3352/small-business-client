import React, { useCallback, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text } from 'react-native';
import { ScreenWrapper } from 'styles/global';
import { useMomentLocale } from 'hooks/common';
import { useTranslation } from 'react-i18next';
import { PRICE_STACK_ROUTES, useRightButtons } from 'navigation/helpers';
import { useSyncActions, useSyncEntity } from 'hooks/datastore';
import { DATE_FORMATS } from 'constants/common';
import { Pricelist } from 'models';
import * as R from 'ramda';
import { ICON_PROPS } from './helpers/constants';
import AddNameLayout from './components/AddNameLayout';
import { checkPricelistName } from './helpers/utils';

const getStyles = (theme, props) =>
  StyleSheet.create({
    addButton: {
      textAlign: 'center',
      shadowColor: theme.background.secondary,
      padding: 10,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
      flex: 1,
      backgroundColor: theme.background.secondary,
    },
  });

const ProductList = ({ navigation, route }) => {
  const details = R.pathOr({}, ['params', 'details'], route);

  // replace fo fecthing and add refresh function for pricelist details after product add, updating

  const products = R.pathOr([], ['params', 'details', 'products'], route);
  const formattedDate = useMomentLocale({ format: DATE_FORMATS.FRIENDLY });
  const { t } = useTranslation();
  const initPlaceholder = `${t('menu.pricelist.details')} - ${formattedDate}`;

  const title = R.pathOr(initPlaceholder, ['params', 'title'], route);

  const { entity, setEntity } = useSyncEntity(Pricelist, details.id, {
    title,
    ...details,
  });

  const { syncAction, removeAction } = useSyncActions();
  const afterRemove = () => navigation.goBack();

  useRightButtons({
    buttons: [
      {
        iconProps: ICON_PROPS.ADD_PRODUCT,
        onPress: () =>
          navigation.navigate(PRICE_STACK_ROUTES.PRODUCT, {
            pricelistID: entity.details.id,
          }),
      },
      {
        iconProps: ICON_PROPS.DELETE,
        onPress: async () => {
          await removeAction(entity.id, Pricelist, afterRemove);
        },
      },
    ],
  });

  const addNameHandler = useCallback(
    async title => {
      const newPricelist = {
        ...entity,
        title,
      };

      const data = await syncAction(newPricelist, Pricelist);
      setEntity(data);
    },
    [entity],
  );

  return (
    <AddNameLayout
      options={{ priceList: entity.id }}
      navigation={navigation}
      route={route}
      validations={checkPricelistName}
      initPlaceholder={initPlaceholder}
      addNameHandler={addNameHandler}
      entity={entity}>
      <ScreenWrapper>
        <FlatList
          data={products}
          style={{ paddingHorizontal: 10 }}
          renderItem={p => (
            <Pressable
              onPress={() =>
                navigation.navigate(PRICE_STACK_ROUTES.PRODUCT, {
                  details: p.item,
                  pricelistID: entity.id,
                })
              }>
              <Text>{p.item.title}</Text>
            </Pressable>
          )}
          keyExtractor={p => p.id}
        />
      </ScreenWrapper>
    </AddNameLayout>
  );
};

export default ProductList;
