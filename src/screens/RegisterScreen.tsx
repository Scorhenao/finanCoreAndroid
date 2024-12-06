import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../context/ThemeContext';
import {CircleImage} from '../components/CircleImage';
import {RegisterStyles} from '../css/RegisterStyles';

const RegisterScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    password: '',
    confirmPassword: '',
    recoveryPassword: '',
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const {darkMode, theme} = useTheme();
  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  const handleRecoveryPassword = () => {
    console.log('Navigating to recovery password screen...');
  };

  return (
    <ScrollView
      style={[
        RegisterStyles.container,
        {backgroundColor: theme.colors.backgrounds},
      ]}>
      <View style={RegisterStyles.titleContainer}>
        <CircleImage />
        <View style={RegisterStyles.formUpContainer}>
          <Text style={[RegisterStyles.title, {color: theme.colors.texts}]}>
            Sign up
          </Text>

          <View style={RegisterStyles.nameNumberContainer}>
            <View style={RegisterStyles.inputGroup}>
              <Text style={[RegisterStyles.label, {color: theme.colors.texts}]}>
                Name:
              </Text>
              <View style={RegisterStyles.inputWithIcon}>
                <Icon
                  name="person-outline"
                  size={20}
                  color={theme.colors.texts}
                />
                <TextInput
                  style={[
                    RegisterStyles.input,
                    {
                      borderColor: theme.colors.inputs,
                      color: theme.colors.texts,
                    },
                  ]}
                  value={formData.name}
                  onChangeText={text => handleChange('name', text)}
                  placeholder="Enter your name"
                  placeholderTextColor={theme.colors.texts}
                />
              </View>
            </View>

            <View style={RegisterStyles.inputGroup}>
              <Text style={[RegisterStyles.label, {color: theme.colors.texts}]}>
                Number:
              </Text>
              <View style={RegisterStyles.inputWithIcon}>
                <Icon
                  name="call-outline"
                  size={20}
                  color={theme.colors.texts}
                />
                <TextInput
                  style={[
                    RegisterStyles.input,
                    {
                      borderColor: theme.colors.inputs,
                      color: theme.colors.texts,
                    },
                  ]}
                  value={formData.number}
                  onChangeText={text => handleChange('number', text)}
                  placeholder="Enter your number"
                  placeholderTextColor={theme.colors.texts}
                />
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={RegisterStyles.inputGroup}>
        <Text style={[RegisterStyles.label, {color: theme.colors.texts}]}>
          Email:
        </Text>
        <View style={RegisterStyles.inputWithIcon}>
          <Icon name="mail-outline" size={20} color={theme.colors.texts} />
          <TextInput
            style={[
              RegisterStyles.input,
              {borderColor: theme.colors.inputs, color: theme.colors.texts},
            ]}
            value={formData.email}
            onChangeText={text => handleChange('email', text)}
            placeholder="Enter your email"
            placeholderTextColor={theme.colors.texts}
          />
        </View>
      </View>

      <View style={RegisterStyles.inputGroup}>
        <Text style={[RegisterStyles.label, {color: theme.colors.texts}]}>
          Password:
        </Text>
        <View style={RegisterStyles.inputWithIcon}>
          <Icon
            name="lock-closed-outline"
            size={20}
            color={theme.colors.texts}
          />
          <TextInput
            style={[
              RegisterStyles.input,
              {borderColor: theme.colors.inputs, color: theme.colors.texts},
            ]}
            value={formData.password}
            onChangeText={text => handleChange('password', text)}
            placeholder="Enter your password"
            secureTextEntry={!passwordVisible}
            placeholderTextColor={theme.colors.texts}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}>
            <Icon
              name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={23}
              color={theme.colors.texts}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={RegisterStyles.inputGroup}>
        <Text style={[RegisterStyles.label, {color: theme.colors.texts}]}>
          Confirm Password:
        </Text>
        <View style={RegisterStyles.inputWithIcon}>
          <Icon
            name="lock-closed-outline"
            size={20}
            color={theme.colors.texts}
          />
          <TextInput
            style={[
              RegisterStyles.input,
              {borderColor: theme.colors.inputs, color: theme.colors.texts},
            ]}
            value={formData.confirmPassword}
            onChangeText={text => handleChange('confirmPassword', text)}
            placeholder="Confirm your password"
            secureTextEntry={!confirmPasswordVisible}
            placeholderTextColor={theme.colors.texts}
          />
          <TouchableOpacity
            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
            <Icon
              name={confirmPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={23}
              color={theme.colors.texts}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Recovery Password Button */}
      <View style={RegisterStyles.inputGroup}>
        <TouchableOpacity
          onPress={handleRecoveryPassword}
          style={RegisterStyles.recoveryPasswordButton}>
          <Icon name="key-outline" size={20} color={theme.colors.texts} />
          <Text
            style={[
              RegisterStyles.recoveryPasswordText,
              {color: theme.colors.texts, borderColor: theme.colors.inputs},
            ]}>
            Recovery Password
          </Text>
        </TouchableOpacity>
      </View>

      <Button
        title="Register"
        onPress={handleSubmit}
        color={theme.colors.buttons}
      />
    </ScrollView>
  );
};

export default RegisterScreen;
