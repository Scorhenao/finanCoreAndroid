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
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
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

  useFocusEffect(
    React.useCallback(() => {
      fetchCategories();
    }, [fetchCategories]),
  );

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
      } else {
        notify('danger', 'Error', 'Budget creation failed, try again.');
      }
    } catch (err: any) {
      console.log('Error:', err); // Log the entire error object to inspect it

      let errorMessage = 'Failed to create budget. Please try again.';

      // Check if the error has the specific "duplicate key" message
      if (err && err.message) {
        if (
          err.message.includes('duplicate key value violates unique constraint')
        ) {
          errorMessage =
            'A budget with this name already exists. Please choose a different name.';
        } else if (
          err.message.includes('The date range must be at least one month.')
        ) {
          errorMessage =
            'The date range must be at least one month. Please adjust the start and end dates.';
        } else {
          errorMessage = err.message;
        }
      } else if (err?.response?.data?.message) {
        // In case the error is nested deeper (e.g., within response.data)
        const responseErrorMessage = err.response.data.message;
        if (
          responseErrorMessage.includes(
            'duplicate key value violates unique constraint',
          )
        ) {
          errorMessage =
            'A budget with this name already exists. Please choose a different name.';
        } else {
          errorMessage = responseErrorMessage;
        }
      }

      // Notify the user with the correct error message
      notify('danger', 'Error', errorMessage);
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
