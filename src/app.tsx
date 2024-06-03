import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";

import { Transactions } from "./pages/Transactions";
import { TransactionProvider } from "./contexts/TransactionsContext";

const queryClient = new QueryClient();

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <QueryClientProvider client={queryClient}>
        <TransactionProvider>
          <Transactions />
        </TransactionProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
