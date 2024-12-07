import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  Alert,
} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../context/ThemeContext';
import {useState} from 'react';

export const CircleImage = () => {
  const [imageUri, setImageUri] = useState('https://i.pravatar.cc/100');
  const {darkMode} = useTheme();

  const handleImageSelect = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const handleTakePhoto = () => {
    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'back', // Puedes especificar 'front' para la cámara frontal
        saveToPhotos: true, // Guardar la foto en el álbum del dispositivo
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled camera picker');
        } else if (response.errorCode) {
          console.log('Error: ', response.errorMessage);
        } else {
          setImageUri(response.assets[0].uri); // Establecer la URI de la foto tomada
        }
      },
    );
  };

  const handleIconPress = () => {
    // Mostrar un menú para seleccionar entre cámara o galería
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
