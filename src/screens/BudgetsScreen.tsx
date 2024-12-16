import React, {useEffect} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useTheme} from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../common/types/Navigation-types';
import {useBudgets} from '../hooks/useBudgets';
import {notify} from '../components/NotificationManager';

type BudgetScreenRouteProp = RouteProp<RootStackParamList, 'BudgetsScreen'>;

const BudgetsScreen = () => {
  const {theme} = useTheme();
  const route = useRoute<BudgetScreenRouteProp>();
  const {earningId, earningName} = route.params;
  const navigation = useNavigation();
  const {loading, error, budgets, getBudgets} = useBudgets(); // Added getBudgets

  // Fetch budgets when the component mounts
  useEffect(() => {
    getBudgets(); // Fetch all budgets
  }, [getBudgets]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: theme.colors.backgrounds}]}>
      {budgets && budgets.length > 0 ? (
        budgets.map(budget => (
          <View key={budget.id} style={styles.detailsContainer}>
            <Text style={[styles.title, {color: theme.colors.texts}]}>
              Budget of {budget.name}
            </Text>
            <Text style={[styles.label, {color: theme.colors.texts}]}>
              Description:
            </Text>
            <Text style={[styles.text, {color: theme.colors.texts}]}>
              {budget.description}
            </Text>

            <Text style={[styles.label, {color: theme.colors.texts}]}>
              Budget Amount:
            </Text>
            <Text style={[styles.text, {color: theme.colors.texts}]}>
              {budget.amount} COP
            </Text>

            <Text style={[styles.label, {color: theme.colors.texts}]}>
              Category:
            </Text>
            <View
              style={[
                styles.categoryContainer,
                {borderColor: theme.colors.texts},
              ]}>
              <Text style={[styles.text, {color: theme.colors.texts}]}>
                {budget.category.name}
              </Text>
            </View>

            <Text style={[styles.label, {color: theme.colors.texts}]}>
              Budget From:
            </Text>
            <Text style={[styles.text, {color: theme.colors.texts}]}>
              {budget.earning.name}
            </Text>

            <View style={styles.header}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() =>
                  navigation.navigate('EditBudgetScreen', {budget})
                }>
                <Icon
                  name="create-outline"
                  size={24}
                  color={theme.colors.buttons}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => handleDeleteBudget(budget.id)}>
                <Icon
                  name="trash-outline"
                  size={24}
                  color={theme.colors.buttons}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconButton}>
                <Icon
                  name="calendar-outline"
                  size={24}
                  color={theme.colors.buttons}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Text style={{color: theme.colors.texts}}>No budgets found</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  iconButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  detailsContainer: {
    marginTop: 20,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 15,
  },
  categoryContainer: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
});

export default BudgetsScreen;
