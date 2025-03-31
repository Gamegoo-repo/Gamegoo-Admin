import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import Checkbox from "../common/Checkbox";

interface TableHeaderProps {
  columns: string[];
  allSelected: boolean;
  onSelectAll: () => void;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  columns,
  allSelected,
  onSelectAll,
}) => {
  return (
    <THead>
      <tr>
        <th>
          <Checkbox checked={allSelected} onChange={onSelectAll} />
        </th>
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
