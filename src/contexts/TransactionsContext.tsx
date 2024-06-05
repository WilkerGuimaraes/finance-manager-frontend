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

interface CreateTransactionInput {
  description: string;
  category: string;
  price: number;
  type: "income" | "outcome";
}

interface TransactionContextType {
  transactions: Transaction[];
  filterTransactions: (query: string) => void;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
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

  async function createTransaction(data: CreateTransactionInput) {
    const { description, price, category, type } = data;

    const response = await api.post("/transactions", {
      description,
      price,
      category,
      type,
      createdAt: new Date(),
    });

    setTransactions((state) => [response.data, ...state]);
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        filterTransactions,
        createTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
