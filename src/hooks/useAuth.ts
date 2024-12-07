import {useState} from 'react';
import axios from 'axios';
import {FileType} from '../common/types/FileTypes';

const API_URL = 'https://api-financore.onrender.com/api/auth/register';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const registerUser = async (
    name: string,
    email: string,
    password: string,
    phone: string,
    file: FileType | null = null,
  ) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phone', phone);

    if (file) {
      formData.append('file', {
        uri: file.uri,
        type: file.type,
        name: file.name,
      });
    }

    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        setSuccess(true);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    registerUser,
    loading,
    error,
    success,
  };
};
