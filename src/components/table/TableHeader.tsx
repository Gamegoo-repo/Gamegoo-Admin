import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";

interface TableHeaderProps {
  columns: string[];
}

export const TableHeader: React.FC<TableHeaderProps> = ({ columns }) => {
  return (
    <THead>
      <tr>
        {columns.map((column, index) => (
          <th key={index}>{column}</th>
        ))}
      </tr>
    </THead>
  );
};

const THead = styled.thead`
  height: 36px;
  color: ${theme.colors.white};
  background: ${theme.colors.gray700};
  ${theme.fonts.semiBold14};

  border-radius: 6px;
`;
