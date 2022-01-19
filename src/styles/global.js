import {
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  View,
} from 'react-native';
import React from 'react';
import { useThemedStyles } from 'hooks/common';

const getStyles = (theme, props) => {
  const container = {
    flex: 1,
    flexDirection: 'column',
  };

  if (props.indent) container.paddingHorizontal = 10;

  return StyleSheet.create({
    wrapper: {
      minHeight: '100%',
      backgroundColor: theme.background.block,
    },
    container,
  });
};

export const ScrollContainer = ({ children, indent }) => {
  const { Styles } = useThemedStyles(getStyles, { indent });

  return <ScrollView style={Styles.container}>{children}</ScrollView>;
};

export const ScreenWrapper = ({ children }) => {
  const { Styles } = useThemedStyles(getStyles);

  return (
    <SafeAreaView>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0.3)" />
      <View style={Styles.wrapper}>{children}</View>
    </SafeAreaView>
  );
};

export const GlobalStyles = StyleSheet.create({
  title: {
    fontFamily: 'Oswald-Medium',
    fontWeight: '500',
  },
  number: {
    fontFamily: 'BaiJamjuree-Regular',
    fontWeight: '400',
  },
  regular: {
    fontFamily: 'RobotoCondensed-Regular',
    fontWeight: '400',
  },
  thin: {
    fontFamily: 'RobotoCondensed-Light',
    fontWeight: '300',
  },
  bold: {
    fontFamily: 'RobotoCondensed-Bold',
    fontWeight: '700',
  },
});

export const getStyleType = ({
  type: { title, number, thin, bold },
  style,
}) => {
  const styles = [style];

  if (title) {
    styles.push(GlobalStyles.title);
  } else if (number) {
    styles.push(GlobalStyles.number);
  } else if (bold) {
    styles.push(GlobalStyles.bold);
  } else if (thin) {
    styles.push(GlobalStyles.thin);
  } else {
    styles.push(GlobalStyles.regular);
  }

  return styles;
};
