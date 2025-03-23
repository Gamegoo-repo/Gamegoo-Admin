import styled from "styled-components";
import { theme } from "../../styles/theme";
import Label from "../common/Label";
import { TableData } from "../../types/table/table";

export const TableRow = ({ row }: { row: TableData }) => {
  console.log(row["state"]);
  console.log(row["reason"]);
  console.log(row["count"]);
  return (
    <Tr>
      {Object.entries(row).map(([key, value], index) => {
        if (key === "state") {
          return (
            <Td key={index}>
              <Label variant="purple" label={String(value)} />
            </Td>
          );
        }
        if (key === "reason") {
          return (
            <Td key={index}>
              <Label variant="gray" label={String(value)} />
            </Td>
          );
        }

        return <Td key={index}>{value}</Td>;
      })}
    </Tr>
  );
};

const Tr = styled.tr`
  background: ${theme.colors.white};
`;

const Td = styled.td`
  min-height: 38px;
  background: ${theme.colors.white};
  color: ${theme.colors.gray700};
  ${theme.fonts.regular14};
  word-wrap: break-word;
`;
