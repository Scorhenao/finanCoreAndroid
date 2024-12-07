import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import StackedAreaChartComponent from '../components/StackedAreaChartComponent'; // Asegúrate de tener este componente importado correctamente
import EarningsDropdown from '../components/EarningsDropdown'; // Asegúrate de tener este componente importado correctamente

const HomeScreen = () => {
  const data = [
    {month: 1, apples: 50, bananas: 30},
    {month: 2, apples: 40, bananas: 50},
    {month: 3, apples: 60, bananas: 70},
  ];

  const keys = ['apples', 'bananas'];

  const colors = ['#ff6347', '#ffcc00'];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StackedAreaChartComponent data={data} keys={keys} colors={colors} />

      <EarningsDropdown />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default HomeScreen;
