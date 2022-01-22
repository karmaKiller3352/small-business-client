import React, { useContext } from 'react';

import { StyleSheet, View } from 'react-native';
import { useThemedStyles } from 'hooks/common';

const getStyles = (theme, props) =>
  StyleSheet.create({
    container: {
      flexWrap: props.wrap ? 'wrap' : 'nowrap',
      flexDirection: props.direction,
      alignItems: props.alignItems,
      justifyContent: props.justifyContent,
      width: props.width || '100%',
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
  wrap,
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
    wrap,
    direction,
  });

  return <View style={[Styles.container, style]}>{children}</View>;
};

export default Section;
