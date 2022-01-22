import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import * as R from 'ramda';

import { SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import Avatar from 'components/Avatar';
import Caption from 'components/Caption';
import Section from 'components/Section';
import { useThemedStyles } from 'hooks/common';
import { APP_DRAWLER_ROUTES } from 'navigation/helpers';
import { useAuthContext } from 'providers/AuthProvider';

const getStyles = theme =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
    },
    topSection: {
      position: 'relative',
      paddingLeft: 25,
      justifyContent: 'space-evenly',
      alignItems: 'flex-start',
      flexDirection: 'column',
      backgroundColor: theme.background.tertiary,
      height: '35%',
      width: '100%',
      paddingTop: 20,
    },
    icon: {
      position: 'absolute',
      top: 70,
      right: 25,
    },
    menuSection: {
      backgroundColor: theme.background.primary,
      paddingLeft: 25,
      height: '65%',
    },
    menuItem: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
  });

const MenuItem = ({ routeName, iconProps, title }) => {
  const { Styles, theme } = useThemedStyles(getStyles);
  const navigation = useNavigation();

  const clickHandler = useCallback(() => {
    const jumpToAction = DrawerActions.jumpTo(routeName);

    return navigation.dispatch(jumpToAction);
  }, [routeName]);

  return (
    <TouchableOpacity style={Styles.menuItem} onPress={clickHandler}>
      <Icon size={25} color={theme.icon.primary} {...iconProps} />
      <Caption medium pl={25} size={18}>
        {title}
      </Caption>
    </TouchableOpacity>
  );
};

const Content = () => {
  // TO DO: Add oportunity to edit profile logo
  const { Styles } = useThemedStyles(getStyles);
  const path = null;
  const companyName = 'IP Private bussiness';
  const ownerName = 'Suleiman Aliiev';

  const { i18n } = useTranslation();

  const { signOut } = useAuthContext();

  const menuRouterMap = useMemo(
    () => [
      {
        routeName: APP_DRAWLER_ROUTES.PROFILE,
        iconProps: {
          type: 'ionicon',
          name: 'ios-person-outline',
        },
        title: i18n.t('menu.drawer.profile'),
      },
      {
        routeName: APP_DRAWLER_ROUTES.SETTINGS,
        iconProps: {
          type: 'ionicon',
          name: 'ios-settings-outline',
        },
        title: i18n.t('menu.drawer.settings'),
      },
      {
        routeName: APP_DRAWLER_ROUTES.REPORTS,
        iconProps: {
          type: 'ionicon',
          name: 'bar-chart-outline',
        },
        title: i18n.t('menu.drawer.reports'),
      },
      {
        routeName: APP_DRAWLER_ROUTES.PAYMENT,
        iconProps: {
          type: 'ionicon',
          name: 'ios-card-outline',
        },
        title: i18n.t('menu.drawer.payment'),
      },
    ],
    [i18n.language],
  );

  return (
    <SafeAreaView style={Styles.wrapper}>
      <View style={Styles.topSection}>
        <TouchableOpacity onPress={() => console.log('Change logo')}>
          <Avatar url={path} size={80} />
        </TouchableOpacity>

        <Section top={25}>
          <Section>
            <Caption medium color="tertiary" size={17}>
              {companyName}
            </Caption>
          </Section>
          <Section top={2}>
            <Caption color="tertiary" size={16}>
              {ownerName}
            </Caption>
          </Section>
        </Section>
        <View style={Styles.icon}>
          <Icon
            onPress={signOut}
            name="log-out"
            type="entypo"
            color="#fff"
            size={30}
          />
        </View>
      </View>

      <Section top={25} style={Styles.menuSection}>
        <View>
          {R.map(
            itemProps => (
              <MenuItem {...itemProps} key={itemProps.routeName} />
            ),
            menuRouterMap,
          )}
        </View>
      </Section>
    </SafeAreaView>
  );
};

export default Content;
