import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
} from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import {useTheme} from '../context/ThemeContext';
import {useAuth} from '../hooks/useAuth';
import {notify} from '../components/NotificationManager';
import {useNavigation} from '@react-navigation/native';
import Loading from '../components/loading';

const ValidateCodeScreen: React.FC<{route: any}> = ({route}) => {
  const {email} = route.params;
  const {theme} = useTheme();
  const {validateRecoveryCode, loading} = useAuth();
  const navigation = useNavigation();
  const [code, setCode] = useState('');
  const [rememberCode, setRememberCode] = useState(false);

  const handleValidateCode = async () => {
    if (!code) {
      notify('warning', 'Code required', 'Please enter the recovery code.');
      return;
    }

    try {
      await validateRecoveryCode(email, code);
      notify('success', 'Code Validated', 'Recovery code is valid!');
      navigation.navigate('ResetPasswordScreen', {email, code: code});
    } catch (error: any) {
      notify('danger', 'Validation Failed', error?.message || 'Invalid code.');
    }
  };

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: theme.colors.backgrounds}]}
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, {color: theme.colors.texts}]}>
          Validate Code
        </Text>
      </View>
      <View style={styles.inputGroup}>
        <Text style={[styles.label, {color: theme.colors.texts}]}>
          Enter the 6-digit code sent to your email:
        </Text>
        <OTPTextInput
          handleTextChange={setCode}
          inputCount={6}
          tintColor={theme.colors.buttons}
          offTintColor={theme.colors.inputs}
          containerStyle={styles.otpContainer}
          textInputStyle={[
            styles.otpInput,
            {
              color: theme.colors.texts,
              borderColor: theme.colors.inputs,
              backgroundColor: theme.colors.backgrounds,
            },
          ]}
        />
      </View>
      <View style={styles.rememberContainer}>
        <Switch
          value={rememberCode}
          onValueChange={setRememberCode}
          trackColor={{
            false: theme.colors.inputs,
            true: theme.colors.buttons,
          }}
          thumbColor={rememberCode ? theme.colors.texts : '#f4f3f4'}
        />
        <Text style={[styles.label, {color: theme.colors.texts}]}>
          Remember this device
        </Text>
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: theme.colors.buttons,
            borderColor: theme.colors.texts,
          },
        ]}
        onPress={handleValidateCode}>
        <Text style={[styles.buttonText, {color: theme.colors.texts}]}>
          Validate
        </Text>
      </TouchableOpacity>
      {loading && <Loading />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  otpContainer: {
    marginVertical: 16,
  },
  otpInput: {
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    height: 50,
    width: 40,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  button: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ValidateCodeScreen;
