import {useState, useEffect} from 'react';
import axios from 'axios';
import {FileType} from '../common/types/FileTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Urls} from '../common/utils/urls';

export interface AuthContextType {
  registerUser: (
    name: string,
    email: string,
    password: string,
    phone: string,
    profilePicture: FileType | null,
  ) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<boolean>;
  forgotPassword: (email: string) => Promise<void>;
  validateRecoveryCode: (email: string, code: string) => Promise<void>;
  resetPassword: (
    email: string,
    code: string,
    newPassword: string,
  ) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
  token: string | null;
}

export const useAuth = (): AuthContextType => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (err: any) {
        console.error('error loading token', err);
      }
    };

    loadToken();
  }, []);

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
      formData.append('file', {
        uri: profilePicture.uri,
        type: profilePicture.type,
        name: profilePicture.name,
      });
    }

    try {
      const response = await axios.post(
        `${Urls.BASE_URL}/auth/register`,
        formData,
        {
          headers: {'Content-Type': 'multipart/form-data'},
        },
      );

      if (response.status === 201) {
        setSuccess(true);
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || 'An error occurred during registration',
      );
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
        `${Urls.BASE_URL}/auth/login`,
        {email, password},
        {headers: {'Content-Type': 'application/json'}},
      );

      if (response.status === 200 || response.status === 201) {
        const {accessToken} = response.data;
        setToken(accessToken);
        await AsyncStorage.setItem('token', accessToken);
        setSuccess(true);
        return true;
      } else {
        setError('Unexpected response status');
        console.log(response.data);
        console.log(response.status);
        console.log(response.request);
        return false;
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred during login');
      console.log(err.response?.data?.message);

      return false;
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await axios.post(`${Urls.BASE_URL}/auth/forgot-password`, {email});
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send recovery code');
    } finally {
      setLoading(false);
    }
  };

  const validateRecoveryCode = async (
    email: string,
    code: string,
  ): Promise<void> => {
    console.log(email, code);

    setLoading(true);
    setError(null);

    try {
      await axios.post(`${Urls.BASE_URL}/auth/validate-recovery-code`, {
        email,
        token: code,
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid recovery code');
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (
    email: string,
    code: string,
    newPassword: string,
  ): Promise<void> => {
    setLoading(true);
    setError(null);
    console.log(email, code, newPassword);

    try {
      const result = await axios.post(`${Urls.BASE_URL}/auth/reset-password`, {
        token: code,
        email,
        newPassword,
      });

      if (result.status === 200) {
        console.log(result.data);
        setSuccess(true);
      } else {
        setError('Something went wrong');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return {
    registerUser,
    loginUser,
    forgotPassword,
    validateRecoveryCode,
    resetPassword,
    loading,
    error,
    success,
    token,
  };
};
