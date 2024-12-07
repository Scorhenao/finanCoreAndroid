import {StyleSheet, TouchableOpacity, View, Image, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../context/ThemeContext';
import {useImagePicker} from '../hooks/useImagePicker';

export const CircleImage = () => {
  const {imageUri, handleImageSelect, handleTakePhoto} = useImagePicker();
  const {darkMode} = useTheme();

  const handleIconPress = () => {
    Alert.alert('Choose an option', 'Select a method to pick an image', [
      {
        text: 'Camera',
        onPress: handleTakePhoto,
      },
      {
        text: 'Gallery',
        onPress: handleImageSelect,
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
        <Image source={{uri: imageUri}} style={CircleImageStyles.image} />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleIconPress}>
        <Icon
          style={[CircleImageStyles.icon, CircleImageStyles.addIcon]}
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
    height: 100,
    borderRadius: 100 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    resizeMode: 'cover',
  },
  icon: {
    position: 'absolute',
    bottom: -8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 3,
    borderRadius: 20,
  },
  addIcon: {
    left: 20,
  },
});
