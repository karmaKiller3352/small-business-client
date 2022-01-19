import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { useRightButtons, PRICE_STACK_ROUTES } from 'navigation/helpers';
import { ScreenWrapper } from 'styles/global';
import PricelistCard from './components/PricelistCard';
import { useSyncList } from 'hooks/datastore';
import { Pricelist } from 'models';
import { ICON_PROPS } from './helpers/constants';

const List = ({ navigation }) => {
  const priceLists = useSyncList({ model: Pricelist });

  useRightButtons({
    buttons: [
      {
        iconProps: ICON_PROPS.ADD_PRICELIST,
        onPress: () => navigation.navigate(PRICE_STACK_ROUTES.PRODUCT_LIST),
        size: 35,
      },
    ],
  });

  return (
    <ScreenWrapper>
      <FlatList
        style={{ paddingHorizontal: 10 }}
        data={priceLists}
        keyExtractor={p => p.id}
        renderItem={props => {
          return (
            <PricelistCard active {...props.item} navigation={navigation} />
          );
        }}
      />
    </ScreenWrapper>
  );
};

export default List;
