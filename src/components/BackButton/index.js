import React from 'react';
import { TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';

import { useTheme } from 'context/themeContext';

const BackButton = props => {
  const { theme } = useTheme();

  return (
    <TouchableHighlight
      activeOpacity={0.9}
      underlayColor="#0000001a"
      onPress={props.onPress || props.backHandler}
      {...props}>
      <Icon
        type="ionicon"
        size={30}
        name="arrow-back"
        color={theme.color.tertiary}
      />
    </TouchableHighlight>
  );
};

export default BackButton;
