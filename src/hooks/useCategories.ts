import {useState, useCallback, useEffect} from 'react';
import axios from 'axios';
import {useAuthContext} from '../context/AuthContext';
import {Urls} from '../common/utils/urls';

interface Category {
  id: string;
  name: string;
}

export const useCategories = () => {
  const {token} = useAuthContext();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    if (!token) {
      setError('No token provided');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${Urls.BASE_URL}/categories`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setCategories(response.data);
      } else {
        setError('Unexpected response status');
      }
    } catch (err: any) {
      console.error(
        'Error fetching categories:',
        err.response?.data || err.message,
      );
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [token]);

  const createCategory = useCallback(
    async (name: string) => {
      if (!token) {
        setError('No token provided');
        return;
      }

      setLoading(true);
      setError(null);
      setSuccessMessage(null);

      try {
        const response = await axios.post(
          `${Urls.BASE_URL}/categories`,
          {name},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log('Response data:', response.data);

        if (response.status === 201) {
          setSuccessMessage('Category created successfully');

          setCategories(prevCategories => {
            if (Array.isArray(prevCategories)) {
              return [...prevCategories, response.data.data];
            } else {
              return [response.data.data];
            }
          });
        } else {
          setError('Unexpected response status');
        }
      } catch (err: any) {
        console.error(
          'Error creating category:',
          err.response?.data || err.message,
        );
        setError(err.response?.data?.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    },
    [token],
  );

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    successMessage,
    fetchCategories,
    createCategory,
  };
};
