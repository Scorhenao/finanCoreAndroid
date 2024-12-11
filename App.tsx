import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/screens/AppNavigator';
import {ThemeProvider} from './src/context/ThemeContext';
import {AuthProvider} from './src/context/AuthContext';
import {RefreshProvider} from './src/context/GlobalPullToRefresh';
import NotificationManager from './src/components/NotificationManager';

function App(): JSX.Element {
  const handleGlobalRefresh = async () => {
    console.log('Refreshing global data...');
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <NavigationContainer>
          <RefreshProvider onGlobalRefresh={handleGlobalRefresh}>
            <NotificationManager />
            <AppNavigator />
          </RefreshProvider>
        </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
