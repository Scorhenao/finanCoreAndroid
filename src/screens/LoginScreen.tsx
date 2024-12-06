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
import {AuthStyles} from '../css/AuthStyles';

const LoginScreen = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const {theme} = useTheme();

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <ScrollView
      style={[
        AuthStyles.container,
        {backgroundColor: theme.colors.backgrounds},
      ]}>
      <View style={AuthStyles.titleContainer}>
        <View style={AuthStyles.formUpContainer}>
          <Text style={[AuthStyles.title, {color: theme.colors.texts}]}>
            Sign In
          </Text>
        </View>
      </View>

      {/* Email Input */}
      <View style={AuthStyles.inputGroup}>
        <Text style={[AuthStyles.label, {color: theme.colors.texts}]}>
          Email:
        </Text>
        <View style={AuthStyles.inputWithIcon}>
          <Icon name="mail-outline" size={20} color={theme.colors.texts} />
          <TextInput
            style={[
              AuthStyles.input,
              {borderColor: theme.colors.inputs, color: theme.colors.texts},
            ]}
            value={formData.email}
            onChangeText={text => handleChange('email', text)}
            placeholder="Enter your email"
            placeholderTextColor={theme.colors.texts}
          />
        </View>
      </View>

      {/* Password Input */}
      <View style={AuthStyles.inputGroup}>
        <Text style={[AuthStyles.label, {color: theme.colors.texts}]}>
          Password:
        </Text>
        <View style={AuthStyles.inputWithIcon}>
          <Icon
            name="lock-closed-outline"
            size={20}
            color={theme.colors.texts}
          />
          <TextInput
            style={[
              AuthStyles.input,
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

      {/* Submit Button */}
      <Button
        title="Login"
        onPress={handleSubmit}
        color={theme.colors.buttons}
      />
    </ScrollView>
  );
};

export default LoginScreen;
