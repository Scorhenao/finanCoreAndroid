import React, {useCallback} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from '@react-navigation/native';
import {useTheme} from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../common/types/Navigation-types';
import {useBudgets} from '../hooks/useBudgets';
import {notify} from '../components/NotificationManager';
import Loading from '../components/loading';

type BudgetScreenRouteProp = RouteProp<RootStackParamList, 'BudgetsScreen'>;

const BudgetsScreen = () => {
  const {theme} = useTheme();
  const route = useRoute<BudgetScreenRouteProp>();
  const navigation = useNavigation();
  const earningName = route.params.earningName;
  const {loading, error, budgets, getBudgets, deleteBudget} = useBudgets();

  useFocusEffect(
    useCallback(() => {
      getBudgets();
    }, [getBudgets]),
  );

  const filteredBudgets =
    budgets?.filter(budget => budget.earning.name === earningName) || [];

  const handleDeleteBudget = (id: string) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this budget?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteBudget(id);
            notify('success', 'Budget deleted successfully', '');
          } catch (err: any) {
            notify('danger', 'Error deleting budget', err.message);
          }
        },
      },
    ]);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  const budgetId = budgets?.find(
    budget => budget.earning.name === earningName,
  )?.id;
  const budgetName = budgets?.find(
    budget => budget.earning.name === earningName,
  )?.name;
  return (
    <ScrollView
      style={[styles.container, {backgroundColor: theme.colors.backgrounds}]}>
      {filteredBudgets.length > 0 ? (
        filteredBudgets.map(budget => (
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
              <Text style={[{color: theme.colors.texts}]}>
                {budget.category.name}
              </Text>
            </View>

            <Text style={[styles.label, {color: theme.colors.texts}]}>
              Budget From:
            </Text>
            <Text style={[styles.text, {color: theme.colors.texts}]}>
              {budget.earning.name}
            </Text>
            <Text style={[styles.label, {color: theme.colors.texts}]}>
              Start Date:
            </Text>
            <View style={styles.dateContainer}>
              <Icon
                name="calendar-outline"
                size={20}
                color={theme.colors.buttons}
                style={styles.icon}
              />
              <Text style={[styles.text, {color: theme.colors.texts}]}>
                {budget.startDate}
              </Text>
            </View>

            <Text style={[styles.label, {color: theme.colors.texts}]}>
              End Date:
            </Text>
            <View style={styles.dateContainer}>
              <Icon
                name="calendar-outline"
                size={20}
                color={theme.colors.buttons}
                style={styles.icon}
              />
              <Text style={[styles.text, {color: theme.colors.texts}]}>
                {budget.endDate}
              </Text>
            </View>

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
                onPress={() =>
                  navigation.navigate('AddTransactionScreen', {
                    budgetId,
                    budgetName,
                  })
                }>
                <Icon name="cash" size={24} color={theme.colors.buttons} />
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
            </View>
          </View>
        ))
      ) : (
        <Text style={{color: theme.colors.texts}}>
          No budgets found for this earning
        </Text>
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
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    elevation: 2, // Sombra para hacer el botón más visible
    marginHorizontal: 5,
    transition: 'background-color 0.2s', // Transición suave para el cambio de color
  },
  iconButtonPressed: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Cambio de color cuando se presiona
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
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    borderColor: '#ddd',
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
  },
  icon: {
    marginRight: 10,
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
    fontSize: 16,
    borderRadius: 8,
    padding: 8,
  },
  transactionButtonContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  transactionButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  transactionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BudgetsScreen;
