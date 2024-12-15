import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import {notify} from '../components/NotificationManager';
import Loading from '../components/loading';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../common/types/Navigation-types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEarnings} from '../hooks/useEarnings';
import DateTimePicker from '@react-native-community/datetimepicker';

type EarningData = {
  name: string;
  startDate: string;
  endDate: string;
  generalAmount: number;
};

type AddEarningScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddEarningScreen'
>;

const AddEarningScreen = () => {
  const [earningData, setEarningData] = useState<EarningData>({
    name: '',
    startDate: '',
    endDate: '',
    generalAmount: 0,
  });

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const {theme} = useTheme();
  const {createEarning, loading, error, successMessage} = useEarnings();
  const navigation = useNavigation<AddEarningScreenNavigationProp>();

  const handleChange = (name: keyof EarningData, value: string) => {
    setEarningData({
      ...earningData,
      [name]: value,
    });
  };

  const handleDateChange = (
    event: any,
    selectedDate: Date | undefined,
    dateType: 'startDate' | 'endDate',
  ) => {
    const currentDate = selectedDate || new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];

    setEarningData({
      ...earningData,
      [dateType]: formattedDate,
    });

    if (dateType === 'startDate') {
      setShowStartDatePicker(false);
    } else {
      setShowEndDatePicker(false);
    }
  };

  const handleSubmit = async () => {
    const {name, startDate, endDate, generalAmount} = earningData;

    if (!name.trim() || !generalAmount || !startDate || !endDate) {
      notify('danger', 'Please fill in all fields', '');
      return;
    }
    if (generalAmount <= 0) {
      notify('danger', 'Please enter a valid amount', '');
    }

    const parsedAmount = parseFloat(generalAmount.toString());
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      notify('danger', 'Please enter a valid amount', '');
      return;
    }

    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(startDate) ||
      !/^\d{4}-\d{2}-\d{2}$/.test(endDate)
    ) {
      notify(
        'danger',
        'Invalid date format. Dates must be in YYYY-MM-DD format.',
      );
      return;
    }

    await createEarning(name, startDate, endDate, parsedAmount);

    if (successMessage) {
      notify('success', successMessage, '');
      navigation.replace('HomeScreen');
    } else if (error) {
      notify('danger', `Error: ${error}`, '');
    }
  };

  return (
    <ScrollView
      style={[styles.scrollView, {backgroundColor: theme.colors.backgrounds}]}>
      <Text style={[styles.headerText, {color: theme.colors.texts}]}>
        Add Earning
      </Text>

      <View style={styles.formContainer}>
        <Text style={[styles.label, {color: theme.colors.texts}]}>Name:</Text>
        <View
          style={[
            styles.inputContainer,
            {borderBottomColor: theme.colors.inputs},
          ]}>
          <TextInput
            style={[styles.input, {color: theme.colors.texts}]}
            value={earningData.name}
            onChangeText={text => handleChange('name', text)}
            placeholder="Enter earning name"
            placeholderTextColor={theme.colors.texts}
          />
        </View>

        <Text style={[styles.label, {color: theme.colors.texts}]}>
          General Amount:
        </Text>
        <View
          style={[
            styles.inputContainer,
            {borderBottomColor: theme.colors.inputs},
          ]}>
          <TextInput
            style={[styles.input, {color: theme.colors.texts}]}
            value={String(earningData.generalAmount)}
            onChangeText={text => handleChange('generalAmount', text)}
            placeholder="Enter amount"
            placeholderTextColor={theme.colors.texts}
            keyboardType="numeric"
          />
        </View>

        <Text style={[styles.label, {color: theme.colors.texts}]}>
          Start Date:
        </Text>
        <Button
          title="Select Start Date"
          onPress={() => setShowStartDatePicker(true)}
          color={theme.colors.buttons}
        />
        {earningData.startDate && (
          <Text style={[styles.selectedDate, {color: theme.colors.texts}]}>
            {`Selected Date: ${earningData.startDate}`}
          </Text>
        )}

        {showStartDatePicker && (
          <DateTimePicker
            value={new Date(earningData.startDate || new Date())}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedDate) =>
              handleDateChange(event, selectedDate, 'startDate')
            }
          />
        )}

        <Text style={[styles.label, {color: theme.colors.texts}]}>
          End Date:
        </Text>
        <Button
          title="Select End Date"
          onPress={() => setShowEndDatePicker(true)}
          color={theme.colors.buttons}
        />
        {earningData.endDate && (
          <Text style={[styles.selectedDate, {color: theme.colors.texts}]}>
            {`Selected Date: ${earningData.endDate}`}
          </Text>
        )}

        {showEndDatePicker && (
          <DateTimePicker
            style={styles.dateTimePicker}
            value={new Date(earningData.endDate || new Date())}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedDate) =>
              handleDateChange(event, selectedDate, 'endDate')
            }
          />
        )}

        {loading ? (
          <Loading />
        ) : (
          <TouchableOpacity
            style={[
              styles.submitButton,
              {backgroundColor: theme.colors.buttons},
            ]}
            onPress={handleSubmit}>
            <Text style={{color: theme.colors.texts}}>Add Earning</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  formContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 18,
  },
  inputContainer: {
    borderBottomWidth: 1,
    marginBottom: 15,
  },
  input: {
    fontSize: 18,
    paddingVertical: 5,
  },
  selectedDate: {
    marginVertical: 10,
    fontSize: 16,
  },
  dateTimePicker: {
    marginBottom: 20,
  },
  submitButton: {
    marginTop: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});

export default AddEarningScreen;
