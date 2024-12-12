import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../common/types/Navigation-types';
import {useRoute} from '@react-navigation/native';
import {useTheme} from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

type EditEarningRouteProp = RouteProp<RootStackParamList, 'EditEarningScreen'>;

const EditEarningScreen = () => {
  const route = useRoute<EditEarningRouteProp>();
  const {earning} = route.params;
  const {theme} = useTheme();

  const [formData, setFormData] = useState({
    name: earning.name,
    startDate: earning.startDate,
    endDate: earning.endDate,
    amountBudgeted: String(earning.amountBudgeted),
    generalAmount: String(earning.generalAmount),
  });

  const handleChange = (field: string, value: string) => {
    setFormData({...formData, [field]: value});
  };

  const handleSave = () => {
    console.log('Updated earning data:', formData);
  };

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: theme.colors.backgrounds}]}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={handleSave}>
          <Icon
            name="checkmark-outline"
            size={24}
            color={theme.colors.buttons}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        <Text style={[styles.title, {color: theme.colors.texts}]}>
          Edit Earning
        </Text>
        {[
          {
            label: 'Name',
            value: formData.name,
            field: 'name',
          },
          {
            label: 'Start Date',
            value: formData.startDate,
            field: 'startDate',
          },
          {
            label: 'End Date',
            value: formData.endDate,
            field: 'endDate',
          },
          {
            label: 'Amount Budgeted',
            value: formData.amountBudgeted,
            field: 'amountBudgeted',
          },
          {
            label: 'General Amount',
            value: formData.generalAmount,
            field: 'generalAmount',
          },
        ].map(({label, value, field}, index) => (
          <View key={index} style={styles.inputGroup}>
            <Text style={[styles.label, {color: theme.colors.texts}]}>
              {label}:
            </Text>
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
            />
          </View>
        ))}
      </View>
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
});

export default EditEarningScreen;
