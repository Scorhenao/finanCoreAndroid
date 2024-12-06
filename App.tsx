import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ThemeProvider, useTheme} from './src/context/ThemeContext';
import {CircleImage} from './src/components/CircleImage';
import DarkModeToggle from './src/components/ToggleTheme';
import lightModeTheme from './src/theme/LightModeTheme';
import darkModeTheme from './src/theme/DarkModeTheme';
import Register from './src/screens/RegisterScreen';

function App(): JSX.Element {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
}

function Main() {
  const {darkMode} = useTheme();
  const currentTheme = darkMode ? darkModeTheme : lightModeTheme;

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: currentTheme.colors.backgrounds},
      ]}>
      <CircleImage />
      <Text style={{color: currentTheme.colors.texts}}>
        {darkMode ? 'Modo Oscuro' : 'Modo Claro'}
      </Text>
      <DarkModeToggle />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default App;
