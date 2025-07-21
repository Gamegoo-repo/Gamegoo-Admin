import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

import { AuthAxios } from "@/api";
import { Label, Title } from "@/components/common";
import Table from "@/components/table/Table";

import { TopFilterContainer } from "./components";
import PostDetailModal from "./components/post-detail-modal/PostDetailModal";
import { getReportTableColumns } from "./constants";
import { getFilterParams } from "./utils";

const ReportPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | undefined>();

  const currentPage = Number(searchParams.get("page")) || 1;

  const { data = { reports: [], totalPages: 0 } } = useQuery({
    queryKey: ["report", searchParams.toString()],
    queryFn: async () => {
      const params = getFilterParams(searchParams);
      const response = await AuthAxios.get("/api/v2/report/list", { params });

      return response.data.data;
    },
  });

  const tableData = data.reports.map((item: any) => ({
    reportId: item.reportId,
    state: "", // TODO: 계정 상태 (추후 추가 필요)
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
    reportCount: "", // TODO: 누적 횟수 (추후 추가 필요)
    path: item.path,
  }));

  const totalPages = data.totalPages;

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page.toString());
    setSearchParams(newParams);
  };

  const handleShowPostDetail = (reportId: number) => {
    // reportId를 postId로 사용 (실제로는 row에서 boardId나 postId를 가져와야 할 수도 있음)
    setSelectedPostId(reportId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPostId(undefined);
  };

  const tableColumns = getReportTableColumns({
    onShowPostDetail: handleShowPostDetail,
  });

  return (
    <>
      <Layout>
        <Title title="신고 유저 목록" />
        <TopFilterContainer
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
        <Table
          data={tableData}
          columns={tableColumns}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        <Label variant="purple" label="3일 정지" />
        <Label variant="green" label="정상" />
        <Label variant="red" label="영구 정지" />
        <Label variant="gray" label="스팸 홍보 / 도매글" />
      </Layout>
      <PostDetailModal
        isOpen={isModalOpen}
        postId={selectedPostId}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default ReportPage;

const Layout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0 20px;
  gap: 24px;
  overflow-y: auto;
`;
