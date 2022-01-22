import React, { useCallback, useEffect } from 'react';
import { useTheme } from 'context/themeContext';
import { TouchableHighlight, Pressable, View } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import BackButton from 'components/BackButton';
import Caption from 'components/Caption';
import * as R from 'ramda';
import { trimLongSting } from 'utils/global';

export const ROOT_ROUTES = {
  APPLICATION: 'Application',
  AUTH: 'Auth',
};

export const APP_DRAWLER_ROUTES = {
  BOTTOM_MENU: 'BottomMenu',
  PROFILE: 'Profile',
  SETTINGS: 'Settings',
  PAYMENT: 'Payment',
  REPORTS: 'Reports',
};

export const BOTTOM_TAB_ROUTES = {
  HOME: 'Home',
  PRICELIST: 'Pricelist',
  CLIENTS: 'Clients',
  MESSAGES: 'Messages',
  ORDERS: 'Orders',
};

export const PRICE_STACK_ROUTES = {
  PRICELISTS: 'Pricelists',
  PRODUCT_LIST: 'ProductList',
  PRODUCT: 'Product',
};

export const AUTH_STACK_ROUTES = {
  SIGN_IN: 'Signin',
  SIGN_UP: 'Signup',
  PASSWORD_RESTORE: 'Restore password',
};

const tabIconMap = {
  [BOTTOM_TAB_ROUTES.HOME]: {
    type: 'ionicon',
    name: 'ios-home-outline',
  },
  [BOTTOM_TAB_ROUTES.PRICELIST]: {
    type: 'octicon',
    name: 'list-unordered',
  },
  [BOTTOM_TAB_ROUTES.CLIENTS]: {
    type: 'simple-line-icon',
    name: 'people',
  },
  [BOTTOM_TAB_ROUTES.MESSAGES]: {
    type: 'material-community',
    name: 'email-multiple-outline',
  },
  [BOTTOM_TAB_ROUTES.ORDERS]: {
    type: 'material-community',
    name: 'cart-outline',
  },
};

export const HeaderWrapper = ({ onPress, children }) => {
  if (onPress) {
    return (
      <Pressable onPress={onPress}>
        <Caption capitalized white title size={20}>
          {trimLongSting(children)}
        </Caption>
      </Pressable>
    );
  }

  return (
    <Caption capitalized white title size={20}>
      {trimLongSting(children)}
    </Caption>
  );
};

// tab navigation params
export const useTabNavigationOptions = () => {
  const { theme } = useTheme();

  return useCallback(
    ({ route: { name }, navigation }) => ({
      tabBarIcon: ({ color }) => (
        <Icon
          color={color}
          size={35}
          type={tabIconMap[name].type}
          name={tabIconMap[name].name}
        />
      ),
      headerTintColor: theme.thesame.white,
      headerTitleAlign: 'center',
      headerLeftContainerStyle: {
        paddingLeft: 10,
      },
      headerTitle: ({ children }) => <HeaderWrapper>{children}</HeaderWrapper>,
      headerLeft: () => {
        return (
          <TouchableHighlight
            activeOpacity={0.9}
            underlayColor="#0000001a"
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Icon
              color={theme.thesame.white}
              size={35}
              type="ionicon"
              name="menu"
            />
          </TouchableHighlight>
        );
      },
      headerStyle: {
        backgroundColor: theme.background.secondary,
      },
      tabBarStyle: {
        backgroundColor: theme.background.secondary,
        paddingBottom: 10,
        paddingTop: 10,
        height: 80,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontFamily: 'Oswald-Medium',
      },

      tabBarInactiveTintColor: theme.color.secondary,
      tabBarActiveTintColor: theme.thesame.white,
    }),
    [theme],
  );
};

// tab navigation params
export const useStackNavigationOptions = () => {
  const { theme } = useTheme();

  return useCallback(
    ({ navigation }) => ({
      headerTintColor: theme.thesame.white,
      headerTitleAlign: 'center',
      headerLeftContainerStyle: {
        paddingLeft: 10,
      },
      headerTitle: ({ children }) => <HeaderWrapper>{children}</HeaderWrapper>,
      headerLeft: props => {
        if (props.canGoBack) {
          return <BackButton {...props} />;
        }

        return (
          <TouchableHighlight
            activeOpacity={0.9}
            underlayColor="#0000001a"
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Icon
              color={theme.thesame.white}
              size={35}
              type="ionicon"
              name="menu"
            />
          </TouchableHighlight>
        );
      },
      headerRightContainerStyle: {
        paddingRight: 15,
      },
      headerStyle: {
        backgroundColor: theme.background.secondary,
      },
      cardStyleInterpolator: ({ current, layouts }) => {
        return {
          cardStyle: {
            transform: [
              {
                translateX: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [layouts.screen.width, 0],
                }),
              },
            ],
          },
        };
      },
    }),
    [theme],
  );
};

// Drawler navigation screen options
export const useDrawlerNavigationOptions = () => {
  const { theme } = useTheme();

  return useCallback(
    ({ navigation }) => ({
      headerStyle: {
        backgroundColor: theme.background.secondary,
      },
      headerTintColor: theme.color.tertiary,
      drawerStyle: { width: '80%' },
      headerLeftContainerStyle: {
        paddingLeft: 10,
      },
      headerTitle: ({ children }) => <HeaderWrapper>{children}</HeaderWrapper>,
      headerLeft: props => {
        const backHandler = () =>
          navigation.dispatch(
            DrawerActions.jumpTo(APP_DRAWLER_ROUTES.BOTTOM_MENU),
          );

        return <BackButton {...props} backHandler={backHandler} />;
      },
      headerShown: true,
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }),
    [theme],
  );
};

export const useDynamicHeader = ({
  navigation,
  prefix,
  pressHandler,
  title,
}) => {
  useEffect(() => {
    navigation.setOptions({
      title: prefix ? `${prefix} - ${title}` : title,
      headerTitle: ({ children }) => (
        <HeaderWrapper onPress={pressHandler}>{children}</HeaderWrapper>
      ),
    });
  }, [title]);
};

export const useRightButtons = ({ buttons }) => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View style={{ flexDirection: 'row' }}>
            {R.map(
              ({ show = true, ...buttonProps }) =>
                show && (
                  <TouchableHighlight
                    style={{ marginLeft: 10 }}
                    key={buttonProps.iconProps.name}
                    onPress={buttonProps.onPress}
                    activeOpacity={0.9}
                    underlayColor="#0000001a">
                    <Icon
                      size={buttonProps.size || 25}
                      {...buttonProps.iconProps}
                      color={theme.thesame.white}
                    />
                  </TouchableHighlight>
                ),
              buttons,
            )}
          </View>
        );
      },
    });
  }, [buttons.length, buttons]);
};
