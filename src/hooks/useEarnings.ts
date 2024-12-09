import {useState, useEffect, useCallback} from 'react';
import axios from 'axios';

const EARNINGS_URL = 'https://api-financore.onrender.com/api/earnings';

export const useEarnings = (token: string | null) => {
  const [earnings, setEarnings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEarnings = useCallback(async () => {
    if (!token) {
      setError('No token provided');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(EARNINGS_URL, {
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

  useEffect(() => {
    fetchEarnings();
  }, [fetchEarnings]);

  return {earnings, loading, error, fetchEarnings};
};
