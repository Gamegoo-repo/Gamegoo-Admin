import styled from "styled-components";
import { theme } from "../../styles/theme";
import Label from "../common/Label";
import { TableData } from "../../types/table/table";
import Checkbox from "../common/Checkbox";

export const TableRow = ({
  row,
  isChecked,
  onCheck,
}: {
  row: TableData;
  isChecked: boolean;
  onCheck: () => void;
}) => {
  return (
    <Tr>
      <Td selected={isChecked}>
        <Checkbox checked={isChecked} onChange={onCheck} />
      </Td>
      {Object.entries(row).map(([key, value], index) => {
        if (key === "state") {
          return (
            <Td key={index} selected={isChecked}>
              <Label variant="purple" label={String(value)} />
            </Td>
          );
        }
        if (key === "reason") {
          return (
            <Td key={index} selected={isChecked}>
              <Label variant="gray" label={String(value)} />
            </Td>
          );
        }

        return (
          <Td key={index} selected={isChecked}>
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
