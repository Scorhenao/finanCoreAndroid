import {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export const useImagePicker = () => {
  const [imageUri, setImageUri] = useState('https://i.pravatar.cc/100');

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
        cameraType: 'back',
        saveToPhotos: true,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled camera picker');
        } else if (response.errorCode) {
          console.log('Error: ', response.errorMessage);
        } else {
          setImageUri(response.assets[0].uri);
        }
      },
    );
  };

  return {imageUri, handleImageSelect, handleTakePhoto};
};
