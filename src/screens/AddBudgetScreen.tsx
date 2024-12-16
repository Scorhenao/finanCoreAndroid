import React, {useState} from 'react';
import {
  ScrollView,
  TextInput,
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useRoute} from '@react-navigation/native';

const AddBudgetScreen = () => {
  const {theme} = useTheme();
  const route = useRoute();
  const {earningId, amountAvailable, earningName} = route.params;

  console.log(earningId, amountAvailable, earningName);

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

  const handleChange = (name: keyof typeof budgetData, value: string) => {
    setBudgetData({
      ...budgetData,
      [name]: value,
    });
  };

  const handleDateChange = (
    event: any,
    selectedDate: Date | undefined,
    type: 'startDate' | 'endDate',
  ) => {
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

  return (
    <ScrollView
      style={[styles.scrollView, {backgroundColor: theme.colors.backgrounds}]}>
      <View style={styles.inputGroup}>
        <Text style={[styles.label, {color: theme.colors.texts}]}>Name:</Text>
        <View style={styles.inputWithIcon}>
          <Icon name="create-outline" size={20} color={theme.colors.texts} />
          <TextInput
            style={[
              styles.input,
              {color: theme.colors.texts, borderColor: theme.colors.inputs},
            ]}
            value={budgetData.name}
            onChangeText={text => handleChange('name', text)}
            placeholder="Enter budget name"
            placeholderTextColor={theme.colors.texts}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={[styles.label, {color: theme.colors.texts}]}>
          Description:
        </Text>
        <View style={styles.inputWithIcon}>
          <Icon name="document-outline" size={20} color={theme.colors.texts} />
          <TextInput
            style={[
              styles.input,
              {color: theme.colors.texts, borderColor: theme.colors.inputs},
            ]}
            value={budgetData.description}
            onChangeText={text => handleChange('description', text)}
            placeholder="Enter description"
            placeholderTextColor={theme.colors.texts}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={[styles.label, {color: theme.colors.texts}]}>Amount:</Text>
        <View style={styles.inputWithIcon}>
          <Icon name="wallet-outline" size={20} color={theme.colors.texts} />
          <TextInput
            style={[
              styles.input,
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
      <View style={styles.inputGroupDates}>
        <View style={styles.inputGroup}>
          <Text style={[styles.label, {color: theme.colors.texts}]}>
            Start Date:
          </Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowStartDatePicker(true)}>
            <Icon
              name="calendar-outline"
              size={24}
              color={theme.colors.texts}
            />
            <Text style={[styles.dateText, {color: theme.colors.texts}]}>
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
        <View style={styles.inputGroup}>
          <Text style={[styles.label, {color: theme.colors.texts}]}>
            End Date:
          </Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowEndDatePicker(true)}>
            <Icon
              name="calendar-outline"
              size={24}
              color={theme.colors.texts}
            />
            <Text style={[styles.dateText, {color: theme.colors.texts}]}>
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
      <View style={styles.modifyCategory}>
        <Text style={[styles.modifyText, {color: theme.colors.texts}]}>
          Modify Category
        </Text>
        <Icon name="ellipsis-horizontal" size={24} color={theme.colors.texts} />
      </View>

      {/* Category Select */}
      <View style={styles.inputGroup}>
        <Picker
          selectedValue={budgetData.category}
          onValueChange={itemValue => handleChange('category', itemValue)}
          style={{
            height: 50,
            width: '100%',
            color: theme.colors.texts,
          }}>
          <Picker.Item label="Select Category" value="" />
          <Picker.Item label="Food" value="food" />
          <Picker.Item label="Transport" value="transport" />
          <Picker.Item label="Entertainment" value="entertainment" />
        </Picker>
      </View>

      {/* Budget Text */}
      <View style={styles.budgetText}>
        <Text style={[styles.modifyText, {color: theme.colors.texts}]}>
          Budget from {earningName}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.saveButton, {backgroundColor: theme.colors.buttons}]}
        onPress={handleSaveBudget}>
        <Text style={styles.saveButtonText}>Save Budget</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  inputGroup: {
    marginBottom: 20,
    alignItems: 'center',
  },
  inputGroupDates: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 10,
    paddingRight: 10,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  dateText: {
    fontSize: 16,
    marginLeft: 10,
  },
  modifyCategory: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 10,
    marginVertical: 20,
  },
  modifyText: {
    fontSize: 18,
    textAlign: 'center',
  },
  budgetText: {
    alignItems: 'center',
    marginTop: 10,
  },
});

export default AddBudgetScreen;
