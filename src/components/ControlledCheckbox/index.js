import React from 'react';
import { Controller, useFormState } from 'react-hook-form';
import { Input, Icon, CheckBox } from 'react-native-elements';
import * as R from 'ramda';
import { StyleSheet } from 'react-native';
import { noop } from 'utils/global';
import Section from 'components/Section';
import { useThemedStyles } from 'hooks/common';
import Caption from 'components/Caption';

const getStyles = (theme, { disabled }) =>
  StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      paddingLeft: 0,
      opacity: disabled ? 0.6 : 1,
    },
    label: {
      color: theme.color.primary,
      fontWeight: '400',
      fontSize: 17,
    },
  });

const ControlledCheckbox = ({ name, control, rules, title, disabled }) => {
  const { Styles, theme } = useThemedStyles(getStyles, { disabled });

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, formState }) => {
        const errorMessage = R.path(['errors', name, 'message'], formState);

        return (
          <Section width="100%">
            <CheckBox
              checkedColor={theme.icon.arrowDown}
              textStyle={Styles.label}
              containerStyle={Styles.container}
              title={title}
              checked={value}
              onBlur={onBlur}
              onPress={() => onChange(!value)}
            />
            {errorMessage && (
              <Caption pl={10} size={12} color="error">
                {errorMessage}
              </Caption>
            )}
          </Section>
        );
      }}
    />
  );
};

export default ControlledCheckbox;
