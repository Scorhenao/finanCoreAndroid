import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {useTransactions} from '../hooks/useTransactions';
import Loading from '../components/loading';
import {notify} from '../components/NotificationManager';
import {RootStackParamList} from '../common/types/Navigation-types';

const AddTransactionScreen = () => {
  const {theme} = useTheme();
  const route =
    useRoute<RouteProp<RootStackParamList, 'AddTransactionScreen'>>();
  const {budgetId, budgetName} = route.params;

  const {createTransaction, loading, getTransactionsByBudgetId, transactions} =
    useTransactions();
  const navigation = useNavigation();

  const [transactionData, setTransactionData] = useState({
    description: '',
    amount: '',
    date: '',
    category: '',
  });

  useEffect(() => {
    getTransactionsByBudgetId(budgetId);
  }, [budgetId, getTransactionsByBudgetId]);

  const handleChange = (name: string, value: string) => {
    setTransactionData({
      ...transactionData,
      [name]: value,
    });
  };

  const handleCreateTransaction = async () => {
    if (!transactionData.description || !transactionData.amount) {
      notify('danger', 'Validation Error', 'All fields are required.');
      return;
    }

    const transaction = {
      description: transactionData.description,
      amount: parseFloat(transactionData.amount),
      date: transactionData.date,
      budgetId: budgetId,
      categoryId: transactionData.category,
    };

    try {
      await createTransaction(transaction);
      notify(
        'success',
        'Transaction Created',
        `Transaction "${transactionData.description}" was successfully created.`,
      );
      navigation.goBack();
    } catch (err) {
      notify(
        'danger',
        'Error',
        'Failed to create transaction. Please try again.',
      );
    }
  };

  return (
    <ScrollView
      style={[styles.scrollView, {backgroundColor: theme.colors.backgrounds}]}>
      <Text style={[styles.headerText, {color: theme.colors.texts}]}>
        Add Transaction to {budgetName}
      </Text>

      <View style={styles.inputGroup}>
        <Text style={[styles.label, {color: theme.colors.texts}]}>Amount:</Text>
        <View style={styles.inputWithIcon}>
          <Icon name="wallet-outline" size={20} color={theme.colors.texts} />
          <TextInput
            style={[
              styles.input,
              {color: theme.colors.texts, borderColor: theme.colors.inputs},
            ]}
            value={transactionData.amount}
            onChangeText={text => handleChange('amount', text)}
            placeholder="Enter amount"
            placeholderTextColor={theme.colors.texts}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={[styles.label, {color: theme.colors.texts}]}>
          Description:
        </Text>
        <View style={styles.inputWithIcon}>
          <Icon name="create-outline" size={20} color={theme.colors.texts} />
          <TextInput
            style={[
              styles.input,
              {color: theme.colors.texts, borderColor: theme.colors.inputs},
            ]}
            value={transactionData.description}
            onChangeText={text => handleChange('description', text)}
            placeholder="Enter description"
            placeholderTextColor={theme.colors.texts}
          />
        </View>
      </View>

      <TouchableOpacity
        style={[styles.saveButton, {backgroundColor: theme.colors.hovers}]}
        onPress={handleCreateTransaction}>
        {loading ? (
          <Loading />
        ) : (
          <Text style={{color: theme.colors.texts}}>Save Transaction</Text>
        )}
      </TouchableOpacity>
      <View style={styles.transactionsList}>
        {transactions && transactions.length > 0 ? (
          transactions
            .filter(transaction => transaction.budget.id === budgetId) // Filtra las transacciones por el presupuesto actual
            .map(transaction => {
              const amountString = transaction.amount.replace(/[^\d.-]/g, ''); // Limpia el monto
              const amount = parseFloat(amountString);

              // Determina el color dependiendo del signo del monto
              const amountColor = amount < 0 ? 'red' : 'green'; // Rojo para negativos, verde para positivos

              return (
                <View key={transaction.id} style={styles.transactionItem}>
                  <Text style={{color: amountColor}}>
                    {transaction.description}: {transaction.amount} COP
                  </Text>
                </View>
              );
            })
        ) : (
          <Text style={{color: 'red'}}>
            No transactions found for this budget.
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = {
  scrollView: {
    padding: 15,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    marginTop: 5,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  saveButton: {
    display: 'flex',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 5,
  },
  transactionsList: {
    marginTop: 30,
  },
  transactionItem: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
};

export default AddTransactionScreen;
