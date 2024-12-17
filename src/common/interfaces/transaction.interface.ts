export interface Transaction {
  id: string;
  amount: number;
  description: string;
  budget: {
    id: string;
  };
}
