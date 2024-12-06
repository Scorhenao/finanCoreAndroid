import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ThemeProvider, useTheme} from './src/context/ThemeContext';
import {CircleImage} from './src/components/CircleImage';
import DarkModeToggle from './src/components/ToggleTheme';
import lightModeTheme from './src/theme/LightModeTheme';
import darkModeTheme from './src/theme/DarkModeTheme';
import {StackedAreaChart, Grid} from 'react-native-svg-charts';
import * as shape from 'd3-shape';

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

  // Datos para el StackedAreaChart
  const data = [
    {month: 1, apples: 50, bananas: 10},
    {month: 2, apples: 40, bananas: 95},
    {month: 3, apples: 35, bananas: -24},
    {month: 4, apples: 80, bananas: 85},
    {month: 5, apples: 95, bananas: 91},
  ];

  const keys = ['apples', 'bananas'] as const;
  const colors = ['rgba(134, 65, 244, 0.8)', 'rgba(66, 194, 244, 0.8)'];

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

      <StackedAreaChart
        style={{height: 200, width: '90%'}}
        data={data}
        keys={keys}
        colors={colors}
        contentInset={{top: 30, bottom: 30}}
        curve={shape.curveNatural}>
        <Grid />
      </StackedAreaChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
