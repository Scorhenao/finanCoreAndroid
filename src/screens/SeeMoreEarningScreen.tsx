import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../common/types/Navigation-types';
import {useRoute} from '@react-navigation/native';
import {useTheme} from '../context/ThemeContext';
import {parseDate} from '../common/utils/parseDate';
import withPullToRefresh from '../components/WithPullRefresh';

type SeeMoreEarningRouteProp = RouteProp<
  RootStackParamList,
  'SeeMoreEarningScreen'
>;

const SeeMoreEarningScreen = () => {
  const route = useRoute<SeeMoreEarningRouteProp>();
  const {earning} = route.params;
  const {theme} = useTheme();

  const parseCreatedAt = parseDate(earning.createdAt);
  const parseUpdatedAt = parseDate(earning.updatedAt);
  return (
    <ScrollView
      style={[styles.container, {backgroundColor: theme.colors.backgrounds}]}>
      <View style={styles.earningDetails}>
        <Text style={[styles.detailTitle, {color: theme.colors.texts}]}>
          Earning Details
        </Text>
        <Text style={[styles.detailText, {color: theme.colors.texts}]}>
          Name: {earning.name}
        </Text>
        <Text style={[styles.detailText, {color: theme.colors.texts}]}>
          Start Date: {earning.startDate}
        </Text>
        <Text style={[styles.detailText, {color: theme.colors.texts}]}>
          End Date: {earning.endDate}
        </Text>
        <Text style={[styles.detailText, {color: theme.colors.texts}]}>
          Amount Budgeted: {earning.amountBudgeted}
        </Text>
        <Text style={[styles.detailText, {color: theme.colors.texts}]}>
          General Amount: {earning.generalAmount}
        </Text>
        <Text style={[styles.detailText, {color: theme.colors.texts}]}>
          Created At: {parseCreatedAt}
        </Text>
        <Text style={[styles.detailText, {color: theme.colors.texts}]}>
          Updated At: {parseUpdatedAt}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 55,
  },
  earningDetails: {
    marginBottom: 20,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default SeeMoreEarningScreen;
