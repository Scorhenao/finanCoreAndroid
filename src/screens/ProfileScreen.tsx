import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, TextInput, Button} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../context/ThemeContext';
import {CircleImage} from '../components/CircleImage';
import {AuthStyles} from '../css/AuthStyles';
import {useAuth} from '../hooks/useAuth';
import {useUser} from '../hooks/useUser'; // Importa el hook useUser
import {notify} from '../components/NotificationManager';
import Loading from '../components/loading';
import {FileType} from '../common/types/FileTypes';

const ProfileScreen = () => {
  const {theme} = useTheme();
  const {token} = useAuth();
  const {user, loading, error, getUserById, updateUser} = useUser();
  const [newName, setNewName] = useState(user?.name || '');
  const [newPhone, setNewPhone] = useState(user?.phone || '');
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null);

  useEffect(() => {
    if (token) {
      getUserById('user-id');
    }
  }, [token, getUserById]);

  useEffect(() => {
    if (error) {
      notify('danger', `Error: ${error}`);
    }
  }, [error]);

  const handleFileSelection = (file: FileType | null) => {
    setSelectedFile(file);
  };

  const handleSave = async () => {
    if (!user) return;

    const updatedUser = {
      name: newName,
      phone: newPhone,
    };

    await updateUser(
      user.id,
      updatedUser,
      selectedFile ? new FormData().append('file', selectedFile) : undefined,
    );
  };

  return (
    <ScrollView
      style={[
        AuthStyles.container,
        {backgroundColor: theme.colors.backgrounds},
      ]}>
      <View style={AuthStyles.titleContainer}>
        <CircleImage
          onFileSelected={handleFileSelection}
          imageUri={user?.profileImage}
        />
        <View style={AuthStyles.formUpContainer}>
          <Text style={[AuthStyles.title, {color: theme.colors.texts}]}>
            Profile
          </Text>
        </View>
      </View>

      {loading ? (
        <Loading />
      ) : (
        <>
          <View style={AuthStyles.nameNumberContainer}>
            <InputField
              label="Name"
              value={newName}
              onChange={setNewName}
              icon="person-outline"
            />
            <InputField
              label="Phone"
              value={newPhone}
              onChange={setNewPhone}
              icon="call-outline"
            />
          </View>

          <Button
            title="Save Changes"
            onPress={handleSave}
            color={theme.colors.buttons}
          />
        </>
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

export default ProfileScreen;
