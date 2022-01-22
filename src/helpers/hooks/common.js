import moment from 'moment';
import React, { useMemo, useState } from 'react';
import 'moment/locale/ru';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import 'moment/locale/en-gb';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'context/themeContext';
import { useForm } from 'react-hook-form';
import { useAuthContext } from 'providers/AuthProvider';
import { API_URL } from 'constants/common';
import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export const useAppForm = ({ defaultValues, resolver, ...props }) => {
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    setError,
    watch,
    register,
    clearErrors,
    formState: { isDirty, isValid, dirtyFields, errors },
    formState,
  } = useForm({
    defaultValues,
    resolver,
    ...props,
  });

  const values = watch();

  return {
    setError,
    clearErrors,
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

export const useAxios = () => {
  const { tokens, setTokens, setAuth } = useAuthContext();
  const { t } = useTranslation();

  const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: { Authorization: `Bearer ${tokens?.access_token}` },
  });

  axiosInstance.interceptors.request.use(async req => {
    const user = jwt_decode(tokens?.access_token);
    const expiredDate = moment(user.exp).unix() * 1000;
    const dateNow = moment().unix();

    const isExpired = dateNow - expiredDate > 0;

    if (!isExpired) return req;

    try {
      const response = await axios.post(
        `${API_URL}/auth/refresh`,
        {},
        {
          headers: {
            Authorization: `Bearer ${tokens?.refresh_token}`,
          },
        },
      );

      await AsyncStorage.setItem('tokens', JSON.stringify(response.data));

      req.headers.Authorization = `Bearer ${response.data.access_token}`;

      setTokens(response.data);

      return req;
    } catch (error) {
      setAuth(false);
      setTokens(null);

      showMessage({
        message: t('errors.server_error'),
        type: 'danger',
        icon: 'auto',
      });
    }
  });

  return axiosInstance;
};
