import styled from "styled-components";

import { Checkbox, Label } from "@/components/common";
import { theme } from "@/styles/theme";
import { TableColumn, TableData } from "@/types/table/table";

export const TableRow = ({
  row,
  columns,
  isChecked,
  onCheck,
}: {
  row: TableData;
  columns: TableColumn[];
  isChecked: boolean;
  onCheck: () => void;
}) => {
  return (
    <Tr>
      <Td selected={isChecked}>
        <Checkbox checked={isChecked} onChange={onCheck} />
      </Td>
      {columns.map((column, index) => {
        const value = row[column.key];

        if (column.render) {
          return (
            <Td
              key={index}
              selected={isChecked}
              style={{ width: column.width }}
            >
              {column.render(value, row, index)}
            </Td>
          );
        }

        // Default rendering for backward compatibility
        if (column.key === "state") {
          return (
            <Td
              key={index}
              selected={isChecked}
              style={{ width: column.width }}
            >
              <Label variant="purple" label={String(value)} />
            </Td>
          );
        }
        if (column.key === "reason") {
          return (
            <Td
              key={index}
              selected={isChecked}
              style={{ width: column.width }}
            >
              <Label variant="gray" label={String(value)} />
            </Td>
          );
        }

        return (
          <Td key={index} selected={isChecked} style={{ width: column.width }}>
            {value}
          </Td>
        );
      })}
    </Tr>
  );
};

const Tr = styled.tr`
  background: ${theme.colors.white};
`;

const Td = styled.td<{ selected?: boolean }>`
  min-height: 38px;
  background: ${({ selected }) =>
    selected ? theme.colors.violet200 : theme.colors.white};
  color: ${theme.colors.gray700};
  ${theme.fonts.regular14};
  word-wrap: break-word;
  transition: all 150ms;
`;
