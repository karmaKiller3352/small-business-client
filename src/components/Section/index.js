import React, { useContext } from 'react';

import { StyleSheet, View } from 'react-native';
import { useThemedStyles } from 'hooks/common';

const getStyles = (theme, props) =>
  StyleSheet.create({
    container: {
      flexDirection: props.direction,
      alignItems: props.alignItems,
      justifyContent: props.justifyContent,
      width: props.width,
      paddingTop: props.top,
      paddingBottom: props.bottom,
      paddingRight: props.right,
      paddingLeft: props.left,
      height: props.height,
    },
  });

const Section = ({
  top,
  alignItems,
  justifyContent,
  bottom,
  left,
  right,
  width,
  direction,
  height,
  children,
  style,
}) => {
  const { Styles } = useThemedStyles(getStyles, {
    top,
    bottom,
    alignItems,
    justifyContent,
    left,
    height,
    right,
    width,
    direction,
  });

  return <View style={[Styles.container, style]}>{children}</View>;
};

export default Section;
