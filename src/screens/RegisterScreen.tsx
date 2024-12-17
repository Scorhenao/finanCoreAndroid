import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../context/ThemeContext';
import {CircleImage} from '../components/CircleImage';
import {AuthStyles} from '../css/AuthStyles';
import {useAuth} from '../hooks/useAuth';
import {notify} from '../components/NotificationManager';
import Loading from '../components/loading';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FileType} from '../common/types/FileTypes';
import {RootStackParamList} from '../common/types/Navigation-types';

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
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null);

  const handleFileSelection = (file: FileType | null) => {
    setSelectedFile(file);
  };

  const {theme} = useTheme();
  const {registerUser, loading, error, success} = useAuth();
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  useEffect(() => {
    if (error) {
      notify('danger', `Error: ${error}`);
    }
  }, [error]);

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
      selectedFile,
    );

    if (success) {
      notify('success', 'Registration successful');
      navigation.navigate('LoginScreen');
    }
  };

  return (
    <ScrollView
      style={[
        AuthStyles.container,
        {backgroundColor: theme.colors.backgrounds},
      ]}>
      <View style={AuthStyles.titleContainer}>
        <CircleImage onFileSelected={handleFileSelection} />
        <View style={AuthStyles.formUpContainer}>
          <Text style={[AuthStyles.title, {color: theme.colors.texts}]}>
            Sign up
          </Text>
          <View style={AuthStyles.nameNumberContainer}>
            <InputField
              label="Name"
              value={formData.name}
              onChange={text => handleChange('name', text)}
              icon="person-outline"
            />
            <InputField
              label="Number"
              value={formData.number}
              onChange={text => handleChange('number', text)}
              icon="call-outline"
            />
          </View>
        </View>
      </View>

      <InputField
        label="Email"
        value={formData.email}
        onChange={text => handleChange('email', text)}
        icon="mail-outline"
      />
      <PasswordField
        label="Password"
        value={formData.password}
        onChange={text => handleChange('password', text)}
        visible={passwordVisible}
        setVisible={setPasswordVisible}
      />
      <PasswordField
        label="Confirm Password"
        value={formData.confirmPassword}
        onChange={text => handleChange('confirmPassword', text)}
        visible={confirmPasswordVisible}
        setVisible={setConfirmPasswordVisible}
      />

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

const InputField = ({
  label,
  value,
  onChange,
  icon,
}: {
  label: string;
  value: string;
  onChange: (text: string) => void;
  icon: string;
}) => {
  const {theme} = useTheme();
  return (
    <View style={AuthStyles.inputGroup}>
      <Text style={[AuthStyles.label, {color: theme.colors.texts}]}>
        {label}:
      </Text>
      <View style={AuthStyles.inputWithIcon}>
        <Icon name={icon} size={20} color={theme.colors.texts} />
        <TextInput
          style={[
            AuthStyles.input,
            {borderColor: theme.colors.inputs, color: theme.colors.texts},
          ]}
          value={value}
          onChangeText={onChange}
          placeholder={`Your ${label.toLowerCase()}`}
          placeholderTextColor={theme.colors.texts}
        />
      </View>
    </View>
  );
};

const PasswordField = ({
  label,
  value,
  onChange,
  visible,
  setVisible,
}: {
  label: string;
  value: string;
  onChange: (text: string) => void;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {theme} = useTheme();
  return (
    <View style={AuthStyles.inputGroup}>
      <Text style={[AuthStyles.label, {color: theme.colors.texts}]}>
        {label}:
      </Text>
      <View style={AuthStyles.inputWithIcon}>
        <Icon name="lock-closed-outline" size={20} color={theme.colors.texts} />
        <TextInput
          style={[
            AuthStyles.input,
            {borderColor: theme.colors.inputs, color: theme.colors.texts},
          ]}
          value={value}
          onChangeText={onChange}
          placeholder={`Your ${label.toLowerCase()}`}
          secureTextEntry={!visible}
          placeholderTextColor={theme.colors.texts}
        />
        <TouchableOpacity onPress={() => setVisible(!visible)}>
          <Icon
            name={visible ? 'eye-off-outline' : 'eye-outline'}
            size={23}
            color={theme.colors.texts}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
