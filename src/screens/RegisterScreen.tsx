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
import {AuthStyles} from '../css/AuthStyles';
import {useAuth} from '../hooks/useAuth';
import {notify} from '../components/NotificationManager';
import Loading from '../components/loading';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../common/types/Navigation-types';
import {StackNavigationProp} from '@react-navigation/stack';

type FormData = {
  name: string;
  number: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'RegisterScreen'
>;

const RegisterScreen = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    number: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const {theme} = useTheme();
  const {registerUser, loading, error, success} = useAuth();
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const handleChange = (name: keyof FormData, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      notify('danger', 'Passwords do not match');
      return;
    }

    await registerUser(
      formData.name,
      formData.email,
      formData.password,
      formData.number,
    );

    if (success) {
      notify('success', 'Registration successful');
      navigation.navigate('LoginScreen');
    } else if (error) {
      notify('danger', `Error: ${error}`);
    }
  };

  const handleRecoveryPassword = () => {
    console.log('Navigating to recovery password screen...');
  };

  return (
    <ScrollView
      style={[
        AuthStyles.container,
        {backgroundColor: theme.colors.backgrounds},
      ]}>
      <View style={AuthStyles.titleContainer}>
        <CircleImage />
        <View style={AuthStyles.formUpContainer}>
          <Text style={[AuthStyles.title, {color: theme.colors.texts}]}>
            Sign up
          </Text>

          <View style={AuthStyles.nameNumberContainer}>
            <View style={AuthStyles.inputGroup}>
              <Text style={[AuthStyles.label, {color: theme.colors.texts}]}>
                Name:
              </Text>
              <View style={AuthStyles.inputWithIcon}>
                <Icon
                  name="person-outline"
                  size={20}
                  color={theme.colors.texts}
                />
                <TextInput
                  style={[
                    AuthStyles.input,
                    {
                      borderColor: theme.colors.inputs,
                      color: theme.colors.texts,
                    },
                  ]}
                  value={formData.name}
                  onChangeText={text => handleChange('name', text)}
                  placeholder="Your name"
                  placeholderTextColor={theme.colors.texts}
                />
              </View>
            </View>

            <View style={AuthStyles.inputGroup}>
              <Text style={[AuthStyles.label, {color: theme.colors.texts}]}>
                Number:
              </Text>
              <View style={AuthStyles.inputWithIcon}>
                <Icon
                  name="call-outline"
                  size={20}
                  color={theme.colors.texts}
                />
                <TextInput
                  style={[
                    AuthStyles.input,
                    {
                      borderColor: theme.colors.inputs,
                      color: theme.colors.texts,
                    },
                  ]}
                  value={formData.number}
                  onChangeText={text => handleChange('number', text)}
                  placeholder="Your number"
                  placeholderTextColor={theme.colors.texts}
                />
              </View>
            </View>
          </View>
        </View>
      </View>

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
            placeholder="Your email"
            placeholderTextColor={theme.colors.texts}
          />
        </View>
      </View>

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
            placeholder="Your password"
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

      <View style={AuthStyles.inputGroup}>
        <Text style={[AuthStyles.label, {color: theme.colors.texts}]}>
          Confirm Password:
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

      <View style={AuthStyles.inputGroup}>
        <TouchableOpacity
          onPress={handleRecoveryPassword}
          style={AuthStyles.recoveryPasswordButton}>
          <Icon name="key-outline" size={20} color={theme.colors.texts} />
          <Text
            style={[
              AuthStyles.recoveryPasswordText,
              {color: theme.colors.texts, borderColor: theme.colors.inputs},
            ]}>
            Recovery Password
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <Loading />
      ) : (
        <Button
          title="Register"
          onPress={handleSubmit}
          color={theme.colors.buttons}
        />
      )}
    </ScrollView>
  );
};

export default RegisterScreen;
