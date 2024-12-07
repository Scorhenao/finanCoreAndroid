import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import DarkModeToggle from '../components/ToggleTheme';
import {useTheme} from '../context/ThemeContext';
import {Image, View, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AppNavigatorStyles} from '../css/AppNavigatorStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const {theme} = useTheme();

  return (
    <Stack.Navigator initialRouteName="RegisterScreen">
      {/* Login Screen */}
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={({navigation}) => ({
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
            <TouchableOpacity
              onPress={() => navigation.navigate('RegisterScreen')}
              style={{marginLeft: 16}}>
              <Ionicons
                name="return-down-back" // Flecha hacia atrás para LoginScreen
                size={28}
                color={theme.colors.texts}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={AppNavigatorStyles.headerRight}>
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
        })}
      />
      {/* Register Screen */}
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={({navigation}) => ({
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
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')}
              style={{marginRight: 16}}>
              <Ionicons
                name="return-down-forward" // Flecha hacia adelante para RegisterScreen
                size={28}
                color={theme.colors.texts}
              />
            </TouchableOpacity>
          ),
          headerStyle: AppNavigatorStyles.headerStyle,
          headerBackground: () => (
            <LinearGradient
              colors={[theme.colors.backgrounds, theme.colors.texts]}
              style={AppNavigatorStyles.gradientStyle}
            />
          ),
          headerTintColor: theme.colors.texts,
        })}
      />
    </Stack.Navigator>
  );
}
