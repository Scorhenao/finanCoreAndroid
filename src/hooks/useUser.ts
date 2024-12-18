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
          setUser(response.data);
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

      const formData = new FormData();
      formData.append('name', updatedUser.name || '');
      formData.append('email', updatedUser.email || '');
      formData.append('phone', updatedUser.phone || '');
      if (file) formData.append('file', file);

      try {
        const response = await axios.patch(
          `${Urls.BASE_URL}/users/${id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.status === 200) {
          setSuccessMessage('User updated successfully');
          setUser(prevUser => ({...prevUser, ...updatedUser} as User));
        } else {
          setError('Unexpected response status');
        }
      } catch (err: any) {
        console.error(
          'Error updating user:',
          err.response?.data || err.message,
        );
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
