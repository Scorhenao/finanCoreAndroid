import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/screens/AppNavigator';
import {ThemeProvider} from './src/context/ThemeContext';
import {AuthProvider} from './src/context/AuthContext';
import {RefreshProvider} from './src/context/GlobalPullToRefresh';
import NotificationManager from './src/components/NotificationManager';
import {LogLevel, OneSignal} from 'react-native-onesignal';

import {ONESIGNAL_APP_ID} from '@env';

function App(): JSX.Element {
  const handleGlobalRefresh = async () => {
    console.log('Refreshing global data...');
  };
  console.log('key of onesignal', ONESIGNAL_APP_ID);
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  OneSignal.initialize('ONESIGNAL_APP_ID');

  OneSignal.Notifications.requestPermission(true);

  OneSignal.Notifications.addEventListener('click', event => {
    console.log('OneSignal: notification clicked:', event);
  });

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
