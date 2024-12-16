import {useState, useCallback} from 'react';
import axios from 'axios';
import {useAuthContext} from '../context/AuthContext';
import {Urls} from '../common/utils/urls';

interface Budget {
  name: string;
  description: string;
  amount: number;
  startDate: string;
  endDate: string;
  categoryId: string;
  earningId: string;
}

interface BudgetResponse {
  id: string;
  name: string;
  description: string;
  amount: number;
  startDate: string;
  endDate: string;
  category: {
    id: string;
    name: string;
  };
  earning: {
    id: string;
    name: string;
  };
  user: {
    id: string;
    name: string;
  };
}

export const useBudgets = () => {
  const {token} = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [createdBudget, setCreatedBudget] = useState<BudgetResponse | null>(
    null,
  );
  const [budgets, setBudgets] = useState<BudgetResponse[] | null>(null);

  const createBudget = useCallback(
    async (budget: Budget) => {
      if (!token) {
        setError('No token provided');
        return;
      }

      setLoading(true);
      setError(null);
      setSuccessMessage(null);

      try {
        const response = await axios.post(`${Urls.BASE_URL}/budgets`, budget, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 201) {
          setSuccessMessage('Budget created successfully');
          setCreatedBudget(response.data.data);
        } else {
          setError('Unexpected response status');
        }
      } catch (err: any) {
        console.error(
          'Error creating budget:',
          err.response?.data || err.message,
        );
        setError(err.response?.data?.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    },
    [token],
  );

  const getBudgets = useCallback(async () => {
    if (!token) {
      setError('No token provided');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${Urls.BASE_URL}/budgets`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setBudgets(response.data.data);
      } else {
        setError('Unexpected response status');
      }
    } catch (err: any) {
      console.error(
        'Error fetching budgets:',
        err.response?.data || err.message,
      );
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [token]);

  // DELETE budget
  const deleteBudget = useCallback(
    async (id: string) => {
      if (!token) {
        setError('No token provided');
        return;
      }

      setLoading(true);
      setError(null);
      setSuccessMessage(null);

      try {
        const response = await axios.delete(`${Urls.BASE_URL}/budgets/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 204) {
          setSuccessMessage('Budget deleted successfully');
          // Optionally, remove the deleted budget from the local state
          setBudgets(prev => prev?.filter(budget => budget.id !== id) || null);
        } else {
          setError('Unexpected response status');
        }
      } catch (err: any) {
        console.error(
          'Error deleting budget:',
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
    createdBudget,
    budgets,
    createBudget,
    getBudgets,
    deleteBudget,
  };
};
