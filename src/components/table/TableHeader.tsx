import React from "react";
import styled from "styled-components";

import { Checkbox } from "@/components/common";
import { theme } from "@/styles/theme";
import { TableColumn } from "@/types/table/table";

interface TableHeaderProps {
  columns: TableColumn[];
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
          <th key={index} style={{ width: column.width }}>
            {column.header}
          </th>
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
