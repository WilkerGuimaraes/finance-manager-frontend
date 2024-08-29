import styled from "styled-components";

export const TransationContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
`;

export const TransactionTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

  td {
    padding: 1.25rem 2rem;
    background: ${(props) => props.theme["gray-700"]};

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-top-right-radius: 6px;
    }
  }
`;

interface PriceHighlightProps {
  $variant: "income" | "outcome";
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${(props) =>
    props.$variant === "income"
      ? props.theme["green-300"]
      : props.theme["red-300"]};
`;

export const DeleteButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;

export const DeleteButton = styled.button`
  background-color: transparent;
  border-radius: 999px;
  outline: none;
  border: none;

  &:hover {
    cursor: pointer;
  }

  svg {
    color: ${(props) => props.theme["red-500"]};
  }
`;
