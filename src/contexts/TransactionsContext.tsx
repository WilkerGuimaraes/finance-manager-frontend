import { ReactNode, createContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { api } from "../lib/axios";
import { Transaction, TransactionsResponse } from "../data/transactions";

interface CreateTransactionInput {
  description: string;
  category: string;
  price: number;
  type: "income" | "outcome";
}

interface TransactionContextType {
  transactions: Transaction[];
  page: number;
  count: number;
  pages: number;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
}

interface TransactionProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [searchParams] = useSearchParams();

  const [count, setCount] = useState(0);

  const pages = Math.ceil(count / 10);

  const description = searchParams.get("name") ?? "";
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const { data: transactionsResponse } = useQuery<Transaction[]>({
    queryKey: ["get-transactions", page, description],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (description) params.set("description", description);
      params.set("page", String(page));

      const queryString = params.toString();

      const response = await api.get<TransactionsResponse>(
        `/transactions?${queryString}`
      );

      const countResponse = response.data.count;
      setCount(countResponse);

      return response.data.transactions;
    },
  });

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (transactionsResponse) {
      setTransactions(transactionsResponse);
    }
  }, [transactionsResponse]);

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
        page,
        count,
        pages,
        createTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
