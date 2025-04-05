import React, { useState } from "react";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import Pagination from "../common/Pagination";
import styled from "styled-components";
import { TableData } from "../../types/table/table";

interface TableProps {
  data: TableData[];
  columns: string[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Table: React.FC<TableProps> = ({
  data,
  columns,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(data.length).fill(false)
  );

  const allSelected = checkedItems.every(Boolean);

  const handleSelectAll = () => {
    setCheckedItems(new Array(data.length).fill(!allSelected));
  };

  const handleCheck = (index: number) => {
    const updated = [...checkedItems];
    updated[index] = !updated[index];
    setCheckedItems(updated);
  };

  return (
    <TableContainer>
      <table>
        <TableHeader
          columns={columns}
          allSelected={allSelected}
          onSelectAll={handleSelectAll}
        />
        <tbody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              row={row}
              isChecked={checkedItems[index]}
              onCheck={() => handleCheck(index)}
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
