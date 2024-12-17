import React, {useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import EarningsDropdown from '../components/EarningsDropdown';
import {useTheme} from '../context/ThemeContext';
import Wallet from '../components/Wallet';
import Loading from '../components/loading';
import {useEarnings} from '../hooks/useEarnings';
import BarChartComponent from '../components/BarChartComponent';

const HomeScreen = ({navigation}: any) => {
  const {theme} = useTheme();
  const {earnings, fetchEarnings, loading, error} = useEarnings();

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

  const earningsData = Array.isArray(earnings) ? earnings : earnings?.data;

  const formattedData = Array.isArray(earningsData)
    ? earningsData.map(item => {
        const budgeted =
          parseFloat(item.amountBudgeted.replace(/[^0-9.]/g, '')) || 0;
        const available =
          parseFloat(item.generalAmount.replace(/[^0-9.]/g, '')) || 0;
        const amountAvailable = available - budgeted; // Calculate available amount

        return {
          month: item.name,
          budgeted,
          available,
          amountAvailable,
        };
      })
    : [];

  const keys = ['budgeted', 'available'];
  const colors = [theme.colors.hovers, theme.colors.buttons];

  return (
    <ScrollView
      contentContainerStyle={[
        styles.scrollContainer,
        {backgroundColor: theme.colors.backgrounds},
      ]}>
      {Array.isArray(earningsData) && earningsData.length > 0 ? (
        <>
          <Wallet data={formattedData} />
          <BarChartComponent data={formattedData} keys={keys} colors={colors} />
        </>
      ) : (
        <Text>No earnings available</Text>
      )}

      <View style={{marginBottom: 20}}>
        <EarningsDropdown earnings={earningsData} />
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
