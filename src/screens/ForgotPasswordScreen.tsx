import React, {useState} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import {useAuth} from '../hooks/useAuth';
import {notify} from '../components/NotificationManager';
import {useNavigation} from '@react-navigation/native';

const ForgotPasswordScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const {forgotPassword} = useAuth();
  const {theme} = useTheme();
  const navigation = useNavigation();

  const handleForgotPassword = async () => {
    if (!email) {
      notify('warning', 'Email Required', 'Please enter your email address.');
      return;
    }

    try {
      await forgotPassword(email);
      notify(
        'success',
        'Email Sent',
        'A recovery code has been sent to your email.',
      );
      navigation.navigate('ValidateCodeScreen', {email});
    } catch (error: any) {
      notify(
        'danger',
        'Request Failed',
        error?.message || 'Failed to send recovery code.',
      );
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {backgroundColor: theme.colors.backgrounds},
      ]}>
      <Text style={[styles.title, {color: theme.colors.texts}]}>
        Forgot Password
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            color: theme.colors.texts,
            borderColor: theme.colors.inputs,
            backgroundColor: theme.colors.backgrounds,
          },
        ]}
        placeholder="Enter your email"
        placeholderTextColor={theme.colors.texts}
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity
        style={[styles.button, {backgroundColor: theme.colors.buttons}]}
        onPress={handleForgotPassword}>
        <Text style={[styles.buttonText, {color: theme.colors.texts}]}>
          Send Recovery Code
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;
