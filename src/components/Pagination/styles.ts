import { ReactElement } from "react";
import styled from "styled-components";

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin: 20px 0;
  flex-wrap: wrap;
  font-size: 1rem;
  line-height: 1.25rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 1.5rem;
`;

interface ButtonProps {
  children: ReactElement;
}

export const Button = styled.button<ButtonProps>`
  width: 35px;
  height: 35px;
  border-radius: 8px;
  border: none;
  background-color: ${(props) => props.theme["green-300"]};
  color: ${(props) => props.theme["gray-900"]};

  &:hover {
    background-color: ${(props) => props.theme["green-500"]};
    cursor: pointer;
  }

  &:disabled {
    background-color: ${(props) => props.theme["green-700"]};
  }
`;
