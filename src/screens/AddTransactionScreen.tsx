import React, {useState} from 'react';
import {
  ScrollView,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useTransactions} from '../hooks/useTransactions';
import Loading from '../components/loading';
import {notify} from '../components/NotificationManager';

const AddTransactionScreen = () => {
  const {theme} = useTheme();
  const route = useRoute();
  const {budgetId, budgetName} = route.params;
  const {createTransaction, loading} = useTransactions();
  const navigation = useNavigation();

  const [transactionData, setTransactionData] = useState({
    description: '',
    amount: '',
    date: '',
    category: '',
  });

  const handleChange = (name, value) => {
    setTransactionData({
      ...transactionData,
      [name]: value,
    });
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      const currentDate = selectedDate.toISOString().split('T')[0];
      setTransactionData({
        ...transactionData,
        date: currentDate,
      });
    }
    setShowDatePicker(false);
  };

  const handleCreateTransaction = async () => {
    if (!transactionData.description || !transactionData.amount) {
      notify('danger', 'Validation Error', 'All fields are required.');
      return;
    }

    if (Number(transactionData.amount) <= 0) {
      notify('danger', 'Validation Error', 'Amount must be greater than zero.');
      return;
    }

    const transaction = {
      description: transactionData.description,
      amount: Number(transactionData.amount),
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
        style={[styles.saveButton, {backgroundColor: theme.colors.buttons}]}
        onPress={handleCreateTransaction}>
        {loading ? (
          <Loading />
        ) : (
          <Text style={{color: theme.colors.texts}}>Save Transaction</Text>
        )}
      </TouchableOpacity>
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
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  dateText: {
    marginLeft: 10,
    fontSize: 16,
  },
  saveButton: {
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 5,
  },
};

export default AddTransactionScreen;
