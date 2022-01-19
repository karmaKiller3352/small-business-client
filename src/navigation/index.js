import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import RootStackNavigator from './RootStackNavigator';

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
}
