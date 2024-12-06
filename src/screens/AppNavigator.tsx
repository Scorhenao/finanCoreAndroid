import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RegisterScreen from './RegisterScreen';
import DarkModeToggle from '../components/ToggleTheme';
import {useTheme} from '../context/ThemeContext';
import {Image, View} from 'react-native';

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
                // Aplica la sombra al contenedor del logo
                shadowColor: theme.colors.texts, // Color de la sombra
                shadowOffset: {width: 0, height: 5}, // Desplazamiento de la sombra hacia abajo
                shadowOpacity: 0.3, // Opacidad de la sombra
                shadowRadius: 6, // Difuminado de la sombra
                elevation: 6, // Elevación para Android
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
          headerRight: () => <DarkModeToggle />,
          headerStyle: {
            backgroundColor: theme.colors.backgrounds, // Fondo del header
            shadowColor: theme.colors.texts, // Sombra del fondo del header
            shadowOffset: {width: 0, height: 5}, // Desplazamiento de la sombra
            shadowOpacity: 0.2,
            shadowRadius: 5,
            elevation: 5,
          },
          headerTintColor: theme.colors.texts, // Color del texto en el header
        }}
      />
    </Stack.Navigator>
  );
}
