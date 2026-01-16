import { ReactNode } from "react";
import styled from "styled-components";

import { BanTypeEnum } from "@/@generated/types";
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
  let userAccountStateLabel: ReactNode | undefined = undefined;

  switch (row.state) {
    case BanTypeEnum.NONE:
      userAccountStateLabel = <Label variant="green" label="정상" />;
      break;
    case BanTypeEnum.BAN_1D:
      userAccountStateLabel = <Label variant="purple" label="1일 정지" />;
      break;
    case BanTypeEnum.BAN_3D:
      userAccountStateLabel = <Label variant="purple" label="3일 정지" />;
      break;
    case BanTypeEnum.BAN_5D:
      userAccountStateLabel = <Label variant="purple" label="5일 정지" />;
      break;

    case BanTypeEnum.BAN_1W:
      userAccountStateLabel = <Label variant="purple" label="1주 정지" />;
      break;
    case BanTypeEnum.BAN_2W:
      userAccountStateLabel = <Label variant="purple" label="2주 정지" />;
      break;
    case BanTypeEnum.BAN_1M:
      userAccountStateLabel = <Label variant="purple" label="한달 정지" />;
      break;
    case BanTypeEnum.PERMANENT:
      userAccountStateLabel = <Label variant="red" label="영구 정지" />;
      break;
    default:
      userAccountStateLabel = <Label variant="purple" label="경고" />;
  }
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
              {userAccountStateLabel}
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

        if (column.key === "content") {
          return value.length > 0 ? (
            <Td
              key={index}
              selected={isChecked}
              style={{ width: column.width }}
            >
              {value}
            </Td>
          ) : (
            <Td
              key={index}
              selected={isChecked}
              style={{ width: column.width }}
            >
              <span style={{ color: "#D3D3D3" }}>-</span>
            </Td>
          );
        }

        if (column.key === "reportCount") {
          return (
            <Td
              key={index}
              selected={isChecked}
              style={{ width: column.width }}
            >
              {value ? `${value} 회` : "-"}
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
