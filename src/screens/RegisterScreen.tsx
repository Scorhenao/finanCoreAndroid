import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../context/ThemeContext';
import {CircleImage} from '../components/CircleImage';

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
      style={[styles.container, {backgroundColor: theme.colors.backgrounds}]}>
      <View style={styles.titleContainer}>
        <CircleImage />
        <View style={styles.formUpContainer}>
          <Text style={[styles.title, {color: theme.colors.texts}]}>
            Sign up
          </Text>

          <View style={styles.nameNumberContainer}>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, {color: theme.colors.texts}]}>
                Name:
              </Text>
              <View style={styles.inputWithIcon}>
                <Icon
                  name="person-outline"
                  size={20}
                  color={theme.colors.texts}
                />
                <TextInput
                  style={[
                    styles.input,
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

            <View style={styles.inputGroup}>
              <Text style={[styles.label, {color: theme.colors.texts}]}>
                Number:
              </Text>
              <View style={styles.inputWithIcon}>
                <Icon
                  name="call-outline"
                  size={20}
                  color={theme.colors.texts}
                />
                <TextInput
                  style={[
                    styles.input,
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

      <View style={styles.inputGroup}>
        <Text style={[styles.label, {color: theme.colors.texts}]}>Email:</Text>
        <View style={styles.inputWithIcon}>
          <Icon name="mail-outline" size={20} color={theme.colors.texts} />
          <TextInput
            style={[
              styles.input,
              {borderColor: theme.colors.inputs, color: theme.colors.texts},
            ]}
            value={formData.email}
            onChangeText={text => handleChange('email', text)}
            placeholder="Enter your email"
            placeholderTextColor={theme.colors.texts}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={[styles.label, {color: theme.colors.texts}]}>
          Password:
        </Text>
        <View style={styles.inputWithIcon}>
          <Icon
            name="lock-closed-outline"
            size={20}
            color={theme.colors.texts}
          />
          <TextInput
            style={[
              styles.input,
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

      <View style={styles.inputGroup}>
        <Text style={[styles.label, {color: theme.colors.texts}]}>
          Confirm Password:
        </Text>
        <View style={styles.inputWithIcon}>
          <Icon
            name="lock-closed-outline"
            size={20}
            color={theme.colors.texts}
          />
          <TextInput
            style={[
              styles.input,
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
      <View style={styles.inputGroup}>
        <TouchableOpacity
          onPress={handleRecoveryPassword}
          style={styles.recoveryPasswordButton}>
          <Icon name="key-outline" size={20} color={theme.colors.texts} />
          <Text
            style={[
              styles.recoveryPasswordText,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 30,
  },
  formUpContainer: {
    flexDirection: 'column',
    width: 160,
  },
  nameNumberContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 10,
  },
  inputGroup: {
    marginBottom: 15,
    flex: 1,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    height: 40,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    height: 40,
    fontSize: 14,
  },
  recoveryPasswordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  recoveryPasswordText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default RegisterScreen;
