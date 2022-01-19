import React, { useContext } from 'react';

import { StyleSheet, View, Image } from 'react-native';
import { THUMB_DEFAULT_SIZE } from 'constants/views';
import { useThemedStyles } from 'hooks/common';

const getStyles = (theme, props) =>
  StyleSheet.create({
    image: {
      width: props.size || THUMB_DEFAULT_SIZE,
      height: props.size || THUMB_DEFAULT_SIZE,
      borderRadius: 20,
      backgroundColor: theme.background.primary,
    },
    wrapper: {
      borderColor: theme.border.frames,
      borderWidth: 2,
      borderRadius: 20,
    },
  });

const Avatar = ({ url, size }) => {
  const { Styles } = useThemedStyles(getStyles, { size, url });
  const path = url ? { uri: url } : require('./images/avatar-placeholder.png');

  return (
    <View style={Styles.wrapper}>
      <Image source={path} style={Styles.image} />
    </View>
  );
};

export default Avatar;
