import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useBudgets} from '../hooks/useBudgets';
import Loading from '../components/loading';
import {AddBudgetstyles} from '../css/AddBudgetStyles';
import {useCategories} from '../hooks/useCategories';
import {notify} from '../components/NotificationManager';
const AddBudgetScreen = () => {
  const {theme} = useTheme();
  const route = useRoute();
  const {earningId, amountAvailable, earningName} = route.params;
  const {createBudget, loading, error, successMessage, createdBudget} =
    useBudgets();
  const navigation = useNavigation();

  const {
    categories: categoriesResponse,
    fetchCategories,
    loading: categoriesLoading,
  } = useCategories();

  const [categories, setCategories] = useState([]);
  const [budgetData, setBudgetData] = useState({
    name: '',
    description: '',
    amount: '',
    startDate: '',
    endDate: '',
    category: '',
  });

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (categoriesResponse?.data) {
      setCategories(categoriesResponse.data);
    }
  }, [categoriesResponse]);

  const handleChange = (name, value) => {
    setBudgetData({
      ...budgetData,
      [name]: value,
    });
  };

  const handleDateChange = (event, selectedDate, type) => {
    if (selectedDate) {
      const currentDate = selectedDate.toISOString().split('T')[0];
      setBudgetData({
        ...budgetData,
        [type]: currentDate,
      });
    }
    if (type === 'startDate') {
      setShowStartDatePicker(false);
    } else {
      setShowEndDatePicker(false);
    }
  };

  const handleCreateBudget = async () => {
    if (
      !budgetData.name ||
      !budgetData.amount ||
      !budgetData.startDate ||
      !budgetData.endDate ||
      !budgetData.category
    ) {
      notify('danger', 'Validation Error', 'All fields are required.');
      return;
    }

    if (Number(budgetData.amount) <= 0) {
      notify('danger', 'Validation Error', 'Amount must be greater than zero.');
      return;
    }
    const budget = {
      name: budgetData.name,
      description: budgetData.description,
      amount: Number(budgetData.amount),
      startDate: budgetData.startDate,
      endDate: budgetData.endDate,
      categoryId: budgetData.category,
      earningId: earningId,
    };

    try {
      await createBudget(budget);

      if (createdBudget) {
        notify(
          'success',
          'Budget Created',
          `Budget "${budgetData.name}" was successfully created.`,
        );
        navigation.goBack();
      }
    } catch (err: any) {
      notify('danger', 'Error', 'Failed to create budget. Please try again.');
      if (err && err.message) {
        if (
          err.message.includes('The date range must be at least one month.')
        ) {
          notify(
            'danger',
            'Error',
            'The date range must be at least one month. Please adjust the start and end dates.',
          );
        } else {
          notify(
            'danger',
            'Error',
            'Failed to create budget. Please try again.',
          );
        }
      } else {
        notify('danger', 'Error', 'An unexpected error occurred.');
      }
    }
  };

  return (
    <ScrollView
      style={[
        AddBudgetstyles.scrollView,
        {backgroundColor: theme.colors.backgrounds},
      ]}>
      <View style={AddBudgetstyles.inputGroup}>
        <Text style={[AddBudgetstyles.label, {color: theme.colors.texts}]}>
          Name:
        </Text>
        <View style={AddBudgetstyles.inputWithIcon}>
          <Icon name="create-outline" size={20} color={theme.colors.texts} />
          <TextInput
            style={[
              AddBudgetstyles.input,
              {color: theme.colors.texts, borderColor: theme.colors.inputs},
            ]}
            value={budgetData.name}
            onChangeText={text => handleChange('name', text)}
            placeholder="Enter budget name"
            placeholderTextColor={theme.colors.texts}
          />
        </View>
      </View>

      <View style={AddBudgetstyles.inputGroup}>
        <Text style={[AddBudgetstyles.label, {color: theme.colors.texts}]}>
          Description:
        </Text>
        <View style={AddBudgetstyles.inputWithIcon}>
          <Icon name="document-outline" size={20} color={theme.colors.texts} />
          <TextInput
            style={[
              AddBudgetstyles.input,
              {color: theme.colors.texts, borderColor: theme.colors.inputs},
            ]}
            value={budgetData.description}
            onChangeText={text => handleChange('description', text)}
            placeholder="Enter description"
            placeholderTextColor={theme.colors.texts}
          />
        </View>
      </View>

      <View style={AddBudgetstyles.inputGroup}>
        <Text style={[AddBudgetstyles.label, {color: theme.colors.texts}]}>
          Amount:
        </Text>
        <View style={AddBudgetstyles.inputWithIcon}>
          <Icon name="wallet-outline" size={20} color={theme.colors.texts} />
          <TextInput
            style={[
              AddBudgetstyles.input,
              {color: theme.colors.texts, borderColor: theme.colors.inputs},
            ]}
            value={budgetData.amount}
            onChangeText={text => handleChange('amount', text)}
            placeholder="Enter amount"
            placeholderTextColor={theme.colors.texts}
            keyboardType="numeric"
          />
        </View>
      </View>

      {/* Start Date Picker */}
      <View style={AddBudgetstyles.inputGroupDates}>
        <View style={AddBudgetstyles.inputGroup}>
          <Text style={[AddBudgetstyles.label, {color: theme.colors.texts}]}>
            Start Date:
          </Text>
          <TouchableOpacity
            style={AddBudgetstyles.dateButton}
            onPress={() => setShowStartDatePicker(true)}>
            <Icon
              name="calendar-outline"
              size={24}
              color={theme.colors.texts}
            />
            <Text
              style={[AddBudgetstyles.dateText, {color: theme.colors.texts}]}>
              {budgetData.startDate || 'Select Start Date'}
            </Text>
          </TouchableOpacity>
          {showStartDatePicker && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display="default"
              onChange={(event, date) =>
                handleDateChange(event, date, 'startDate')
              }
            />
          )}
        </View>

        {/* End Date Picker */}
        <View style={AddBudgetstyles.inputGroup}>
          <Text style={[AddBudgetstyles.label, {color: theme.colors.texts}]}>
            End Date:
          </Text>
          <TouchableOpacity
            style={AddBudgetstyles.dateButton}
            onPress={() => setShowEndDatePicker(true)}>
            <Icon
              name="calendar-outline"
              size={24}
              color={theme.colors.texts}
            />
            <Text
              style={[AddBudgetstyles.dateText, {color: theme.colors.texts}]}>
              {budgetData.endDate || 'Select End Date'}
            </Text>
          </TouchableOpacity>
          {showEndDatePicker && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display="default"
              onChange={(event, date) =>
                handleDateChange(event, date, 'endDate')
              }
            />
          )}
        </View>
      </View>

      {/* Modify Category and Icon */}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('CategoriesScreen', {
            categories: categoriesResponse.data,
          })
        }>
        <View style={AddBudgetstyles.modifyCategory}>
          <Text
            style={[AddBudgetstyles.modifyText, {color: theme.colors.texts}]}>
            Modify Category
          </Text>
          <Icon
            name="ellipsis-horizontal"
            size={24}
            color={theme.colors.texts}
          />
        </View>
      </TouchableOpacity>

      {/* Category Select */}
      <View style={AddBudgetstyles.inputGroup}>
        <Text style={[AddBudgetstyles.label, {color: theme.colors.texts}]}>
          Category:
        </Text>
        {categoriesLoading ? (
          <Text style={{color: theme.colors.texts}}>Loading categories...</Text>
        ) : (
          <Picker
            selectedValue={budgetData.category}
            onValueChange={itemValue => handleChange('category', itemValue)}
            style={{
              height: 50,
              width: '100%',
              color: theme.colors.texts,
            }}>
            <Picker.Item label="Select Category" value="" />
            {categories.map(category => (
              <Picker.Item
                key={category.id}
                label={category.name}
                value={category.id}
              />
            ))}
          </Picker>
        )}
      </View>

      {/* Budget Text */}
      <View style={AddBudgetstyles.budgetText}>
        <Text style={[AddBudgetstyles.modifyText, {color: theme.colors.texts}]}>
          Budget from {earningName}
        </Text>
      </View>

      <Text
        style={[
          AddBudgetstyles.label,
          {
            color: theme.colors.texts,
            textAlign: 'center',
            marginBottom: 10,
            fontSize: 12,
            fontWeight: 'bold',
          },
        ]}>
        amountAvailable: {amountAvailable}
      </Text>

      <TouchableOpacity
        style={[
          AddBudgetstyles.saveButton,
          {backgroundColor: theme.colors.buttons},
        ]}
        onPress={() => handleCreateBudget()}>
        {loading ? (
          <Loading />
        ) : (
          <Text style={{color: theme.colors.texts}}>Save Budget</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddBudgetScreen;
