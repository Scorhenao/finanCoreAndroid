import {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import {useAuthContext} from '../context/AuthContext';
import {Urls} from '../common/utils/urls';

export const useEarnings = () => {
  const {token} = useAuthContext();
  const [earnings, setEarnings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchEarnings = useCallback(async () => {
    if (!token) {
      setError('No token provided');
      console.log('No token available in useAuthContext');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${Urls.BASE_URL}/earnings`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setEarnings(response.data);
      } else {
        setError('Unexpected response status');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [token]);

  const createEarning = async (
    name: string,
    startDate: string,
    endDate: string,
    generalAmount: number,
  ) => {
    if (!token) {
      setError('No token provided');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const earningData = {
      name,
      startDate,
      endDate,
      generalAmount,
    };

    try {
      const response = await axios.post(
        `${Urls.BASE_URL}/earnings`,
        earningData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('Earning response:', response);

      if (response.status === 201 || response.status === 200) {
        setSuccessMessage('Earning created successfully');
        setEarnings(prevEarnings =>
          Array.isArray(prevEarnings)
            ? [...prevEarnings, response.data.data]
            : [response.data.data],
        );
      } else {
        setError('Unexpected response status');
      }
    } catch (err: any) {
      console.error(
        'Error creating earning:',
        err.response?.data || err.message,
      );
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const deleteEarning = async (id: string) => {
    if (!token) {
      setError('No token provided');
      return;
    }
    console.log(`the id in the delete request is ${id}`);

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.delete(`${Urls.BASE_URL}/earnings/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 || response.status === 204) {
        setSuccessMessage('Earning deleted successfully');
        setEarnings(prevEarnings =>
          Array.isArray(prevEarnings)
            ? prevEarnings.filter(earning => earning.id !== id)
            : [],
        );
        console.log('Earning deleted:', response.data);
      } else {
        setError('Unexpected response status');
        console.log('Unexpected response status:', response.status);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEarnings();
  }, [fetchEarnings]);

  return {
    earnings,
    loading,
    error,
    successMessage,
    fetchEarnings,
    createEarning,
    deleteEarning,
  };
};
