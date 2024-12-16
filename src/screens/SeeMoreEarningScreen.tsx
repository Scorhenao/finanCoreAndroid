import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../common/types/Navigation-types';
import {useRoute} from '@react-navigation/native';
import {useTheme} from '../context/ThemeContext';
import {parseDate} from '../common/utils/parseDate';
import Icon from 'react-native-vector-icons/Ionicons';
import {useEarnings} from '../hooks/useEarnings';
import {notify} from '../components/NotificationManager';
import {StackNavigationProp} from '@react-navigation/stack';

type SeeMoreEarningRouteProp = RouteProp<
  RootStackParamList,
  'SeeMoreEarningScreen'
>;

const SeeMoreEarningScreen = () => {
  const route = useRoute<SeeMoreEarningRouteProp>();
  const {earning} = route.params;
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParamList, 'SeeMoreEarningScreen'>
    >();
  const {theme} = useTheme();
  const {deleteEarning, fetchEarnings} = useEarnings();

  const parseCreatedAt = parseDate(earning.createdAt);
  const parseUpdatedAt = parseDate(earning.updatedAt);

  const handleDeleteEarning = async () => {
    try {
      console.log(`the earning id in the see more earning is ${earning.id}`);

      await deleteEarning(earning.id);
      notify('success', 'Earning deleted successfully', '');
      fetchEarnings();
      navigation.replace('HomeScreen');
    } catch (err: any) {
      notify('danger', 'Error deleting earning', err.message);
    }
  };

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: theme.colors.backgrounds}]}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            navigation.navigate('EditEarningScreen', {earning});
          }}>
          <Icon name="create-outline" size={24} color={theme.colors.buttons} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={handleDeleteEarning}>
          <Icon name="trash-outline" size={24} color={theme.colors.buttons} />
        </TouchableOpacity>
      </View>
      <View style={styles.earningDetails}>
        <Text style={[styles.detailTitle, {color: theme.colors.texts}]}>
          Earning Details
        </Text>
        {[
          {label: 'Name', value: earning.name},
          {label: 'Start Date', value: earning.startDate},
          {label: 'End Date', value: earning.endDate},
          {label: 'Amount Budgeted', value: earning.amountBudgeted},
          {label: 'General Amount', value: earning.generalAmount},
          {label: 'Created At', value: parseCreatedAt},
          {label: 'Updated At', value: parseUpdatedAt},
        ].map(({label, value}, index) => (
          <Text
            key={index}
            style={[styles.detailText, {color: theme.colors.texts}]}>
            <Text style={styles.label}>{label}:</Text> {value}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  iconButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  earningDetails: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 15,
  },
  detailText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  label: {
    fontWeight: '600',
  },
});

export default SeeMoreEarningScreen;
