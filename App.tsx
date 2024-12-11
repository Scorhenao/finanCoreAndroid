import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/screens/AppNavigator';
import {ThemeProvider} from './src/context/ThemeContext';
import {AuthProvider} from './src/context/AuthContext';
import NotificationManager from './src/components/NotificationManager';

function App(): JSX.Element {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NavigationContainer>
          <NotificationManager />
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
