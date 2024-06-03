import { useQuery } from "@tanstack/react-query";

import { Header } from "../../components/Header";
import { SearchForm } from "../../components/SearchForm";
import { Summary } from "../../components/Summary";

import {
  PriceHighlight,
  TransactionTable,
  TransationContainer,
} from "./styles";

interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  category: string;
  price: string;
  createdAt: string;
}

export function Transactions() {
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
    <div>
      <Header />
      <Summary />

      <TransationContainer>
        <SearchForm />

        <TransactionTable>
          <tbody>
            {transactionsResponse?.map((transaction) => (
              <tr key={transaction.id}>
                <td width="50%">{transaction.description}</td>
                <td>
                  <PriceHighlight variant={transaction.type}>
                    {transaction.price}
                  </PriceHighlight>
                </td>
                <td>{transaction.category}</td>
                <td>{transaction.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </TransactionTable>
      </TransationContainer>
    </div>
  );
}
