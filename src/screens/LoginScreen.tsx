import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../context/ThemeContext';
import {AuthStyles} from '../css/AuthStyles';
import {useAuth} from '../hooks/useAuth';
import Loading from '../components/loading';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../common/types/Navigation-types';
import {useNavigation} from '@react-navigation/native';
import {notify} from '../components/NotificationManager';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'LoginScreen'
>;

const LoginScreen = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);

  const {theme} = useTheme();
  const {loginUser, loading, error} = useAuth();

  useEffect(() => {
    // Retrieve the stored credentials if the "Remember Password" is true
    const loadCredentials = async () => {
      const storedRememberPassword = await AsyncStorage.getItem(
        'rememberPassword',
      );
      if (storedRememberPassword === 'true') {
        const storedEmail = await AsyncStorage.getItem('email');
        const storedPassword = await AsyncStorage.getItem('password');
        if (storedEmail && storedPassword) {
          setFormData({email: storedEmail, password: storedPassword});
          setRememberPassword(true);
        }
      }
    };
    loadCredentials();
  }, []);

  const handleChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      notify('warning', 'Please enter both email and password');
      return;
    }

    const loginSuccess = await loginUser(formData.email, formData.password);

    if (loginSuccess) {
      // Save credentials to AsyncStorage if "Remember Password" is enabled
      if (rememberPassword) {
        await AsyncStorage.setItem('email', formData.email);
        await AsyncStorage.setItem('password', formData.password);
        await AsyncStorage.setItem('rememberPassword', 'true');
      } else {
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('password');
        await AsyncStorage.setItem('rememberPassword', 'false');
      }

      notify('success', 'Login successful', 'Welcome back!');
      navigation.navigate('HomeScreen');
    } else if (error) {
      notify('danger', 'Login failed', error);
    }
  };

  const handleRecoveryPassword = () => {
    navigation.navigate('ForgotPasswordScreen');
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
            placeholder="Enter your email: "
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
            placeholder="Enter your password: "
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
      <View style={AuthStyles.rememberPasswordContainer}>
        <Switch
          value={rememberPassword}
          onValueChange={setRememberPassword}
          trackColor={{false: theme.colors.inputs, true: theme.colors.buttons}}
          thumbColor={rememberPassword ? theme.colors.texts : '#f4f3f4'}
        />
        <Text style={[AuthStyles.label, {color: theme.colors.texts}]}>
          Remember Password
        </Text>
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

      <Button
        title="Login"
        onPress={handleSubmit}
        color={theme.colors.buttons}
      />
      {loading && <Loading />}
    </ScrollView>
  );
};

export default LoginScreen;
