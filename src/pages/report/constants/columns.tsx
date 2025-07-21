import { Button, Label } from "@/components/common";
import { TableColumn } from "@/types/table/table";

interface ColumnCallbacks {
  onShowDetail?: (targetMember: string, reportData: any) => void;
}

export const getReportTableColumns = (
  callbacks: ColumnCallbacks = {}
): TableColumn[] => [
  {
    key: "reportId",
    header: "번호",
    width: "80px",
  },
  {
    key: "state",
    header: "계정 상태",
    width: "120px",
    render: (value) => {
      if (!value) return "-";
      return <Label variant="purple" label={String(value)} />;
    },
  },
  {
    key: "targetMember",
    header: "비매너 소환사명",
    width: "180px",
  },
  {
    key: "reportType",
    header: "신고 사유",
    width: "120px",
    render: (value) => <Label variant="gray" label={String(value)} />,
  },
  {
    key: "content",
    header: "상세 내용",
    width: "200px",
  },
  {
    key: "reporter",
    header: "신고자",
    width: "180px",
  },
  {
    key: "createdAt",
    header: "접수 일시",
    width: "150px",
  },
  {
    key: "reportCount",
    header: "누적 횟수",
    width: "100px",
    render: (value, row) => {
      const handleShowDetail = () => {
        if (callbacks.onShowDetail) {
          callbacks.onShowDetail(row.targetMember, row);
        }
      };

      return (
        <Button
          variant="secondary"
          label={value ? String(value) : "0"}
          width="60px"
          height="32px"
          fontSize="12px"
          onClick={handleShowDetail}
        />
      );
    },
  },
  {
    key: "path",
    header: "페이지",
    width: "120px",
  },
];
