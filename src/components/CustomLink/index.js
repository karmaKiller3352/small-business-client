import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useThemedStyles } from 'hooks/common';
import { getStyleType } from 'styles/global';
import { noop } from 'utils/global';

const getStyles = (theme, props) => {
  const textStyles = {};

  if (props.medium) textStyles.fontWeight = '500';
  if (props.white) textStyles.color = theme.thesame.white;
  if (props.black) textStyles.color = theme.thesame.black;

  return StyleSheet.create({
    container: {
      paddingBottom: 1,
      borderRadius: 1,
      borderBottomWidth: 1,
      borderStyle: 'dashed',
      borderColor: theme.color.secondary,
    },
    text: {
      color: theme.color[props.color] || theme.color.primary,
      ...textStyles,
      fontSize: props.size || 30,
    },
  });
};

const CustomLink = ({
  children,
  bold,
  size,
  white,
  black,
  color,
  title,
  thin,
  medium,
  onPressHandler = noop,
  number,
}) => {
  const { Styles } = useThemedStyles(getStyles, {
    size,
    color,
    medium,
    white,
    black,
  });

  const styles = getStyleType({
    type: { title, number, thin, bold },
    style: Styles.text,
  });

  return (
    <Pressable onPress={onPressHandler} style={Styles.container}>
      <Text style={styles}>{children}</Text>
    </Pressable>
  );
};

export default CustomLink;
