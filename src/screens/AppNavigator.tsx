/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
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
import ValidateCodeScreen from './ValidateCodeScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import ResetPasswordScreen from './ResetPasswordScreen';
import EditEarningScreen from './EditEarningScreen';
import AddEarningScreen from './AddEarningScreen';
import AddBudgetScreen from './AddBudgetScreen';
import CategoriesScreen from './CategoriesScreen';
import BudgetsScreen from './BudgetsScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const {theme} = useTheme();
  const {token, logout} = useAuthContext();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const storedToken = await AsyncStorage.getItem('accessToken');
      console.log('storedToken in app navigator', storedToken);

      if (storedToken) {
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  if (loading) {
    return null;
  }
  return (
    <Stack.Navigator initialRouteName={token ? 'HomeScreen' : 'RegisterScreen'}>
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
              colors={[theme.colors.texts, theme.colors.backgrounds]}
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
              colors={[theme.colors.texts, theme.colors.backgrounds]}
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
              colors={[theme.colors.texts, theme.colors.backgrounds]}
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
              <Ionicons
                name="return-down-back"
                size={28}
                color={theme.colors.texts}
              />
            </TouchableOpacity>
          ),
          headerStyle: AppNavigatorStyles.headerStyle,
          headerBackground: () => (
            <LinearGradient
              colors={[theme.colors.texts, theme.colors.backgrounds]}
              style={AppNavigatorStyles.gradientStyle}
            />
          ),
          headerTintColor: theme.colors.texts,
        }}
      />
      <Stack.Screen
        name="ValidateCodeScreen"
        component={ValidateCodeScreen}
        options={{
          headerTitle: 'Validate Code',
          headerStyle: AppNavigatorStyles.headerStyle,
          headerBackground: () => (
            <LinearGradient
              colors={[theme.colors.texts, theme.colors.backgrounds]}
              style={AppNavigatorStyles.gradientStyle}
            />
          ),
          headerTintColor: theme.colors.texts,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{marginLeft: 16}}>
              <Ionicons
                name="return-down-back"
                size={28}
                color={theme.colors.texts}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{
          headerTitle: 'Forgot Password',
          headerStyle: AppNavigatorStyles.headerStyle,
          headerBackground: () => (
            <LinearGradient
              colors={[theme.colors.texts, theme.colors.backgrounds]}
              style={AppNavigatorStyles.gradientStyle}
            />
          ),
          headerTintColor: theme.colors.texts,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{marginLeft: 16}}>
              <Ionicons
                name="return-down-back"
                size={28}
                color={theme.colors.texts}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
        options={{
          headerTitle: 'Reset Password',
          headerStyle: AppNavigatorStyles.headerStyle,
          headerBackground: () => (
            <LinearGradient
              colors={[theme.colors.texts, theme.colors.backgrounds]}
              style={AppNavigatorStyles.gradientStyle}
            />
          ),
          headerTintColor: theme.colors.texts,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{marginLeft: 16}}>
              <Ionicons
                name="return-down-back"
                size={28}
                color={theme.colors.texts}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="AddEarningScreen"
        component={AddEarningScreen}
        options={{
          headerTitle: 'Add Earning',
          headerStyle: AppNavigatorStyles.headerStyle,
          headerBackground: () => (
            <LinearGradient
              colors={[theme.colors.texts, theme.colors.backgrounds]}
              style={AppNavigatorStyles.gradientStyle}
            />
          ),
          headerTintColor: theme.colors.texts,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{marginLeft: 16}}>
              <Ionicons
                name="return-down-back"
                size={28}
                color={theme.colors.texts}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="EditEarningScreen"
        component={EditEarningScreen}
        options={{
          headerTitle: 'Edit Earning',
          headerStyle: AppNavigatorStyles.headerStyle,
          headerBackground: () => (
            <LinearGradient
              colors={[theme.colors.texts, theme.colors.backgrounds]}
              style={AppNavigatorStyles.gradientStyle}
            />
          ),
          headerTintColor: theme.colors.texts,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{marginLeft: 16}}>
              <Ionicons
                name="return-down-back"
                size={28}
                color={theme.colors.texts}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="AddBudgetScreen"
        component={AddBudgetScreen}
        options={{
          headerTitle: 'Add Budget',
          headerStyle: AppNavigatorStyles.headerStyle,
          headerBackground: () => (
            <LinearGradient
              colors={[theme.colors.texts, theme.colors.backgrounds]}
              style={AppNavigatorStyles.gradientStyle}
            />
          ),
          headerTintColor: theme.colors.texts,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{marginLeft: 16}}>
              <Ionicons
                name="return-down-back"
                size={28}
                color={theme.colors.texts}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="CategoriesScreen"
        component={CategoriesScreen}
        options={{
          headerTitle: 'Categories',
          headerStyle: AppNavigatorStyles.headerStyle,
          headerBackground: () => (
            <LinearGradient
              colors={[theme.colors.texts, theme.colors.backgrounds]}
              style={AppNavigatorStyles.gradientStyle}
            />
          ),
          headerTintColor: theme.colors.texts,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{marginLeft: 16}}>
              <Ionicons
                name="return-down-back"
                size={28}
                color={theme.colors.texts}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="BudgetsScreen"
        component={BudgetsScreen}
        options={{
          headerTitle: 'Budgets',
          headerStyle: AppNavigatorStyles.headerStyle,
          headerBackground: () => (
            <LinearGradient
              colors={[theme.colors.texts, theme.colors.backgrounds]}
              style={AppNavigatorStyles.gradientStyle}
            />
          ),
          headerTintColor: theme.colors.texts,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{marginLeft: 16}}>
              <Ionicons
                name="return-down-back"
                size={28}
                color={theme.colors.texts}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
