import { TableColumn } from "@/types/table/table";

interface ColumnCallbacks {
  onShowPostDetail?: (reportId: number) => void;
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
  },
  {
    key: "path",
    header: "페이지",
    width: "120px",
    render: (value, row) => {
      if (value === "BOARD") {
        const handleClick = () => {
          if (callbacks.onShowPostDetail) {
            callbacks.onShowPostDetail(row.postId);
          }
        };

        return (
          <button
            onClick={handleClick}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "red",
              margin: 0,
              padding: 0,
              fontSize: "inherit",
            }}
          >
            <span style={{ textDecoration: "underline" }}>게시판</span> x
          </button>
        );
      }
      if (value === "PROFILE") {
        return "프로필";
      }
      return null;
    },
  },
];
