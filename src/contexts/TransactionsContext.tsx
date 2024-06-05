import { ReactNode, createContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { api } from "../lib/axios";

interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  category: string;
  price: number;
  createdAt: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  filterTransactions: (query: string) => void;
}

interface TransactionProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionProvider({ children }: TransactionProviderProps) {
  const { data: transactionsResponse } = useQuery<Transaction[]>({
    queryKey: ["get-transactions"],
    queryFn: async () => {
      const response = await api.get("/transactions");

      return response.data;
    },
  });

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (transactionsResponse) {
      const sortedTransactions = transactionsResponse.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setTransactions(sortedTransactions);
    }
  }, [transactionsResponse]);

  const filterTransactions = (query: string) => {
    if (transactionsResponse) {
      if (query.trim() === "") {
        setTransactions(transactionsResponse);
      } else {
        const filteredTransactions = transactionsResponse.filter(
          (transaction) =>
            transaction.description.toLowerCase().includes(query.toLowerCase())
        );
        setTransactions(filteredTransactions);
      }
    }
  };

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        filterTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
