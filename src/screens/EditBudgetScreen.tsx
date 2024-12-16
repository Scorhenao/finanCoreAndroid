import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../common/types/Navigation-types';
import {useRoute} from '@react-navigation/native';
import {useTheme} from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {useBudgets} from '../hooks/useBudgets';
import Loading from '../components/loading';
import {notify} from '../components/NotificationManager';
import DateTimePicker from '@react-native-community/datetimepicker';

type EditBudgetRouteProp = RouteProp<RootStackParamList, 'EditBudgetScreen'>;

const EditBudgetScreen = () => {
  const route = useRoute<EditBudgetRouteProp>();
  const {budget} = route.params;

  const navigation = useNavigation();

  const {theme} = useTheme();
  const {updateBudget, loading, successMessage} = useBudgets();

  const [formData, setFormData] = useState({
    id: budget.id,
    name: budget.name,
    description: budget.description,
    amount: budget.amount ? String(budget.amount) : '0',
    startDate: budget.startDate,
    endDate: budget.endDate,
    categoryId: budget.category.id,
    earningId: budget.earning.id,
  });

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData({...formData, [field]: value});
  };

  const handleDateChange = (
    field: 'startDate' | 'endDate',
    event: any,
    selectedDate?: Date,
  ) => {
    if (field === 'startDate') {
      setShowStartDatePicker(false);
    } else {
      setShowEndDatePicker(false);
    }

    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setFormData({...formData, [field]: formattedDate});
    }
  };

  const showDatepicker = (field: 'startDate' | 'endDate') => {
    if (field === 'startDate') {
      setShowStartDatePicker(true);
    } else {
      setShowEndDatePicker(true);
    }
  };

  const handleSave = async () => {
    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      !formData.amount.trim() ||
      !formData.startDate.trim() ||
      !formData.endDate.trim()
    ) {
      notify('warning', 'Please fill in all the fields', '');
      return;
    }

    const cleanedAmount =
      parseFloat(formData.amount.replace(/[^0-9.-]+/g, '')) || 0;

    console.log(cleanedAmount);

    const updatedData = {
      id: formData.id,
      name: formData.name,
      description: formData.description,
      amount: cleanedAmount,
      startDate: formData.startDate,
      endDate: formData.endDate,
      categoryId: formData.categoryId,
      earningId: formData.earningId,
    };

    try {
      await updateBudget(updatedData);
      if (successMessage) {
        notify('success', successMessage, '');
        navigation.goBack();
      }
    } catch (err: any) {
      console.error('Error updating budget:', err);
      notify('danger', 'Error updating budget', err.message);
    }
  };

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: theme.colors.backgrounds}]}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={handleSave}
          disabled={loading}>
          <Icon
            name="checkmark-outline"
            size={24}
            color={theme.colors.buttons}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        <Text style={[styles.title, {color: theme.colors.texts}]}>
          Edit Budget
        </Text>
        {[
          {label: 'Name', value: formData.name, field: 'name'},
          {
            label: 'Description',
            value: formData.description,
            field: 'description',
          },
          {label: 'Amount', value: formData.amount, field: 'amount'},
          {
            label: 'Start Date',
            value: formData.startDate,
            field: 'startDate',
            type: 'date',
          },
          {
            label: 'End Date',
            value: formData.endDate,
            field: 'endDate',
            type: 'date',
          },
          {
            label: 'Category ID',
            value: formData.categoryId,
            field: 'categoryId',
          },
          {label: 'Earning ID', value: formData.earningId, field: 'earningId'},
        ].map(({label, value, field, type}, index) => (
          <View key={index} style={styles.inputGroup}>
            <Text style={[styles.label, {color: theme.colors.texts}]}>
              {label}:
            </Text>
            {type === 'date' ? (
              <>
                <TouchableOpacity
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.colors.backgrounds,
                      borderColor: theme.colors.texts,
                    },
                  ]}
                  onPress={() =>
                    showDatepicker(field as 'startDate' | 'endDate')
                  }>
                  <Text style={{color: theme.colors.texts}}>{value}</Text>
                </TouchableOpacity>

                {((field === 'startDate' && showStartDatePicker) ||
                  (field === 'endDate' && showEndDatePicker)) && (
                  <DateTimePicker
                    testID={`${field}-datepicker`}
                    value={new Date(value || Date.now())}
                    mode="date"
                    is24Hour={true}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(event, selectedDate) =>
                      handleDateChange(
                        field as 'startDate' | 'endDate',
                        event,
                        selectedDate,
                      )
                    }
                  />
                )}
              </>
            ) : (
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.colors.backgrounds,
                    color: theme.colors.texts,
                    borderColor: theme.colors.texts,
                  },
                ]}
                value={value}
                onChangeText={text => handleChange(field, text)}
                keyboardType={field === 'amount' ? 'numeric' : 'default'}
              />
            )}
            {field === 'amount' && (
              <Text style={[styles.hint, {color: theme.colors.texts}]}>
                Enter the amount in numeric format, without symbols or commas.
                Example: 2000000
              </Text>
            )}
          </View>
        ))}
      </View>

      {loading && <Loading />}
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
    marginBottom: 20,
  },
  iconButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  formContainer: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 15,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
  },
  hint: {
    fontSize: 12,
    marginTop: 5,
  },
});

export default EditBudgetScreen;
