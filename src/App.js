import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { LogBox, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './providers/ThemeProvider';
import Navigation from './navigation';
import './locales';
import { withAuthenticator } from 'aws-amplify-react-native';

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true,
  },
});

const App = () => {
  useEffect(() => {
    LogBox.ignoreLogs(['Setting a timer']);
  }, []);

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <Navigation />
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default withAuthenticator(App);
