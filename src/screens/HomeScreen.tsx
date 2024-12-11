import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import StackedAreaChartComponent from '../components/StackedAreaChartComponent';
import EarningsDropdown from '../components/EarningsDropdown';
import {useTheme} from '../context/ThemeContext';
import withPullToRefresh from '../components/WithPullRefresh';
import {RefreshControl} from 'react-native-gesture-handler';

const HomeScreen = ({onRefresh}) => {
  const {theme} = useTheme();

  const data = [
    {month: 1, apples: 50, bananas: 30},
    {month: 2, apples: 40, bananas: 50},
    {month: 3, apples: 60, bananas: 70},
  ];

  const keys = ['apples', 'bananas'];
  const colors = [theme.colors.hovers, theme.colors.buttons];

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {backgroundColor: theme.colors.backgrounds},
      ]}
      refreshControl={
        <RefreshControl  refreshing={false} onRefresh={onRefresh} />
      }>
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

export default withPullToRefresh(HomeScreen);
