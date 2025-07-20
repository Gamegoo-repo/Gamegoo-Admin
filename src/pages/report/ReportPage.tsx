import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

import { AuthAxios } from "@/api";
import { Label, Title } from "@/components/common";
import Table from "@/components/table/Table";
import { COLUMNS } from "@/constants/table/columns";

import TopFilterContainer from "./components/TopFilterContainer";

const ReportPage = () => {
  const { data } = useQuery({
    queryKey: ["report"],
    queryFn: async () => {
      const response = await AuthAxios.get("/api/v2/report/list", {
        params: {
          page: 0,
          size: 10,
        },
      });

      const filteredData = response.data.data.map((item: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { path, createdAt, ...rest } = item;
        return rest;
      });

      return filteredData;
    },
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 20;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Layout>
      <Title title="신고 유저 목록" />
      <TopFilterContainer />
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
