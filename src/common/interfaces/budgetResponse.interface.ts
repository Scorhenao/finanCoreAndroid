export interface BudgetResponse {
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
