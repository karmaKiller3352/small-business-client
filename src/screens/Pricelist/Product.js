import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Text } from 'react-native';
import { ScreenWrapper } from 'styles/global';
import AddNameLayout from './components/AddNameLayout';
import { useSyncActions } from 'hooks/datastore';
import { Products } from 'models';
import * as R from 'ramda';
import { useRightButtons } from 'navigation/helpers';
import { useAppForm } from 'hooks/common';
import { vestResolver } from '@hookform/resolvers/vest';
import { productValidation } from './helpers/schemas';
import { checkProductName } from './helpers/utils';
import { ICON_PROPS } from './helpers/constants';

const ProductScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const initPlaceholder = `${t('screen.pricelist.goods')}`;

  const title = R.pathOr(initPlaceholder, ['params', 'title'], route);

  const details = R.pathOr({}, ['params', 'details'], route);
  const pricelistID = R.pathOr({}, ['params', 'pricelistID'], route);

  const defaultValues = {
    title,
    pricelistID,
    ...details,
  };

  const { syncAction } = useSyncActions();
  const onSubmit = async data => await syncAction(data, Products);

  const {
    isDirty,
    setValue,
    register,
    control,
    errors,
    handleSubmit,
    dirtyFields,
    getValues,
    values,
    isValid,
    formState,
  } = useAppForm({
    resolver: vestResolver(productValidation(t)),
    defaultValues,
  });

  register('title', '');
  register('count', '');
  register('sellPrice', '');
  register('purchasePrice', '');

  const addNameHandler = useCallback(title => {
    setValue('title', title, {
      shouldDirty: true,
    });
  }, []);

  useRightButtons({
    buttons: [
      {
        iconProps: ICON_PROPS.SAVE,
        onPress: () => {
          const d = getValues();
          console.log(errors);
          console.log(d);
        },
        show: isDirty,
        size: 26,
      },
    ],
  });

  return (
    <AddNameLayout
      validations={checkProductName}
      navigation={navigation}
      route={route}
      initPlaceholder={initPlaceholder}
      addNameHandler={addNameHandler}
      entity={values}>
      <ScreenWrapper>
        <Text>{values.title}</Text>
        <Button
          title="click"
          onPress={() => {
            const d = getValues();
            console.log(formState.errors);
            console.log(formState.isValid);
          }}
        />
      </ScreenWrapper>
    </AddNameLayout>
  );
};

export default ProductScreen;
