import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useThemedStyles } from 'hooks/common';
import { getStyleType } from 'styles/global';

const getStyles = (theme, props) => {
  const container = {
    paddingLeft: props.pl || 0,
    fontSize: props.size || 10,
    paddingRight: props.pr || 0,
    textAlign: props.align,
    width: props.width || 'auto',
  };

  container.color = theme.color[props.color] || theme.color.primary;

  if (props.white) container.color = theme.thesame.white;
  if (props.black) container.color = theme.thesame.black;

  if (props.upper) container.textTransform = 'uppercase';
  if (props.lower) container.textTransform = 'lowercase';
  if (props.capitalized) container.textTransform = 'capitalize';

  if (props.medium) container.fontWeight = '500';
  if (props.underline) container.textDecorationLine = 'underline';
  if (props.italic) container.fontStyle = 'italic';

  return StyleSheet.create({ container });
};

const Caption = ({
  white,
  black,
  pl,
  pr,
  size,
  color,
  children,
  capitalized,
  upper,
  lower,
  bold,
  title,
  medium,
  thin,
  align = 'left',
  number,
  width,
  underline,
  ...props
}) => {
  const { Styles } = useThemedStyles(getStyles, {
    white,
    black,
    pl,
    pr,
    size,
    align,
    color,
    upper,
    lower,
    medium,
    capitalized,
    underline,
    width,
  });

  const styles = getStyleType({
    type: { title, number, thin, bold },
    style: Styles.container,
  });

  return (
    <Text style={styles} {...props}>
      {children}
    </Text>
  );
};

export default Caption;
