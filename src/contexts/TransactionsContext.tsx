import { ReactNode, createContext } from "react";
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

  return (
    <TransactionsContext.Provider
      value={{ transactions: transactionsResponse || [] }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
