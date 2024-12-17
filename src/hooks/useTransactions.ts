import {useState, useCallback} from 'react';
import axios from 'axios';
import {useAuthContext} from '../context/AuthContext';
import {Urls} from '../common/utils/urls';
import {Transaction} from '../common/interfaces/transaction.interface';

export const useTransactions = () => {
  const {token} = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);

  const createTransaction = useCallback(
    async (transaction: Omit<Transaction, 'id'>) => {
      if (!token) {
        setError('No token provided');
        return;
      }

      setLoading(true);
      setError(null);
      setSuccessMessage(null);

      try {
        const response = await axios.post(
          `${Urls.BASE_URL}/transactions`,
          transaction,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.status === 201) {
          setSuccessMessage('Transaction created successfully');
          setTransactions(prev => [...(prev || []), response.data.data]);
        } else {
          setError('Unexpected response status');
        }
      } catch (err: any) {
        console.error(
          'Error creating transaction:',
          err.response?.data || err.message,
        );
        setError(err.response?.data?.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    },
    [token],
  );

  const getTransactions = useCallback(async () => {
    if (!token) {
      setError('No token provided');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${Urls.BASE_URL}/transactions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setTransactions(response.data);
      } else {
        setError('Unexpected response status');
      }
    } catch (err: any) {
      console.error(
        'Error fetching transactions:',
        err.response?.data || err.message,
      );
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [token]);

  const getTransactionById = useCallback(
    async (id: string) => {
      if (!token) {
        setError('No token provided');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${Urls.BASE_URL}/transactions/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.status === 200) {
          return response.data.data;
        } else {
          setError('Unexpected response status');
        }
      } catch (err: any) {
        console.error(
          'Error fetching transaction:',
          err.response?.data || err.message,
        );
        setError(err.response?.data?.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    },
    [token],
  );

  const getTransactionsByBudgetId = useCallback(
    async (budgetId: string) => {
      if (!token) {
        setError('No token provided');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${Urls.BASE_URL}/transactions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {budgetId},
        });

        if (response.status === 200) {
          setTransactions(response.data);
          console.log('Transactions fetched for budget:', response.data);
        } else {
          setError('Unexpected response status');
        }
      } catch (err: any) {
        console.error(
          'Error fetching transactions:',
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
    transactions,
    createTransaction,
    getTransactions,
    getTransactionById,
    getTransactionsByBudgetId,
  };
};
