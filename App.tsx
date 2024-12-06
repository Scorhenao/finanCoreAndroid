import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ThemeProvider, useTheme} from './src/context/ThemeContext';
import {CircleImage} from './src/components/CircleImage';
import DarkModeToggle from './src/components/ToggleTheme';
import lightModeTheme from './src/theme/LightModeTheme';
import darkModeTheme from './src/theme/DarkModeTheme';
import PieChartWithDynamicSlices from './src/components/PieChart';
import StackedAreaChartComponent from './src/components/StackedAreaChartComponent'; // Importar el componente

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

      {/* Add PieChartWithDynamicSlices here */}
      <PieChartWithDynamicSlices />

      {/* Usar el componente StackedAreaChartComponent */}
      <StackedAreaChartComponent data={data} keys={keys} colors={colors} />
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
