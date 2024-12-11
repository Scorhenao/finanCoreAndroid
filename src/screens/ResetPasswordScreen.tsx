import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useAuth} from '../hooks/useAuth';
import {useRoute} from '@react-navigation/native';
import {notify} from '../components/NotificationManager';
import {useTheme} from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

const ResetPasswordScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const {resetPassword} = useAuth();
  const route = useRoute();
  const {theme} = useTheme();

  const {email, code} = route.params as {email: string; code: string};

  const handleResetPassword = async () => {
    if (!newPassword || !confirmNewPassword) {
      Alert.alert('Error', 'Please enter both new password and confirmation.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      notify(
        'danger',
        'Please enter the same password twice.',
        'Passwords do not match',
      );
      return;
    }

    try {
      await resetPassword(email, code, newPassword);
      notify('success', 'Reset Successful', 'Password has been reset.');
      navigation.navigate('LoginScreen');
    } catch (error: any) {
      notify(
        'danger',
        'Reset Failed',
        error?.message || 'Failed to reset password',
      );
    }
  };

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.backgrounds}]}>
      <Text style={[styles.title, {color: theme.colors.texts}]}>
        Reset Password
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            {borderColor: theme.colors.texts, color: theme.colors.texts},
          ]}
          placeholder="Enter new password"
          placeholderTextColor={theme.colors.texts}
          secureTextEntry={!passwordVisible}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setPasswordVisible(!passwordVisible)}>
          <Icon
            name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
            size={23}
            color={theme.colors.texts}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            {borderColor: theme.colors.texts, color: theme.colors.texts},
          ]}
          placeholder="Confirm new password"
          placeholderTextColor={theme.colors.texts}
          secureTextEntry={!confirmPasswordVisible}
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
        />
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
          <Icon
            name={confirmPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
            size={23}
            color={theme.colors.texts}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, {backgroundColor: theme.colors.buttons}]}
        onPress={handleResetPassword}>
        <Text style={[styles.buttonText, {color: theme.colors.texts}]}>
          Reset Password
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  icon: {
    position: 'absolute',
    right: 10,
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ResetPasswordScreen;
