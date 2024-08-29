import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Transaction } from "../../data/transactions";
import { Button, ButtonsContainer, PaginationContainer } from "./styles";
import { useSearchParams } from "react-router-dom";

interface PaginationProps {
  transactions: Transaction[];
  page: number;
  items: number;
  pages: number;
}

export function Pagination({
  transactions,
  page,
  items,
  pages,
}: PaginationProps) {
  const [_, setSearchParams] = useSearchParams();

  function firstPage() {
    setSearchParams((params) => {
      params.set("page", "1");

      return params;
    });
  }

  function previousPage() {
    if (page - 1 <= 0) return;
    setSearchParams((params) => {
      params.set("page", String(page - 1));

      return params;
    });
  }

  function nextPage() {
    if (page + 1 > pages) return;

    setSearchParams((params) => {
      params.set("page", String(page + 1));

      return params;
    });
  }

  function lastPage() {
    setSearchParams((params) => {
      params.set("page", String(pages));

      return params;
    });
  }

  return (
    <PaginationContainer>
      <span>
        Exibindo {transactions.length}{" "}
        {transactions.length > 1 ? "resultados" : "resultado"} de {items}{" "}
        {items > 1 ? "transações" : "transação"}
      </span>
      <span>
        Página {page} de {pages} {pages > 1 ? "páginas" : "página"}
      </span>

      <ButtonsContainer>
        <Button onClick={firstPage} disabled={page - 1 <= 0}>
          <ChevronsLeft />
        </Button>
        <Button onClick={previousPage} disabled={page - 1 <= 0}>
          <ChevronLeft />
        </Button>
        <Button onClick={nextPage} disabled={page + 1 > pages}>
          <ChevronRight />
        </Button>
        <Button onClick={lastPage} disabled={page + 1 > pages}>
          <ChevronsRight />
        </Button>
      </ButtonsContainer>
    </PaginationContainer>
  );
}
