import { ReactNode } from "react";

export interface TableData {
  [key: string]: any;
}

export interface TableColumn {
  key: string;
  header: string;
  render?: (value: any, row: TableData, index: number) => ReactNode;
  width?: string;
}
