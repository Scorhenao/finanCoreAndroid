import {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import {useAuthContext} from '../context/AuthContext';
import {Urls} from '../common/utils/urls';

export const useGraphics = () => {
  const {token} = useAuthContext();
  const [graphicsData, setGraphicsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGraphics = useCallback(async () => {
    if (!token) {
      setError('No token provided');
      console.log('No token available in useAuthContext');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${Urls.BASE_URL}/graphics/broadcast`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setGraphicsData(response.data.data);
      } else {
        setError('Unexpected response status');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchGraphics();
  }, [fetchGraphics]);

  return {graphicsData, loading, error, fetchGraphics};
};
