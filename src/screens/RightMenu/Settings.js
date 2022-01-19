import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, Switch } from 'react-native';
import * as R from 'ramda';
import { Picker } from '@react-native-picker/picker';
import { ScreenWrapper } from 'styles/global';
import Caption from 'components/Caption';
import { useThemedStyles } from 'hooks/common';
import { DARK_THEME } from 'constants/theme';

const getStyles = theme =>
  StyleSheet.create({
    wrapper: {
      paddingHorizontal: 20,
    },
    section: {
      width: '100%',
      alignItems: 'center',
      height: 50,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    picker: {
      height: 50,
      width: 170,
      color: theme.color.primary,
    },
    pickerItem: {
      fontSize: 20,
      color: theme.thesame.black,
    },
  });

const Settings = () => {
  const langlist = useMemo(
    // TO DO: Add fetching all possible languages from backend
    () => [
      {
        name: 'English',
        locale: 'en_US',
      },
      {
        name: 'Русский',
        locale: 'ru',
      },
    ],
    [],
  );

  const { i18n, t } = useTranslation();

  const { Styles, themeName, theme, toggleTheme } = useThemedStyles(getStyles);
  const changeLanguage = language => {
    i18n.changeLanguage(language);
  };

  const isDarkMode = themeName === DARK_THEME;

  const trackColors = {
    true: theme.thesame.white,
    false: theme.color.secondary,
  };

  return (
    <ScreenWrapper>
      <View style={Styles.wrapper}>
        <View style={Styles.section}>
          <Caption size={16}>{t('screen.settings.language_label')}</Caption>
          <Picker
            dropdownIconColor={theme.icon.arrowDown}
            mode="dialog"
            selectedValue={i18n.language}
            style={Styles.picker}
            onValueChange={changeLanguage}>
            {R.map(
              l => (
                <Picker.Item
                  key={l.name}
                  style={Styles.pickerItem}
                  label={l.name}
                  value={l.locale}
                />
              ),
              langlist,
            )}
          </Picker>
        </View>
        <View style={Styles.section}>
          <Caption size={16}>{t('screen.settings.dark_mode')}</Caption>
          <Switch
            trackColor={trackColors}
            thumbColor={theme.icon.toggleIcon}
            ios_backgroundColor={theme.icon.toggleIcon}
            onValueChange={toggleTheme}
            value={isDarkMode}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Settings;
