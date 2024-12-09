import {useState} from 'react';
import axios from 'axios';
import {FileType} from '../common/types/FileTypes';

const API_URL = 'https://api-financore.onrender.com/api/auth/register';
const LOGIN_URL = 'https://api-financore.onrender.com/api/auth/login';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const registerUser = async (
    name: string,
    email: string,
    password: string,
    phone: string,
    profilePicture: FileType | null = null,
  ) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phone', phone);

    if (profilePicture) {
      console.log('File to be sent:', profilePicture);
      formData.append('file', {
        uri: profilePicture.uri,
        type: profilePicture.type,
        name: profilePicture.name,
      });
    } else {
      console.log('No file selected');
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

  const loginUser = async (
    email: string,
    password: string,
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(
        LOGIN_URL,
        {email, password},
        {headers: {'Content-Type': 'application/json'}},
      );

      if (response.status === 200 || response.status === 201) {
        const {accessToken} = response.data;
        if (accessToken) {
          setSuccess(true);
          setToken(accessToken);
          return true;
        } else {
          setError('No access token received');
          return false;
        }
      } else {
        setError('Unexpected response status');
        return false;
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    registerUser,
    loginUser,
    loading,
    error,
    success,
    token,
  };
};
