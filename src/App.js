import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { LogBox, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './providers/ThemeProvider';
import Navigation from './navigation';
import './locales';
import AuthProvider from './providers/AuthProvider';
import FlashMessage from 'react-native-flash-message';

const App = () => {
  useEffect(() => {
    LogBox.ignoreLogs(['Setting a timer']);
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        <SafeAreaProvider>
          <StatusBar barStyle="light-content" backgroundColor="#000" />
          <Navigation />
        </SafeAreaProvider>
      </ThemeProvider>
      <FlashMessage position="bottom" style={{ alignItems: 'center' }} titleStyle={{ fontSize: 19, textAlign: 'center' }} />
    </AuthProvider>
  );
};

export default App;
