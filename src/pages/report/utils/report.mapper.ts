export interface ReportTableRow {
  reportId: number;
  state: string;
  targetMember: string;
  reportType: string;
  content: string;
  reporter: string;
  createdAt: string;
  reportCount: string;
  path: string;
}

export const mapReportToTableRow = (item: any) : ReportTableRow => ({
  reportId: item.reportId,
  state: "",
  targetMember: `${item.toMemberName}#${item.toMemberTag}`,
  reportType: item.reportType,
  content: item.content,
  reporter: `${item.fromMemberName}#${item.fromMemberTag}`,
  createdAt: new Date(item.createdAt).toLocaleString("ko-KR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }),
  reportCount: "",
  path: item.path,
});