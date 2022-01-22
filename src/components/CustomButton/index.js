import React from 'react';
import { Button } from 'react-native-elements';
import { GlobalStyles } from 'styles/global';
import { useThemedStyles } from 'hooks/common';
import { StyleSheet } from 'react-native';

const getStyles = (theme, { disabled, width }) =>
  StyleSheet.create({
    buttonStyle: {
      backgroundColor: theme.background.secondary,
    },
    buttonContainer: {
      opacity: disabled ? 0.6 : 1,
      width: '100%' || width,
    },
    disabled: {
      backgroundColor: theme.background.secondary,
    },
    disabledTitle: {
      color: theme.thesame.white,
    },
    buttonTitle: GlobalStyles.title,
  });

const CustomButton = ({
  disabled,
  isLoading,
  onPressHandler,
  title,
  width,
}) => {
  const { Styles } = useThemedStyles(getStyles, { disabled, width });

  return (
    <Button
      containerStyle={Styles.buttonContainer}
      disabledStyle={Styles.disabled}
      buttonStyle={Styles.buttonStyle}
      titleStyle={Styles.buttonTitle}
      loading={isLoading}
      disabledTitleStyle={Styles.disabledTitle}
      disabled={disabled}
      onPress={onPressHandler}
      title={title}
    />
  );
};

export default CustomButton;
