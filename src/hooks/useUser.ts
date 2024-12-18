import {useState, useCallback} from 'react';
import axios from 'axios';
import {useAuthContext} from '../context/AuthContext';
import {Urls} from '../common/utils/urls';
import {User} from '../common/interfaces/user.interface';

export const useUser = () => {
  const {token} = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const getUserById = useCallback(
    async (id: string) => {
      if (!token) {
        setError('No token provided');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${Urls.BASE_URL}/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setUser(response.data); // Set user data
        } else {
          setError('Unexpected response status');
        }
      } catch (err: any) {
        console.error(
          'Error fetching user:',
          err.response?.data || err.message,
        );
        setError(err.response?.data?.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    },
    [token],
  );

  const updateUser = useCallback(
    async (id: string, updatedUser: Partial<User>, file?: FormData) => {
      if (!token) {
        setError('No token provided');
        return;
      }

      setLoading(true);
      setError(null);
      setSuccessMessage(null);

      try {
        console.log('Request URL:', `${Urls.BASE_URL}/users/${id}`);
        console.log('Request Headers:', {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        });
        console.log('FormData contents:');
        for (let [key, value] of file._parts) {
          console.log(`${key}:`, value);
        }

        const response = await axios.patch(
          `${Urls.BASE_URL}/users/${id}`,
          file,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.status === 200) {
          setUser(prevUser => ({
            ...prevUser,
            ...updatedUser,
          }));
          setSuccessMessage('User updated successfully');
        }
      } catch (err: any) {
        console.error('Full error object:', err);
        console.error('Error response:', err.response);
        setError(err.response?.data?.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    },
    [token],
  );

  return {
    loading,
    error,
    successMessage,
    user,
    getUserById,
    updateUser,
  };
};
