import { ReactNode, createContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

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
      const data = await fetch("http://localhost:3333/transactions").then(
        (response) => response.json()
      );

      return data;
    },
  });

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (transactionsResponse) {
      setTransactions(transactionsResponse);
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
