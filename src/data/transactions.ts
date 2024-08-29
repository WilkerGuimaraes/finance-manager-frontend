export interface TransactionsResponse {
  transactions: Transaction[];
  count: number;
}

export interface Transaction {
  id: string;
  description: string;
  type: "income" | "outcome";
  category: string;
  price: number;
  createdAt: string;
}
