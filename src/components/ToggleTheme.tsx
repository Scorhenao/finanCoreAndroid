import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../context/ThemeContext';

const DarkModeToggle = () => {
  const {darkMode, toggleDarkMode} = useTheme();

  return (
    <TouchableOpacity onPress={toggleDarkMode} style={styles.container}>
      <Icon
        name={darkMode ? 'moon' : 'sunny'}
        size={30}
        color={darkMode ? '#fff' : '#000'}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DarkModeToggle;
