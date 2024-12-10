/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useAuthContext} from '../context/AuthContext';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import {Image, View, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AppNavigatorStyles} from '../css/AppNavigatorStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DarkModeToggle from '../components/ToggleTheme';
import {useTheme} from '../context/ThemeContext';
import {useNavigation} from '@react-navigation/native';
import SeeMoreEarningScreen from './SeeMoreEarningScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const {theme} = useTheme();
  const {token, logout} = useAuthContext();
  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName={token ? 'HomeScreen' : 'LoginScreen'}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
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
          headerStyle: AppNavigatorStyles.headerStyle,
          headerBackground: () => (
            <LinearGradient
              colors={[theme.colors.backgrounds, theme.colors.texts]}
              style={AppNavigatorStyles.gradientStyle}
            />
          ),
          headerTintColor: theme.colors.texts,
          headerLeft: () => (
            <View style={AppNavigatorStyles.headerLeft}>
              <DarkModeToggle />
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => logout(navigation)}
              style={{marginRight: 16}}>
              <Ionicons
                name="log-out-outline"
                size={28}
                color={theme.colors.texts}
              />
            </TouchableOpacity>
          ),
        }}
      />
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
                name="return-down-back"
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
                name="return-down-forward"
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
      <Stack.Screen
        name="SeeMoreEarningScreen"
        component={SeeMoreEarningScreen}
        options={{
          headerTitle: 'Earning Details',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('HomeScreen')}
              style={{marginLeft: 16}}>
              {/* Usa un ícono diferente */}
              <Ionicons
                name="chevron-back-outline"
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
        }}
      />
    </Stack.Navigator>
  );
}
