import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import DarkModeToggle from '../components/ToggleTheme';
import {useTheme} from '../context/ThemeContext';
import {Image, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AppNavigatorStyles} from '../css/AppNavigatorStyles';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const {theme} = useTheme();

  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerTitle: () => (
            <View style={AppNavigatorStyles.logoContainer}>
              <Image
                source={require('../assets/logo.png')}
                style={AppNavigatorStyles.logoImage}
              />
            </View>
          ),
          headerTitleAlign: 'center',
          headerLeft: () => (
            <View style={AppNavigatorStyles.headerLeft}>
              <DarkModeToggle />
            </View>
          ),
          headerStyle: AppNavigatorStyles.headerStyle,
          headerBackground: () => (
            <LinearGradient
              colors={[theme.colors.backgrounds, theme.colors.texts]}
              style={AppNavigatorStyles.gradientStyle}
            />
          ),
          headerTintColor: theme.colors.texts,
        }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          headerTitle: () => (
            <View style={AppNavigatorStyles.logoContainer}>
              <Image
                source={require('../assets/logo.png')}
                style={AppNavigatorStyles.logoImage}
              />
            </View>
          ),
          headerTitleAlign: 'center',
          headerLeft: () => (
            <View style={AppNavigatorStyles.headerLeft}>
              <DarkModeToggle />
            </View>
          ),
          headerStyle: AppNavigatorStyles.headerStyle,
          headerBackground: () => (
            <LinearGradient
              colors={[theme.colors.backgrounds, theme.colors.texts]}
              style={AppNavigatorStyles.gradientStyle}
            />
          ),
          headerTintColor: theme.colors.texts,
        }}
      />
    </Stack.Navigator>
  );
}
