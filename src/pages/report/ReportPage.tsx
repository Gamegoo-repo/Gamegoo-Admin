import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

import { AuthAxios } from "@/api";
import { Label, Title } from "@/components/common";
import Table from "@/components/table/Table";

import { TopFilterContainer } from "./components";
import { COLUMNS } from "./constants";
import { getFilterParams } from "./utils";

const ReportPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL params에서 값 읽기
  const currentPage = Number(searchParams.get("page")) || 1;

  const { data } = useQuery({
    queryKey: ["report", searchParams.toString()],
    queryFn: async () => {
      const params = getFilterParams(searchParams);
      const response = await AuthAxios.get("/api/v2/report/list", { params });

      const transformedData = response.data.data.map((item: any) => [
        item.reportId, // 신고 번호
        "", // TODO: 계정 상태 (추후 추가 필요)
        `${item.toMemberName}#${item.toMemberTag}`, // 비매너 소환사명
        item.reportType, // 신고 사유
        item.content, // 상세 내용
        `${item.fromMemberName}#${item.fromMemberTag}`, // 신고자
        item.createdAt, // 접수 일시
        "", // TODO: 누적 횟수 (추후 추가 필요)
        item.path, // 신고 경로
      ]);

      return transformedData;
    },
  });

  const totalPages = 20; // TODO: API에서 받아오도록 수정 필요

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page.toString());
    setSearchParams(newParams);
  };

  return (
    <Layout>
      <Title title="신고 유저 목록" />
      <TopFilterContainer
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <Table
        data={data}
        columns={COLUMNS}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <Label variant="purple" label="3일 정지" />
      <Label variant="green" label="정상" />
      <Label variant="red" label="영구 정지" />
      <Label variant="gray" label="스팸 홍보 / 도매글" />
    </Layout>
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
`;
