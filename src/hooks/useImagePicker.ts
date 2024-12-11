import {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {FileType} from '../common/types/FileTypes';

export const useImagePicker = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleImageSelect = async (): Promise<FileType | null> => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
    });

    if (result.assets && result.assets.length > 0) {
      const file = result.assets[0];
      const newFile = {
        uri: file.uri || '',
        type: file.type || 'image/jpeg',
        name: file.fileName || 'photo.jpg',
      };
      setImageUri(file.uri || null);
      return newFile;
    }

    return null;
  };

  const handleTakePhoto = async (): Promise<FileType | null> => {
    const result = await launchCamera({
      mediaType: 'photo',
      includeBase64: false,
    });

    if (result.assets && result.assets.length > 0) {
      const file = result.assets[0];
      const newFile = {
        uri: file.uri || '',
        type: file.type || 'image/jpeg',
        name: file.fileName || 'photo.jpg',
      };
      setImageUri(file.uri || null);
      return newFile;
    }

    return null;
  };

  return {imageUri, handleImageSelect, handleTakePhoto};
};
