import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/screens/AppNavigator';
import {ThemeProvider} from './src/context/ThemeContext';
import NotificationManager from './src/components/NotificationManager';
import FlashMessage from 'react-native-flash-message';

function App(): JSX.Element {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <NotificationManager />
        <FlashMessage position="center" />
        <AppNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
