import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../context/ThemeContext';
import {useAuth} from '../hooks/useAuth';
import {useUser} from '../hooks/useUser';
import {notify} from '../components/NotificationManager';
import Loading from '../components/loading';
import {useImagePicker} from '../hooks/useImagePicker';
import {ProfileStyles} from '../css/ProfileStyles';
import {useNavigation} from '@react-navigation/native';

const ProfileScreen = ({route}: any) => {
  const {theme} = useTheme();
  const {token} = useAuth();
  const {user: hookUser, loading, error, getUserById, updateUser} = useUser();
  const {imageUri, handleImageSelect, handleTakePhoto} = useImagePicker();
  const navigation = useNavigation();
  const {user, setUser} = route?.params;

  const [newName, setNewName] = useState(user?.name || '');
  const [newEmail, setNewEmail] = useState(user?.email || '');
  const [newPhone, setNewPhone] = useState(user?.phone || '');

  useEffect(() => {
    if (!user && token) {
      getUserById(user.id);
    }
  }, [token, getUserById, user.id, user]);

  useEffect(() => {
    if (error) {
      notify('danger', `Error: ${error}`);
    }
  }, [error]);

  const handleSave = async () => {
    if (!user) {
      return;
    }

    const formData = new FormData();

    if (newName) {
      formData.append('name', newName);
    }
    if (newEmail) {
      formData.append('email', newEmail);
    }
    if (newPhone) {
      formData.append('phone', newPhone);
    }

    if (imageUri) {
      formData.append('file', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'profile.jpg',
      });
    }

    try {
      await updateUser(
        user.id,
        {name: newName, email: newEmail, phone: newPhone},
        formData,
      );
      notify('success', 'User updated successfully');
      setUser({...user, name: newName, email: newEmail, phone: newPhone});
      navigation.goBack();
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  return (
    <ScrollView
      style={[
        ProfileStyles.container,
        {backgroundColor: theme.colors.backgrounds},
      ]}>
      <View style={ProfileStyles.titleContainer}>
        <TouchableOpacity
          style={ProfileStyles.profileContainer}
          onPress={async () => {
            const file = await handleImageSelect();
            console.log('Selected file:', file);
          }}>
          {imageUri ? (
            <Image
              source={{uri: imageUri}}
              style={[
                ProfileStyles.profileImage,
                {borderColor: theme.colors.texts},
              ]}
            />
          ) : user?.profilePicture ? (
            <Image
              source={{uri: user.profilePicture}}
              style={[
                ProfileStyles.profileImage,
                {borderColor: theme.colors.texts},
              ]}
            />
          ) : (
            <Icon
              name="person-circle-outline"
              size={150}
              color={theme.colors.texts}
            />
          )}
        </TouchableOpacity>
        <View style={ProfileStyles.formUpContainer}>
          <Text style={[ProfileStyles.title, {color: theme.colors.texts}]}>
            Profile
          </Text>
        </View>
      </View>

      {loading ? (
        <Loading />
      ) : (
        <>
          <View style={ProfileStyles.formContainer}>
            <InputField
              label="Name"
              value={newName}
              onChange={setNewName}
              icon="person-outline"
            />
            <InputField
              label="Email"
              value={newEmail}
              onChange={setNewEmail}
              icon="mail-outline"
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
  secureTextEntry = false,
}: {
  label: string;
  value: string;
  onChange: (text: string) => void;
  icon: string;
  secureTextEntry?: boolean;
}) => {
  const {theme} = useTheme();
  return (
    <View style={ProfileStyles.inputGroup}>
      <Text style={[ProfileStyles.label, {color: theme.colors.texts}]}>
        {label}:
      </Text>
      <View style={ProfileStyles.inputWithIcon}>
        <Icon name={icon} size={20} color={theme.colors.texts} />
        <TextInput
          style={[
            ProfileStyles.input,
            {borderColor: theme.colors.inputs, color: theme.colors.texts},
          ]}
          value={value}
          onChangeText={onChange}
          placeholder={`Your ${label.toLowerCase()}`}
          placeholderTextColor={theme.colors.texts}
          secureTextEntry={secureTextEntry}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;
