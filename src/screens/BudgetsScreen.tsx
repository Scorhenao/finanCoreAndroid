import React, {useState, useCallback, useEffect, useMemo} from 'react';
import {ScrollView, Text, View, TouchableOpacity, Alert} from 'react-native';
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
import {BudgetsStyles} from '../css/BudgetsStyles';
import {useTransactions} from '../hooks/useTransactions';

type BudgetScreenRouteProp = RouteProp<RootStackParamList, 'BudgetsScreen'>;

const BudgetsScreen = () => {
  const {theme} = useTheme();
  const route = useRoute<BudgetScreenRouteProp>();
  const navigation = useNavigation();
  const earningName = route.params.earningName;
  const {loading, error, budgets, getBudgets, deleteBudget} = useBudgets();
  const {getTransactions, transactions} = useTransactions();

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useFocusEffect(
    useCallback(() => {
      getBudgets();
      getTransactions();
    }, [getBudgets, getTransactions]),
  );

  console.log('budgets', budgets);
  console.log('transactions', transactions);

  const filteredBudgets = useMemo(
    () => budgets?.filter(budget => budget.earning.name === earningName) || [],
    [budgets, earningName],
  );

  useEffect(() => {
    if (transactions && filteredBudgets.length > 0) {
      let income = 0;
      let expenses = 0;

      transactions.forEach(transaction => {
        filteredBudgets.forEach(budget => {
          if (transaction.budget.id === budget.id) {
            // Convierte las cantidades a números eliminando el símbolo de la moneda
            const amount = parseFloat(
              transaction.amount.replace(/[^\d.-]/g, ''),
            );

            // Si la transacción es positiva, es un ingreso
            if (amount > 0) {
              income += amount;
            } else {
              // Si la transacción es negativa, es un gasto
              expenses += amount;
            }
          }
        });
      });

      // Actualiza los totales solo después de realizar los cálculos
      setTotalIncome(income);
      setTotalExpenses(expenses);

      console.log('Total Income:', income); // Muestra el total calculado
      console.log('Total Expenses:', expenses); // Muestra el total calculado
    }
  }, [transactions, filteredBudgets]);

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

  return (
    <ScrollView
      style={[
        BudgetsStyles.container,
        {backgroundColor: theme.colors.backgrounds},
      ]}>
      {filteredBudgets.length > 0 ? (
        filteredBudgets.map(budget => (
          <View key={budget.id} style={BudgetsStyles.detailsContainer}>
            <Text style={[BudgetsStyles.title, {color: theme.colors.texts}]}>
              Budget of {budget.name}
            </Text>
            <Text style={[BudgetsStyles.label, {color: theme.colors.texts}]}>
              Description:
            </Text>
            <Text style={[BudgetsStyles.text, {color: theme.colors.texts}]}>
              {budget.description}
            </Text>

            <Text style={[BudgetsStyles.label, {color: theme.colors.texts}]}>
              Budget Amount:
            </Text>
            <Text style={[BudgetsStyles.text, {color: theme.colors.texts}]}>
              {budget.amount} COP
            </Text>

            <Text style={[BudgetsStyles.label, {color: theme.colors.texts}]}>
              Category:
            </Text>
            <View
              style={[
                BudgetsStyles.categoryContainer,
                {borderColor: theme.colors.texts},
              ]}>
              <Text style={[{color: theme.colors.texts}]}>
                {budget.category.name}
              </Text>
            </View>

            <Text style={[BudgetsStyles.label, {color: theme.colors.texts}]}>
              Budget From:
            </Text>
            <Text style={[BudgetsStyles.text, {color: theme.colors.texts}]}>
              {budget.earning.name}
            </Text>
            <Text style={[BudgetsStyles.label, {color: theme.colors.texts}]}>
              Start Date:
            </Text>
            <View style={BudgetsStyles.dateContainer}>
              <Icon
                name="calendar-outline"
                size={20}
                color={theme.colors.buttons}
                style={BudgetsStyles.icon}
              />
              <Text style={[BudgetsStyles.text, {color: theme.colors.texts}]}>
                {budget.startDate}
              </Text>
            </View>

            <Text style={[BudgetsStyles.label, {color: theme.colors.texts}]}>
              End Date:
            </Text>
            <View style={BudgetsStyles.dateContainer}>
              <Icon
                name="calendar-outline"
                size={20}
                color={theme.colors.buttons}
                style={BudgetsStyles.icon}
              />
              <Text style={[BudgetsStyles.text, {color: theme.colors.texts}]}>
                {budget.endDate}
              </Text>
            </View>

            <View style={BudgetsStyles.header}>
              <TouchableOpacity
                style={BudgetsStyles.iconButton}
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
                style={BudgetsStyles.iconButton}
                onPress={() =>
                  navigation.navigate('AddTransactionScreen', {
                    budgetId: budget.id,
                    budgetName: budget.name,
                  })
                }>
                <Icon name="cash" size={24} color={theme.colors.buttons} />
              </TouchableOpacity>

              <TouchableOpacity
                style={BudgetsStyles.iconButton}
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

export default BudgetsScreen;
