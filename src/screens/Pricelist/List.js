import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { useRightButtons, PRICE_STACK_ROUTES } from 'navigation/helpers';
import { ScreenWrapper } from 'styles/global';
import PricelistCard from './components/PricelistCard';
import { ICON_PROPS } from './helpers/constants';

const List = ({ navigation }) => {

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
        data={[]}
        keyExtractor={p => p.id}
        renderItem={props => {
          return null
        }}
      />
    </ScreenWrapper>
  );
};

export default List;
