import React, {useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import StackedAreaChartComponent from '../components/StackedAreaChartComponent';
import EarningsDropdown from '../components/EarningsDropdown';
import {useTheme} from '../context/ThemeContext';
import {useGraphics} from '../hooks/useGraphics';
import Wallet from '../components/Wallet';
import Loading from '../components/loading';
import {useEarnings} from '../hooks/useEarnings';

const HomeScreen = ({navigation}: any) => {
  const {theme} = useTheme();
  const {graphicsData, loading, error} = useGraphics();
  const {earnings, fetchEarnings} = useEarnings();

  useEffect(() => {
    fetchEarnings();
  }, [fetchEarnings]);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <View style={[{backgroundColor: theme.colors.backgrounds}]}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  const formattedData = graphicsData.map(item => ({
    month: item.name,
    budgeted: parseFloat(item.percentageBudgeted) || 0,
    available: parseFloat(item.percentageAvailable) || 0,
  }));

  const keys = ['budgeted', 'available'];
  const colors = [theme.colors.hovers, theme.colors.buttons];

  return (
    <ScrollView
      contentContainerStyle={[
        styles.scrollContainer,
        {backgroundColor: theme.colors.backgrounds},
      ]}>
      <Wallet data={graphicsData} />
      <StackedAreaChartComponent
        data={formattedData}
        keys={keys}
        colors={colors}
      />

      <View style={{marginBottom: 20}}>
        <EarningsDropdown earnings={earnings} />
      </View>

      <TouchableOpacity
        style={[styles.addButton, {backgroundColor: theme.colors.buttons}]}
        onPress={() => navigation.navigate('AddEarningScreen')}>
        <Icon name="add-circle-outline" size={32} color={theme.colors.texts} />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default HomeScreen;
