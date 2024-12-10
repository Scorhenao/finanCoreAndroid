import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useAuthContext} from '../context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const LogoutButton = () => {
  const navigation = useNavigation();
  const {logout} = useAuthContext();

  const handleLogout = () => {
    logout(navigation);
  };

  return (
    <TouchableOpacity onPress={handleLogout}>
      <Ionicons name="log-out-outline" size={28} color="black" />
    </TouchableOpacity>
  );
};

export default LogoutButton;
