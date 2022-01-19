import moment from 'moment';
import React, { useMemo } from 'react';
import 'moment/locale/ru';
import 'moment/locale/en-gb';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'context/themeContext';
import { useForm, useFormState } from 'react-hook-form';

const momentLocaleMap = {
  en_US: 'en-gb',
  ru: 'ru',
};

export const useMomentLocale = ({ format, date = Date.now() }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return moment(date).locale(momentLocaleMap[lang]).format(format);
};

export const useThemedStyles = (fn, props = {}) => {
  const { theme, themeName, toggleTheme } = useTheme();

  return useMemo(
    () => ({
      Styles: fn(theme, props),
      theme,
      toggleTheme,
      themeName,
    }),
    [fn, theme, props],
  );
};

export const useAppForm = ({ defaultValues, resolver }) => {
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    register,
    formState: { isDirty, isValid, dirtyFields, errors },
    formState,
  } = useForm({
    defaultValues,
    resolver,
  });

  const values = watch();

  return {
    errors,
    values,
    register,
    dirtyFields,
    handleSubmit,
    control,
    formState,
    setValue,
    getValues,
    isDirty,
    isValid,
  };
};
