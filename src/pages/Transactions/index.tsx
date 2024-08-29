import { useContext } from "react";

import { Header } from "../../components/Header";
import { SearchForm } from "./components/SearchForm";
import { Summary } from "../../components/Summary";
import { Pagination } from "../../components/Pagination";

import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dateFormater, priceFormatter } from "../../utils/formatter";

import {
  PriceHighlight,
  TransactionTable,
  TransationContainer,
} from "./styles";

export function Transactions() {
  const { transactions, page, count, pages } = useContext(TransactionsContext);

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
                <td width="50%">{transaction.description}</td>
                <td>
                  <PriceHighlight variant={transaction.type}>
                    {transaction.type === "outcome" && "- "}
                    {priceFormatter.format(transaction.price)}
                  </PriceHighlight>
                </td>
                <td>{transaction.category}</td>
                <td>{dateFormater.format(new Date(transaction.createdAt))}</td>
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
