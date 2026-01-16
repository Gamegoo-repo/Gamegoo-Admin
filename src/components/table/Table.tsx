import React from "react";
import styled from "styled-components";

import { Pagination } from "@/components/common";
import { TableColumn, TableData } from "@/types/table/table";

import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";

interface TableProps {
  data?: TableData[];
  columns: TableColumn[];
  currentPage: number;
  totalPages: number;
  checkedItems: boolean[];
  onPageChange: (page: number) => void;
  onSelectAll: () => void;
  onCheck: (index: number) => void;
}

const Table: React.FC<TableProps> = ({
  data = [],
  columns,
  currentPage,
  totalPages,
  checkedItems,
  onPageChange,
  onSelectAll,
  onCheck,
}) => {
  const allSelected = checkedItems.every(Boolean) && checkedItems.length > 0;

  if (!data) {
    return null;
  }

  return (
    <TableContainer>
      <table>
        <TableHeader
          columns={columns}
          allSelected={allSelected}
          onSelectAll={onSelectAll}
        />
        <tbody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              row={row}
              columns={columns}
              isChecked={checkedItems[index] || false}
              onCheck={() => onCheck(index)}
            />
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </TableContainer>
  );
};

export default Table;

const TableContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 40.5px;
`;
