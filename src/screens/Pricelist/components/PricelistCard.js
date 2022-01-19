import * as R from 'ramda';
import React, { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, Image, Pressable } from 'react-native';
import Caption from 'components/Caption';
import Section from 'components/Section';
import { PRICE_STACK_ROUTES } from 'navigation/helpers';
import { useThemedStyles } from 'hooks/common';
import { Products } from 'models';
import { getPriceDetails } from '../helpers/utils';
import { useSyncList } from 'hooks/datastore';

const getStyles = (theme, props) => {
  return StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      height: 150,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.background.primary,
      marginTop: 15,
      shadowColor: '#000',
      padding: 10,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      opacity: props.active ? 1 : 0.6,

      elevation: 6,
    },
    imageSection: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      paddingLeft: 10,
    },
    descriptionSection: {
      paddingLeft: 20,
      paddingRight: 10,
      flex: 2,
    },
    image: {
      borderWidth: 1,
      borderColor: theme.border.primary,
      width: 110,
      height: 110,
    },
    labelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: {
      padding: 5,
      backgroundColor: theme.background.tertiary,
      marginRight: 8,
    },
  });
};

const getImage = uri =>
  uri ? { uri } : require('./images/pricelist-placeholder.png');

const PricelistCard = ({ image, title, active, navigation, ...details }) => {
  const products = useSyncList({
    model: Products,
    filter: c => c.pricelistID === details.id,
  });

  const currency = 'ru'; // TO DO: add fetching current currency from account settings
  const { Styles } = useThemedStyles(getStyles, { active });
  const { t } = useTranslation();

  const fieldNames = useMemo(
    () =>
      getPriceDetails({
        t,
        details: {
          details,
          products,
        },
        currency,
      }),
    [t, details, currency],
  );

  const imagePath = useMemo(() => getImage(image), [image]);

  const goToDetails = useCallback(() => {
    navigation.navigate(PRICE_STACK_ROUTES.PRODUCT_LIST, {
      title,
      details: {
        details,
        products,
      },
    });
  });

  return (
    <Pressable onPress={goToDetails}>
      <View style={Styles.wrapper}>
        <View style={Styles.imageSection}>
          <Image source={imagePath} style={Styles.image} />
        </View>
        <View style={Styles.descriptionSection}>
          <Caption title capitalized numberOfLines={1} size={16} color="forth">
            {title}
          </Caption>

          {R.map(
            field => (
              <Section
                key={field}
                justifyContent="space-between"
                alignItems="center"
                direction="row">
                <Caption size={13}>{fieldNames[field].localeName}</Caption>
                <Caption number size={14}>
                  {fieldNames[field].value}
                </Caption>
              </Section>
            ),
            R.keys(fieldNames),
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default memo(PricelistCard);
