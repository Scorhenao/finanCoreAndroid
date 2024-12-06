import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RegisterScreen from './RegisterScreen';
import DarkModeToggle from '../components/ToggleTheme';
import {useTheme} from '../context/ThemeContext';
import {Image, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const {theme} = useTheme();

  return (
    <Stack.Navigator initialRouteName="RegisterScreen">
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          headerTitle: () => (
            <View
              style={{
                shadowColor: theme.colors.texts,
                shadowOffset: {width: 0, height: 10},
                shadowOpacity: 0.3,
                shadowRadius: 6,
                elevation: 6,
              }}>
              <Image
                source={require('../assets/logo.png')}
                style={{
                  width: 70,
                  height: 100,
                }}
              />
            </View>
          ),
          headerTitleAlign: 'center',
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <DarkModeToggle />
            </View>
          ),
          headerStyle: {
            backgroundColor: 'transparent',
            height: 100, // Puedes ajustar la altura según lo que necesites
          },
          headerBackground: () => (
            <LinearGradient
              colors={[theme.colors.backgrounds, theme.colors.texts]}
              style={{
                // Asegúrate de que el gradiente ocupe todo el espacio disponible
                flex: 1,
                height: '100%',
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 100,
                transform: [
                  {rotate: '-10deg'}, // Puedes ajustar el ángulo de rotación si es necesario
                  {scaleX: 1.8}, // Ajusta el tamaño horizontalmente
                  {scaleY: 1.6}, // Ajusta el tamaño verticalmente
                ],
              }}
            />
          ),
          headerTintColor: theme.colors.texts,
        }}
      />
    </Stack.Navigator>
  );
}
