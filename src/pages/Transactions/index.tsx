import { useContext } from "react";
import { Trash2 } from "lucide-react";

import { Header } from "../../components/Header";
import { SearchForm } from "./components/SearchForm";
import { Summary } from "../../components/Summary";
import { Pagination } from "../../components/Pagination";

import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dateFormater, priceFormatter } from "../../utils/formatter";

import {
  DeleteButton,
  DeleteButtonContainer,
  PriceHighlight,
  TransactionTable,
  TransationContainer,
} from "./styles";

export function Transactions() {
  const { transactions, page, count, pages, deleteTransaction } =
    useContext(TransactionsContext);

  return (
    <div>
      <Header />
      <Summary />

      <TransationContainer>
        <SearchForm />

        <TransactionTable>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td width="40%">{transaction.description}</td>
                <td>
                  <PriceHighlight $variant={transaction.type}>
                    {transaction.type === "outcome" && "- "}
                    {priceFormatter.format(transaction.price)}
                  </PriceHighlight>
                </td>
                <td>{transaction.category}</td>
                <td>{dateFormater.format(new Date(transaction.createdAt))}</td>
                <td>
                  <DeleteButtonContainer className="flex justify-end">
                    <DeleteButton
                      onClick={() => deleteTransaction(transaction.id)}
                    >
                      <Trash2 className="size-4 text-red-500" />
                    </DeleteButton>
                  </DeleteButtonContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </TransactionTable>
        {transactions && (
          <Pagination
            transactions={transactions}
            page={page}
            items={count}
            pages={pages}
          />
        )}
      </TransationContainer>
    </div>
  );
}
