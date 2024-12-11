import React from 'react';
import {StyleSheet, TouchableOpacity, View, Image, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../context/ThemeContext';
import {useImagePicker} from '../hooks/useImagePicker';
import {FileType} from '../common/types/FileTypes';

export const CircleImage = ({
  onFileSelected,
}: {
  onFileSelected: (file: FileType | null) => void;
}) => {
  const {imageUri, handleImageSelect, handleTakePhoto} = useImagePicker();
  const {darkMode} = useTheme();

  const handleIconPress = () => {
    Alert.alert('Choose an option', 'Select a method to pick an image', [
      {
        text: 'Camera',
        onPress: async () => {
          const file = await handleTakePhoto();
          onFileSelected(file); // Usar el archivo directamente
        },
      },
      {
        text: 'Gallery',
        onPress: async () => {
          const file = await handleImageSelect();
          onFileSelected(file); // Usar el archivo directamente
        },
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  return (
    <View style={CircleImageStyles.container}>
      <TouchableOpacity onPress={handleIconPress}>
        {imageUri ? (
          <Image source={{uri: imageUri}} style={CircleImageStyles.image} />
        ) : (
          <Icon
            name="person-circle-outline"
            size={110}
            color={darkMode ? '#fff' : '#000'}
          />
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleIconPress}
        style={CircleImageStyles.addIcon}>
        <Icon
          name="add-circle-outline"
          size={30}
          color={darkMode ? '#fff' : '#000'}
        />
      </TouchableOpacity>
    </View>
  );
};

const CircleImageStyles = StyleSheet.create({
  container: {
    width: 100,
    height: 110,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'cover',
    zIndex: 1,
  },
  addIcon: {
    position: 'absolute',
    bottom: -5,
    right: -14,
    zIndex: 2,
  },
});
