import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { showMessage } from 'react-native-flash-message';
import { noop } from '../helpers/utils/global';
import axios from 'axios';
import { API_URL } from 'constants/common';
import * as R from 'ramda';

const defaultValues = {
  tokens: {},
  isLoading: false,
  setTokens: noop,
  isAuthenticated: false,
};

const AuthContext = createContext(defaultValues);

export const useAuthContext = () => useContext(AuthContext);

const getTokens = async () => {
  try {
    return (await AsyncStorage.getItem('tokens'))
      ? JSON.parse(AsyncStorage.getItem('tokens'))
      : null;
  } catch (error) {
    return null;
  }
};

const AuthProvider = ({ children }) => {
  const [tokens, setTokens] = useState(defaultValues);
  const [hasAuth, setAuth] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    const getTokensFromStorage = async () => {
      const tokens = await getTokens();
      setTokens(tokens);
    };

    getTokensFromStorage();
  }, []);

  const signIn = useCallback(({ email, password }) => {
    setLoading(true);
    axios
      .post(`${API_URL}/auth/signin`, { email, password })
      .then(({ data }) => {
        setTokens(data);
        setLoading(false);
        setAuth(true);
      })
      .catch(e => {
        setTokens(null);
        setLoading(false);
        showMessage({
          message: t('errors.wrong_creds'),
          type: 'danger',
          icon: 'auto',
        });
        setAuth(false);
      });
  }, []);

  const signUp = useCallback(({ email, password }) => {
    setLoading(true);
    axios
      .post(`${API_URL}/auth/signup`, { email, password })
      .then(({ data }) => {
        setTokens(data);
        setLoading(false);
        setAuth(true);
      })
      .catch(e => {
        const error = R.path(['response', 'data', 'error'], e);

        switch (error) {
          case 'duplicate':
            showMessage({
              message: t('screen.auth.already_exists'),
              type: 'danger',
              icon: 'auto',
            });
            break;
          default:
            showMessage({
              message: t('errors.server_error'),
              type: 'danger',
              icon: 'auto',
            });
        }
        setTokens(null);
        setLoading(false);

        setAuth(false);
      });
  }, []);

  const signOut = useCallback(() => {
    setAuth(false);
    setTokens(null);
  }, []);

  const authState = useMemo(
    () => ({
      signIn,
      tokens,
      setTokens,
      signOut,
      isLoading,
      hasAuth,
      signUp,
      setAuth,
    }),
    [signIn, isLoading, hasAuth, tokens, signOut],
  );

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
