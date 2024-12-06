import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../context/ThemeContext';

export const CircleImage = () => {
  const {darkMode} = useTheme();

  return (
    <View style={CircleImageStyles.container}>
      <Image
        source={{uri: 'https://i.pravatar.cc/100'}}
        style={CircleImageStyles.container}
      />

      <Icon
        style={CircleImageStyles.icon}
        name="add-circle-outline"
        size={30}
        color={darkMode ? '#fff' : '#000'}
      />
    </View>
  );
};

const CircleImageStyles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    bottom: -8,
    right: 0,
  },
});
