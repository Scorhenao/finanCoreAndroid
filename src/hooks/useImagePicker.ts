import {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {FileType} from '../common/types/FileTypes';

export const useImagePicker = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<FileType | null>(null);

  console.log('Selected file:', imageFile);

  const handleImageSelect = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
    });

    if (result.assets && result.assets.length > 0) {
      const file = result.assets[0];
      setImageUri(file.uri || null);
      setImageFile({
        uri: file.uri,
        type: file.type,
        name: file.fileName,
      });
    }
  };

  const handleTakePhoto = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      includeBase64: false,
    });

    if (result.assets && result.assets.length > 0) {
      const file = result.assets[0];
      setImageUri(file.uri || null);
      setImageFile({
        uri: file.uri,
        type: file.type,
        name: file.fileName,
      });
    }
  };

  return {imageUri, imageFile, handleImageSelect, handleTakePhoto};
};
