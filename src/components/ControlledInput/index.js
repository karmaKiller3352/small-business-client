import React from 'react';
import { Controller, useFormState } from 'react-hook-form';
import { Input, Icon } from 'react-native-elements';
import * as R from 'ramda';
import { noop } from 'utils/global';

const defaultIconProps = {
  type: 'material',
};

const ControlledInput = ({
  name,
  control,
  rules,
  errorMessage = null,
  iconLeft = {},
  placeholder,
  label,
  iconRight = {},
  inputStyle,
  inputContainerStyle,
  disabled,
  isSecured,
  disabledStyle,
  focusHandler = noop,
  defaultValue,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, formState }) => {
        return (
          <Input
            disabledInputStyle={disabledStyle}
            disabled={disabled}
            inputContainerStyle={inputContainerStyle}
            inputStyle={inputStyle}
            errorMessage={R.pathOr(
              errorMessage,
              ['errors', name, 'message'],
              formState,
            )}
            leftIcon={
              iconLeft.name && (
                <Icon
                  type={iconLeft.type || defaultIconProps.type}
                  name={iconLeft.name}
                />
              )
            }
            leftIconContainerStyle={iconLeft.style}
            rightIcon={
              iconRight.name && (
                <Icon
                  type={iconRight.type || defaultIconProps.type}
                  name={iconRight.name}
                />
              )
            }
            rightIconContainerStyle={iconRight.style}
            placeholder={placeholder}
            label={label}
            value={value}
            onBlur={onBlur}
            onFocus={focusHandler}
            onChangeText={onChange}
            defaultValue={defaultValue}
            secureTextEntry={isSecured}
          />
        );
      }}
    />
  );
};

export default ControlledInput;
